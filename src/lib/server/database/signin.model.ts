import type { Signin } from '$lib/types'
import { eq, or, lt, and, gt } from 'drizzle-orm'
import { db } from './db'
import { signinTable } from './schema'
import { TimeSpan, createDate } from 'oslo'

export const getSignins = async (signin: { email: string; ip_address: string }) => {
  const oneHourAgo = createDate(new TimeSpan(-1, 'h'))
  
  const batchResult = await db.batch([
    db.delete(signinTable).where(lt(signinTable.logged_in_at, oneHourAgo)),
    db
      .select()
      .from(signinTable)
      .where(
        and(
          or(
            eq(signinTable.email, signin.email),
            eq(signinTable.ip_address, signin.ip_address)
          ),
          gt(signinTable.logged_in_at, oneHourAgo)
        )
      ),
  ])
  return batchResult[1]
}

export const createSignin = async (signin: Signin) => {
  await db.insert(signinTable).values(signin)
}
