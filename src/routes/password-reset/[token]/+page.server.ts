import { fail } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { z } from 'zod'
import { lucia } from '$lib/server/auth/auth'
import { Argon2id } from 'oslo/password'
import { db } from '$lib/server/database/db'
import { eq } from 'drizzle-orm'
import { passwordResetTokenTable, userTable } from '$lib/server/database/schema'

const schema = z.object({
  password: z.string().min(8, { message: 'Password must be 8 or more characters.' }).max(255),
})

export const load = async ({ params }) => {
  const form = await superValidate(zod(schema))
  
  // Check if the token is valid
  const resetToken = await db.select().from(passwordResetTokenTable).where(eq(passwordResetTokenTable.id, params.token)).get()

  if (!resetToken || new Date() > resetToken.expires_at) {
    return {
      form,
      token: params.token,
      invalidToken: true,
      success: false
    }
  }

  return { form, token: params.token, invalidToken: false, success: false }
}

export const actions = {
  default: async ({ request, params }) => {
    const form = await superValidate(request, zod(schema))

    if (!form.valid) {
      return fail(400, { form })
    }

    try {
      const { password } = form.data
      const { token } = params

      const resetToken = await db.select().from(passwordResetTokenTable).where(eq(passwordResetTokenTable.id, token)).get()

      if (!resetToken || new Date() > resetToken.expires_at) {
        return fail(400, { form, invalidToken: true, success: false })
      }

      const hashedPassword = await new Argon2id().hash(password)

      await db.update(userTable).set({ password_hash: hashedPassword }).where(eq(userTable.id, resetToken.user_id))
      await db.delete(passwordResetTokenTable).where(eq(passwordResetTokenTable.id, token))

      // Invalidate all existing sessions for the user
      await lucia.invalidateUserSessions(resetToken.user_id)

      return { form, success: true }
    } catch (e) {
      console.error(e)
      return fail(500, { form, message: 'An error occurred while resetting the password.' })
    }
  },
}