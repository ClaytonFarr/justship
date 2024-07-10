import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const userTable = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  username: text('username').notNull().unique(),
  password_hash: text('password_hash'),
  email: text('email').notNull(),
  email_verified: integer('email_verified', { mode: 'boolean' }),
  receive_product_updates: integer('receive_product_updates', { mode: 'boolean' }).default(false),
  stripe_customer_id: text('stripe_customer_id'),
  current_plan_id: text('current_plan_id'),
  created_at: integer('created_at', { mode: 'timestamp' }),
  updated_at: integer('updated_at', { mode: 'timestamp' }),
  last_sign_in: integer('last_sign_in', { mode: 'timestamp' }),
})

export const sessionTable = sqliteTable('session', {
  id: text('id').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer('expires_at').notNull(),
})

export const emailVerificationTokenTable = sqliteTable('email_verification_token', {
  id: text('id').notNull().primaryKey(),
  user_id: text('user_id').notNull(),
  email: text('email').notNull(),
  expires_at: integer('expires_at', { mode: 'timestamp' }).notNull(),
})

export const signinTable = sqliteTable('signin', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  logged_in_at: integer('logged_in_at', { mode: 'timestamp' }).notNull(),
  ip_address: text('ip_address').notNull(),
  email: text('email').notNull(),
})

export const passwordResetTokenTable = sqliteTable('password_reset_token', {
  id: text('id').primaryKey(),
  user_id: text('user_id')
    .notNull()
    .references(() => userTable.id),
  expires_at: integer('expires_at', { mode: 'timestamp' }).notNull(),
})