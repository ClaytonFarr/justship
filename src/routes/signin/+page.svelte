<script lang="ts">
  import { PUBLIC_PRODUCT_NAME, PUBLIC_ORIGIN } from '$env/static/public'
  import { tick } from 'svelte'
  import { fade } from 'svelte/transition'
  import { superForm } from 'sveltekit-superforms'
  import TextInput from '$components/common/forms/TextInput.svelte'
  import Checkbox from '$components/common/forms/Checkbox.svelte'
  import Button from '$components/common/forms/Button.svelte'
  import Google from '$components/common/images/icons/Google.svelte'

  const { data } = $props()

  let returningUser = $state(true)
  let email = $state('')
  let password = $state('')
  let email_input: HTMLInputElement | null = $state(null)
  let password_input: HTMLInputElement | null = $state(null)
  let rememberMe = $state(false)
  let requestReset = $state(false)
  let signup_email_sent = $state(false)
  let reset_email_sent = $state(false)
  let loadErrorMessage = $state('')

  const { enhance, errors, submitting } = superForm(data.form, {
    onResult(event) {
      console.log(event)
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
      console.log(result)
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
    .flex.flex-1.flex-col.px-6.py-12.sm_py-24.transition.sm_px-6.lg_flex-none.lg_px-20.xl_px-24.returningUser(class!='{ returningUser ? "bg-white" : "bg-action/10" }')

      //- SIGN IN FORM
      +if('returningUser')
        +if('!requestReset')
          .mx-auto.w-full.max-w-sm.lg_w-96
            a(href='{PUBLIC_ORIGIN}/')
              img.h-10.w-auto(src='{PUBLIC_ORIGIN}/logo.svg', alt='{ PUBLIC_PRODUCT_NAME }')
            .mt-8.space-y-3
              h2.text-2xl.font-medium.leading-9.tracking-tight.text-content-heading Welcome Back
              p.mt-2.flex.gap-x-2.text-sm.leading-6.text-content-secondary
                span New?
                button.group.flex.font-medium.text-action.hover_text-action-hover.transition(onclick!='{ () => returningUser = !returningUser }')
                  span Sign Up
                  span(class='group-hover_translate-x-1.5').translate-x-1.transition &rarr;

            .mt-10
              +if('loadErrorMessage')
                .text-sm.px-4.py-3.my-1.rounded.text-rose-900.border.border-rose-200.bg-rose-50.mb-6 { loadErrorMessage }
              form.space-y-6(method='post', action='{PUBLIC_ORIGIN}/signin?/signin_with_email', use:enhance)
                // prettier-ignore
                TextInput(id='email', label='Email', type='email', required, bind:value='{ email_input }', autofocus='{returningUser ? true : false}')
                // prettier-ignore
                TextInput(id='password', label='Password', type='password', required, bind:value='{ password_input }', autocomplete='current-password')
                .flex.items-center.justify-between
                  // prettier-ignore
                  Checkbox(id='remember-me', label='Remember me', bind:checked='{ rememberMe }')
                  .text-sm.leading-6
                    button.font-medium.text-action.hover_text-action-hover(type='button', onclick!='{ () => requestReset = !requestReset }') Forgot password?
                +if('$errors.signin_error_message || $errors.email || $errors.password')
                  .text-sm.px-4.py-3.my-1.rounded.text-rose-900.border.border-rose-200.bg-rose-50 { $errors.signin_error_message } { $errors.email } { $errors.password }
                .pt-2
                  Button(label='Sign In', type='submit', large, loading='{ $submitting }', disabled='{ $submitting }', processingLabel='Signing In...')

              .mt-10
                .flex.items-center
                  .w-full.border-t.border-input(aria-hidden='true')
                  span.px-6.text-content-heading.whitespace-nowrap Or sign in with
                  .w-full.border-t.border-input(aria-hidden='true')
                .mt-6
                  a.flex.w-full.items-center.justify-center.gap-3.rounded-md.bg-white.px-3.py-2.text-sm.font-medium.text-content-heading.shadow-sm.ring-1.ring-inset.ring-input.hover_bg-surface-light-50.focus-visible_ring-transparent(
                    href='{PUBLIC_ORIGIN}/signin/google'
                  )
                    Google
                    span.text-sm.font-medium.leading-6 Google
              
              .mt-10
                a.group.flex.gap-x-1.text-sm.text-content-tertiary.hover_text-action-hover.transition(href='{PUBLIC_ORIGIN}/')
                  span &larr;
                  span(class='translate-x-1.5').underline.group-hover_translate-x-1.transition Return Home

          //- RESET REQUEST FORM
          +else
            .mx-auto.w-full.max-w-sm.lg_w-96
              a(href='{PUBLIC_ORIGIN}/')
                img.h-10.w-auto(src='{PUBLIC_ORIGIN}/logo.svg', alt='{ PUBLIC_PRODUCT_NAME }')
              .mt-8.space-y-3
                h2.text-2xl.font-medium.leading-9.tracking-tight.text-content-heading Reset Password 
                p.text-sm.text-content-secondary Receive a link to reset your password.
                +if('!reset_email_sent')
                  p.mt-2.flex.gap-x-2.text-sm.leading-6.text-content-secondary
                    span Cancel?
                    button.group.flex.font-medium.text-action.hover_text-action-hover.transition(onclick!='{ () => requestReset = !requestReset }')
                      span Sign In
                      span(class='group-hover_translate-x-1.5').translate-x-1.transition &rarr;

              +if('!reset_email_sent')
                .mt-10
                  form.space-y-6(method='post', action='{PUBLIC_ORIGIN}/signin?/request_password_reset', use:enhance)
                    // prettier-ignore
                    TextInput(id='email', label='Email', type='email', required, bind:value='{ email_input }', autofocus='{requestReset ? true : false}')
                    +if('$errors.reset_error_message || $errors.email')
                      .text-sm.px-4.py-3.my-1.rounded.text-rose-900.border.border-rose-200.bg-rose-50 { $errors.reset_error_message } { $errors.email }
                    .pt-2
                      Button(label='Send Reset Link', type='submit', large, loading='{ $submitting }', disabled='{ $submitting }', processingLabel='Sending...')
                +else
                  .mt-10.space-y-3.text-content-body.text-sm.max-w-xs
                    p If an account exists for this address, you will receive a password reset link&nbsp;shortly.
                    p Please follow the instructions to reset your&nbsp;password.

              .mt-10
                a.group.flex.gap-x-1.text-sm.text-content-tertiary.hover_text-action-hover.transition(href='{PUBLIC_ORIGIN}/')
                  span &larr;
                  span(class='translate-x-1.5').underline.group-hover_translate-x-1.transition Return Home


        //- SIGN UP FORM
        +else
          .mx-auto.w-full.max-w-sm.lg_w-96
            a(href='{PUBLIC_ORIGIN}/')
              img.h-10.w-auto(src='{PUBLIC_ORIGIN}/logo.svg', alt='{ PUBLIC_PRODUCT_NAME }')
            .mt-8.space-y-3
              h2.text-2xl.font-medium.leading-9.tracking-tight.text-content-heading Sign Up for Free
              p.mt-2.flex.gap-x-2.text-sm.leading-6.text-content-secondary
                span Have an account?
                button.group.flex.font-medium.text-action.hover_text-action-hover.transition(onclick!='{ () => returningUser = !returningUser }')
                  span Sign In
                  span(class='group-hover_translate-x-1.5').translate-x-1.transition &rarr;

            +if('!signup_email_sent')
              .mt-10
                form.space-y-6(method='post', action='{PUBLIC_ORIGIN}/signin?/signup_with_email', use:enhance)
                  // prettier-ignore
                  TextInput(id='email', label='Email', type='email', required, bind:value='{ email_input }', autofocus='{!returningUser ? true : false}')
                  // prettier-ignore
                  TextInput(id='password', label='Password', type='password', required, bind:value='{ password_input }', autocomplete='current-password')
                  +if('$errors.signup_error_message || $errors.email || $errors.password')
                    .text-sm.px-4.py-3.my-1.rounded.text-rose-900.border.border-rose-200.bg-rose-50 { $errors.signup_error_message } { $errors.email } { $errors.password }
                  .pt-2
                    Button(label='Sign Up', type='submit', large, loading='{ $submitting }', disabled='{ $submitting }', processingLabel='Signing Up...')

                .mt-10
                  .flex.items-center
                    .w-full.border-t.border-input(aria-hidden='true')
                    span.px-6.text-content-heading.whitespace-nowrap Or sign up with
                    .w-full.border-t.border-input(aria-hidden='true')
                  .mt-6
                    a.flex.w-full.items-center.justify-center.gap-3.rounded-md.bg-white.px-3.py-2.text-sm.font-medium.text-content-heading.shadow-sm.ring-1.ring-inset.ring-input.hover_bg-surface-light-50.focus-visible_ring-transparent(
                      href='{PUBLIC_ORIGIN}/signin/google'
                    )
                      Google
                      span.text-sm.font-medium.leading-6 Google
              +else
                .my-6.space-y-1.text-content-body
                  p
                    span Verification email sent
                    +if('email_input?.value')
                      span to 
                      span.font-medium { email_input?.value }
                      +else
                        span .
                  p Please verify your address to sign in.

            .mt-10
              a.group.flex.gap-x-1.text-sm.text-content-tertiary.hover_text-action-hover.transition(href='{PUBLIC_ORIGIN}/')
                span &larr;
                span(class='translate-x-1.5').underline.group-hover_translate-x-1.transition Return Home

    .relative.hidden.w-0.flex-1.lg_block
      +if('!returningUser')
        .absolute.inset-0.z-10(class='bg-action/50', transition:fade='{{ duration: 300 }}')
      img.absolute.inset-0.h-full.w-full.object-cover(src='signin-image.jpg', alt='')</template>
