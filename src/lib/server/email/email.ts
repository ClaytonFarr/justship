import { dev } from '$app/environment'
import { env } from '$env/dynamic/private'
import { FROM_EMAIL, POSTMARK_SERVER_TOKEN } from '$env/static/private'
import { env as public_env } from '$env/dynamic/public'
import { PUBLIC_ORIGIN, PUBLIC_PROJECT_NAME } from '$env/static/public'
import { deleteAllEmailTokensForUser, createEmailVerificationToken } from '$lib/server/database/emailtoken.model'
import { generateIdFromEntropySize } from 'lucia'
import { SMTPClient } from 'emailjs'
import postmark from 'postmark'
import { inline } from '@css-inline/css-inline'
import layout from './layout.html?raw'
import verification from './verification-email.html?raw'
import passwordReset from './password-reset-email.html?raw'

const localClient = new SMTPClient({
  host: 'localhost',
  port: 1025,
  ssl: false,
})

type LayoutEmailVariables = {
  product_url: string
  product_name: string
}

type LoginEmailVariables = LayoutEmailVariables & {
  action_url: string
}

type PasswordResetEmailVariables = LayoutEmailVariables & {
  action_url: string
}

// NOTE: I included this initial authentication email template so that you can get started right away.
// It was created with the Postmark template editor. It is better to create your emails there and than send emails with
// postmarkClient.sendEmailWithTemplate()

export const loginEmailHtmlTemplate = (variables: LoginEmailVariables) => {
  return inline(
    layout
      .replaceAll('{{{ @content }}}', verification)
      .replaceAll('{{ product_url }}', variables.product_url)
      .replaceAll('{{ product_name }}', variables.product_name)
      .replaceAll('{{ action_url }}', variables.action_url),
  )
}

const sendTestEmail = async (options: { from: string; to: string; subject: string; html: string }) => {
  try {
    await localClient.sendAsync({
      text: options.subject,
      from: options.from,
      to: options.to,
      subject: options.subject,
      attachment: [{ data: options.html, alternative: true }],
    })
    console.log(`Test email sent to ${options.to}`)
  } catch (e) {
    console.error(e)
  }
}

export const sendEmail = async (options: { from: string; to: string; subject: string; html: string; headers?: Record<string, string> }) => {
  try {
    if (dev) {
      return await sendTestEmail(options)
    }
    const postmarkClient = new postmark.ServerClient(POSTMARK_SERVER_TOKEN)
    const result = await postmarkClient.sendEmail({
      From: options.from,
      To: options.to,
      Subject: options.subject,
      HtmlBody: options.html,
    })
    console.log(result)
  } catch (e) {
    console.error(e)
  }
}

export async function sendVerificationEmail(user: {
  id: string
  username: string
  email: string
  email_verified: boolean | null
}) {
  await deleteAllEmailTokensForUser(user.id)
  const verification_token = await createEmailVerificationToken(user.id, user.email)
  const verificationLink = `${PUBLIC_ORIGIN}/login/email-verification?verification_token=${verification_token}`

  await sendEmail({
    from: `${public_env.PUBLIC_PROJECT_NAME} <${env.FROM_EMAIL}>`,
    to: user.email,
    subject: `Account verification for ${public_env.PUBLIC_PROJECT_NAME}`,
    html: loginEmailHtmlTemplate({
      product_url: PUBLIC_ORIGIN,
      product_name: public_env.PUBLIC_PROJECT_NAME,
      action_url: verificationLink,
    }),
    headers: {
      'X-Entity-Ref-ID': generateIdFromEntropySize(16),
    },
  })
}

export const sendPasswordResetLink = async (email: string, token: string) => {
  const resetLink = `${PUBLIC_ORIGIN}/password-reset/${token}`
  await sendEmail({
    from: `${PUBLIC_PROJECT_NAME} <${FROM_EMAIL}>`,
    to: email,
    subject: `Password Reset for ${PUBLIC_PROJECT_NAME}`,
    html: passwordResetEmailTemplate({
      product_url: PUBLIC_ORIGIN,
      product_name: PUBLIC_PROJECT_NAME,
      action_url: resetLink,
    }),
  })
}

export const passwordResetEmailTemplate = (variables: PasswordResetEmailVariables) => {
  return inline(
    layout
      .replaceAll('{{{ @content }}}', passwordReset)
      .replaceAll('{{ product_url }}', PUBLIC_ORIGIN)
      .replaceAll('{{ product_name }}', PUBLIC_PROJECT_NAME)
      .replaceAll('{{ action_url }}', variables.action_url),
  )
}

