import { dev } from '$app/environment'
import { PUBLIC_ORIGIN } from '$env/static/public'
import { GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID } from '$env/static/private'

import { Lucia } from 'lucia'
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle'
import { Google } from 'arctic'

import { db } from '../database/db'
import { sessionTable, userTable } from '../database/schema'

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: !dev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      email: attributes.email,
      emailVerified: attributes.email_verified,
    }
  },
})

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  username: string
  password_hash: string | null // do not expose to getUserAttributes
  email: string
  email_verified: boolean
}

const redirect_url = dev ? 'http://localhost:5173/signin/google/callback' : `${PUBLIC_ORIGIN}/signin/google/callback`

export const google = new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirect_url)

if (!dev && (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET)) {
  throw new Error('GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are not set')
}
