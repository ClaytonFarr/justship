import { eq, and, gt } from 'drizzle-orm'
import { db } from './db'
import { passwordResetAttemptsTable } from './schema'
import { generateId } from 'lucia'

export const createResetAttempt = async ({ 
  email, 
  ip_address 
}: { 
  email: string
  ip_address: string 
}) => {
  const id = generateId(40)
  await db.insert(passwordResetAttemptsTable).values({
    id,
    email,
    ip_address,
    attempted_at: new Date(),
  })
}

export const getResetAttempts = async ({ 
  email, 
  ip_address 
}: { 
  email: string
  ip_address: string 
}) => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
  
  return await db
    .select()
    .from(passwordResetAttemptsTable)
    .where(
      and(
        eq(passwordResetAttemptsTable.email, email),
        eq(passwordResetAttemptsTable.ip_address, ip_address),
        gt(passwordResetAttemptsTable.attempted_at, oneHourAgo)
      )
    )
}

export const cleanupOldAttempts = async () => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
  await db
    .delete(passwordResetAttemptsTable)
    .where(gt(passwordResetAttemptsTable.attempted_at, oneHourAgo))
}