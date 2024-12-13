<script lang="ts">
  import { PUBLIC_PRODUCT_NAME, PUBLIC_ORIGIN, PUBLIC_GOOGLE_OAUTH_ENABLED, PUBLIC_SIGNUP_ENABLED } from '$env/static/public'
  import { dev } from '$app/environment'
  import { fade } from 'svelte/transition'
  import { superForm } from 'sveltekit-superforms'
  import TextInput from '$components/ui/custom/forms/TextInput.svelte'
  import Checkbox from '$components/ui/custom/forms/Checkbox.svelte'
  import Button from '$components/ui/custom/forms/Button.svelte'
  import Google from '$components/images/icons/Google.svelte'

  // Flag to control background image visibility
  const SHOW_BACKGROUND_IMAGE = true

  const rootUrl = dev ? 'http://localhost:5173' : PUBLIC_ORIGIN
  const { data } = $props()

  let returningUser = $state(PUBLIC_SIGNUP_ENABLED !== 'true' ? true : !data.isNewUser)
  let email = $state('')
  let password = $state('')
  let email_input: HTMLInputElement | null = $state(null)
  let password_input: HTMLInputElement | null = $state(null)
  let rememberMe = $state(false)
  let receiveProductUpdates = $state(true)
  let requestReset = $state(false)
  let signup_email_sent = $state(false)
  let reset_email_sent = $state(false)
  let loadErrorMessage = $state('')

  function handleSignupClick() {
    if (PUBLIC_SIGNUP_ENABLED === 'true') {
      returningUser = false
    }
  }

  const { enhance, errors, submitting } = superForm(data.form, {
    onResult(event) {
      // console.log(event)
      if (event.result?.type === 'success') {
        if (event.result.data?.signup_email_sent) {
          signup_email_sent = true
        }
        if (event.result.data?.reset_email_sent) {
          reset_email_sent = true
        }
      }
    },
    onError({ result }) {
      // console.error(result)
    },
  })

  $derived: {
    if (data.error === 'email_not_verified') {
      loadErrorMessage = 'Check your inbox to verify your account email.'
    } else {
      loadErrorMessage = ''
    }
  }
</script>

