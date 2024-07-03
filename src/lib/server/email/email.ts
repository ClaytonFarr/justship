import { dev } from '$app/environment'
import { SMTPClient } from 'emailjs'
import { PUBLIC_ORIGIN, PUBLIC_PROJECT_NAME } from '$env/static/public'
import { FROM_EMAIL, POSTMARK_SERVER_TOKEN } from '$env/static/private'
import { inline } from '@css-inline/css-inline'
import postmark from 'postmark'
import layout from './layout.html?raw'
import login from './login-email.html?raw'
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
      .replaceAll('{{{ @content }}}', login)
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
