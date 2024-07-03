import { generateId } from 'lucia'
import { TimeSpan, createDate } from 'oslo'
import { db } from '$lib/server/database/db'
import { passwordResetTokenTable } from '$lib/server/database/schema'

export const generatePasswordResetToken = async (userId: string): Promise<string> => {
  const tokenId = generateId(40)
  await db.insert(passwordResetTokenTable).values({
    id: tokenId,
    user_id: userId,
    expires_at: createDate(new TimeSpan(2, 'h')),
  })
  return tokenId
}