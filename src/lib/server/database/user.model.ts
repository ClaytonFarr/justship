import { eq } from 'drizzle-orm'
import { db } from './db'
import { userTable } from './schema'

export const getUserByEmail = async (email: string) => {
  const user = await db.select().from(userTable).where(eq(userTable.email, email))
  if (user.length === 0) {
    return null
  } else {
    return user[0]
  }
}

export const getUserById = async (id: string) => {
  const user = await db.select().from(userTable).where(eq(userTable.id, id))
  if (user.length === 0) {
    return null
  } else {
    return user[0]
  }
}

type UpdateUser = Partial<typeof userTable.$inferInsert>
export const updateUser = async (id: string, user: UpdateUser) => {
  const result = await db
    .update(userTable)
    .set({ ...user, updated_at: new Date() })
    .where(eq(userTable.id, id))
    .returning()
  if (result.length === 0) {
    return null
  } else {
    return result[0]
  }
}

type NewUser = {
  id: string
  username: string
  password_hash: string // do not expose to client
  email: string
  email_verified: boolean
  receive_product_updates: boolean
  stripe_customer_id?: string
  created_at: Date
  updated_at: Date
  last_sign_in?: Date
}

export const createNewUser = async (user: NewUser) => {
  const now = new Date()
  const result = await db
    .insert(userTable)
    .values({
      ...user,
      created_at: now,
      updated_at: now,
      last_sign_in: undefined,
    })
    .onConflictDoNothing()
    .returning()
  if (result.length === 0) {
    return null
  } else {
    return result[0]
  }
}