<template lang="pug">
  .flex.min-h-screen
    // prettier-ignore
    .flex.flex-1.flex-col.px-6.py-12.sm_py-24.transition.sm_px-6(class!='{ SHOW_BACKGROUND_IMAGE ? "lg_flex-none lg_px-20 xl_px-24" : "w-full" }').returningUser(class!='{ returningUser ? "bg-white" : "bg-action/10" }')

      //- SIGN IN FORM
      +if('returningUser')
        +if('!requestReset')
          .mx-auto.w-full.max-w-sm.lg_w-96
            a(href='{rootUrl}/')
              img.h-10.w-auto(src='{rootUrl}/logo.svg', alt='{ PUBLIC_PRODUCT_NAME }')
            .mt-8.space-y-3
              h2.text-2xl.font-medium.leading-9.tracking-tight.text-foreground Welcome Back
              +if('PUBLIC_SIGNUP_ENABLED === "true"')
                p.mt-2.flex.gap-x-2.text-sm.leading-6.text-muted-foreground
                  span New?
                  button.group.flex.font-medium.text-action.hover_text-action-hover.transition(onclick!='{ () => returningUser = !returningUser }')
                    span Sign Up
                    span(class='group-hover_translate-x-1.5').translate-x-1.transition &rarr;

            .mt-10
              +if('loadErrorMessage')
                .text-sm.px-4.py-3.my-1.rounded.text-rose-900.border.border-rose-200.bg-rose-50.mb-6 { loadErrorMessage }
              form.space-y-6(method='post', action='{rootUrl}/signin?/signin_with_email', use:enhance)
                // prettier-ignore
                TextInput(
                  required, 
                  type='email', 
                  id='email', 
                  label='Email', 
                  bind:value='{ email_input }', autofocus='{returningUser ? true : false}'
                  )
                // prettier-ignore
                TextInput(
                  required, 
                  type='password', 
                  id='password', 
                  label='Password', 
                  autocomplete='current-password'
                  bind:value='{ password_input }', 
                  )
                .flex.items-center.justify-between
                  // prettier-ignore
                  Checkbox(
                    id='remember-me', 
                    label='Remember me', 
                    bind:checked='{ rememberMe }'
                    )
                  .text-sm.leading-6
                    button.font-medium.text-action.hover_text-action-hover(type='button', onclick!='{ () => requestReset = !requestReset }') Forgot password?
                +if('$errors.signin_error_message || $errors.email || $errors.password')
                  .text-sm.px-4.py-3.my-1.rounded.text-rose-900.border.border-rose-200.bg-rose-50 { $errors.signin_error_message } { $errors.email } { $errors.password }
                .pt-2
                  Button(
                    large, 
                    type='submit', 
                    label='Sign In', 
                    processingLabel='Signing In...'
                    loading='{ $submitting }', disabled='{ $submitting }', 
                    )

              +if('PUBLIC_GOOGLE_OAUTH_ENABLED === "true"')
                .mt-10
                  .flex.items-center
                    .w-full.border-t.border-input(aria-hidden='true')
                    span.px-6.text-foreground.whitespace-nowrap Or sign in with
                    .w-full.border-t.border-input(aria-hidden='true')
                  .mt-6
                    a.flex.w-full.items-center.justify-center.gap-3.rounded-md.bg-white.px-3.py-2.text-sm.font-medium.text-foreground.shadow-sm.ring-1.ring-inset.ring-input.hover_bg-muted-50.focus-visible_ring-transparent(
                      href='{rootUrl}/signin/google'
                    )
                      Google
                      span.text-sm.font-medium.leading-6 Google
              
              .mt-10
                a.group.flex.gap-x-1.text-sm.text-muted-foreground.hover_text-action-hover.transition(href='{rootUrl}/')
                  span &larr;
                  span(class='translate-x-1.5').underline.group-hover_translate-x-1.transition Return Home

          //- RESET REQUEST FORM
          +else
            .mx-auto.w-full.max-w-sm.lg_w-96
              a(href='{rootUrl}/')
                img.h-10.w-auto(src='{rootUrl}/logo.svg', alt='{ PUBLIC_PRODUCT_NAME }')
              .mt-8.space-y-3
                h2.text-2xl.font-medium.leading-9.tracking-tight.text-foreground Reset Password 
                p.text-sm.text-muted-foreground Receive a link to reset your password.
                +if('!reset_email_sent')
                  p.mt-2.flex.gap-x-2.text-sm.leading-6.text-muted-foreground
                    span Cancel?
                    button.group.flex.font-medium.text-action.hover_text-action-hover.transition(onclick!='{ () => requestReset = !requestReset }')
                      span Sign In
                      span(class='group-hover_translate-x-1.5').translate-x-1.transition &rarr;

              +if('!reset_email_sent')
                .mt-10
                  form.space-y-6(method='post', action='{rootUrl}/signin?/request_password_reset', use:enhance)
                    // prettier-ignore
                    TextInput(
                      required, 
                      type='email', 
                      id='email', 
                      label='Email', 
                      bind:value='{ email_input }', autofocus='{requestReset ? true : false}'
                      )
                    +if('$errors.reset_error_message || $errors.email')
                      .text-sm.px-4.py-3.my-1.rounded.text-rose-900.border.border-rose-200.bg-rose-50 { $errors.reset_error_message } { $errors.email }
                    .pt-2
                      Button(
                        large, 
                        type='submit', 
                        label='Send Reset Link', 
                        processingLabel='Sending...'
                        loading='{ $submitting }', disabled='{ $submitting }', 
                        )
                +else
                  .mt-10.space-y-3.text-foreground.text-sm.max-w-xs
                    p If an account exists for this address, you will receive a password reset link&nbsp;shortly.
                    p Please follow the instructions to reset your&nbsp;password.

              .mt-10
                a.group.flex.gap-x-1.text-sm.text-muted-foreground.hover_text-action-hover.transition(href='{rootUrl}/')
                  span &larr;
                  span(class='translate-x-1.5').underline.group-hover_translate-x-1.transition Return Home


        //- SIGN UP FORM
        +else
          .mx-auto.w-full.max-w-sm.lg_w-96
            a(href='{rootUrl}/')
              img.h-10.w-auto(src='{rootUrl}/logo.svg', alt='{ PUBLIC_PRODUCT_NAME }')
            .mt-8.space-y-3
              h2.text-2xl.font-medium.leading-9.tracking-tight.text-foreground Get Started Today
              p.mt-2.flex.gap-x-2.text-sm.leading-6.text-muted-foreground
                span Have an account?
                button.group.flex.font-medium.text-action.hover_text-action-hover.transition(onclick!='{ () => returningUser = !returningUser }')
                  span Sign In
                  span(class='group-hover_translate-x-1.5').translate-x-1.transition &rarr;

            +if('!signup_email_sent')
              .mt-10
                form.space-y-6(method='post', action='{rootUrl}/signin?/signup_with_email', use:enhance)
                  // prettier-ignore
                  TextInput(
                    required, 
                    type='email', 
                    id='email', 
                    label='Email', 
                    bind:value='{ email_input }', autofocus='{!returningUser ? true : false}'
                    )
                  // prettier-ignore
                  TextInput(
                    required, 
                    type='password', 
                    id='password', 
                    label='Password', 
                    bind:value='{ password_input }', autocomplete='current-password'
                    )
                  // prettier-ignore
                  .flex.gap-x-2
                    Checkbox(
                      id='receive_product_updates', 
                      label='Receive product updates?', 
                      secondaryLabel, 
                      bind:checked='{ receiveProductUpdates }',)
                  +if('$errors.signup_error_message || $errors.email || $errors.password')
                    .text-sm.px-4.py-3.my-1.rounded.text-rose-900.border.border-rose-200.bg-rose-50 { $errors.signup_error_message } { $errors.email } { $errors.password }
                  .pt-2
                    Button(
                      large, 
                      type='submit', 
                      label='Sign Up', 
                      processingLabel='Signing Up...'
                      loading='{ $submitting }', disabled='{ $submitting }', 
                      )
                  p.text-sm.text-muted-foreground By signing up, you agree to our #[a(href='{rootUrl}/policies/terms-of-service').underline.hover_text-action Terms of Service]

                +if('PUBLIC_GOOGLE_OAUTH_ENABLED === "true"')
                  .mt-10
                    .flex.items-center
                      .w-full.border-t.border-input(aria-hidden='true')
                      span.px-6.text-foreground.whitespace-nowrap Or sign up with
                      .w-full.border-t.border-input(aria-hidden='true')
                    .mt-6
                      a.flex.w-full.items-center.justify-center.gap-3.rounded-md.bg-white.px-3.py-2.text-sm.font-medium.text-foreground.shadow-sm.ring-1.ring-inset.ring-input.hover_bg-muted-50.focus-visible_ring-transparent(
                        href='{rootUrl}/signin/google'
                      )
                        Google
                        span.text-sm.font-medium.leading-6 Google

              +else
                .my-6.space-y-1.text-foreground
                  p
                    span Verification email sent
                    +if('email_input?.value')
                      span to 
                      span.font-medium { email_input?.value }
                      +else
                        span .
                  p Please verify your email address to sign in.

            .mt-10
              a.group.flex.gap-x-1.text-sm.text-muted-foreground.hover_text-action-hover.transition(href='{rootUrl}/')
                span &larr;
                span(class='translate-x-1.5').underline.group-hover_translate-x-1.transition Return Home

    +if('SHOW_BACKGROUND_IMAGE')
      .relative.hidden.w-0.flex-1.lg_block
        +if('!returningUser')
          .absolute.inset-0.z-10(class='bg-action/50', transition:fade='{{ duration: 300 }}')
        img.absolute.inset-0.h-full.w-full.object-cover(src='signin-image.jpg', alt='')
</template>
