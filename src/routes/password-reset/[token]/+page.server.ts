import { fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { z } from 'zod'
import { lucia } from '$lib/server/auth/auth'
import { Argon2id } from 'oslo/password'
import { db } from '$lib/server/database/db'
import { eq } from 'drizzle-orm'
import { passwordResetTokenTable, userTable } from '$lib/server/database/schema'

const schema = z.object({
  password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
})

export const load = async ({ params }) => {
  const form = await superValidate(zod(schema))
  return { form, token: params.token }
}

export const actions = {
  default: async ({ request, params, cookies }) => {
    const form = await superValidate(request, zod(schema))

    if (!form.valid) {
      return fail(400, { form })
    }

    const { password } = form.data
    const { token } = params

    const resetToken = await db.select().from(passwordResetTokenTable).where(eq(passwordResetTokenTable.id, token)).get()

    if (!resetToken || new Date() > resetToken.expires_at) {
      form.errors.password = ['Invalid or expired reset token']
      return fail(400, { form })
    }

    const hashedPassword = await new Argon2id().hash(password)

    await db.update(userTable).set({ password_hash: hashedPassword }).where(eq(userTable.id, resetToken.user_id))
    await db.delete(passwordResetTokenTable).where(eq(passwordResetTokenTable.id, token))

    const session = await lucia.createSession(resetToken.user_id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes,
    })

    redirect(302, '/app')
  }
}