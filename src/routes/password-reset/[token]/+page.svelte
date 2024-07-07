<script lang="ts">
  import { PUBLIC_PRODUCT_NAME, PUBLIC_ORIGIN } from '$env/static/public'
  import { superForm } from 'sveltekit-superforms'
  import TextInput from '$components/common/forms/TextInput.svelte'
  import Button from '$components/common/forms/Button.svelte'

  const { data } = $props()

  let showForm = $state(!data.invalidToken && !data.success)
  let success = $state(data.success || false)

  const { form, enhance, errors, submitting } = superForm(data.form, {
    onResult: ({ result }) => {
      if (result.type === 'success') {
        showForm = false
        success = true
      }
    },
    onUpdated: ({ form }) => {
      if (form.valid) {
        $errors.password = undefined
      }
    },
  })

  function validatePassword() {
    if ($form.password.length < 8) {
      $errors.password = ['Password must be 8 or more characters.']
    } else {
      $errors.password = []
    }
  }
</script>

<template lang="pug">
  .flex.min-h-screen.items-center.justify-center.bg-surface-light.px-4.py-12.sm_px-6.lg_px-8
    .w-full.max-w-sm.space-y-8
      div
        a(href='{PUBLIC_ORIGIN}/')
          img.mx-auto.h-12.w-auto(src='/logo.svg', alt='{ PUBLIC_PRODUCT_NAME }')
        h2.mt-6.text-center.text-3xl.font-extrabold.text-content-heading Reset your password
        p.mt-4.text-center.text-sm.text-content-secondary
          | Enter your new password below.

      .mt-8
        +if('data.invalidToken && !success')
          .my-1.mb-6.rounded.border.border-rose-200.bg-rose-50.px-4.py-3.text-center.text-sm.leading-6.text-rose-900
            | Invalid or expired link - please #[a.underline.decoration-red-700(href='{PUBLIC_ORIGIN}/signin') request a new reset link] via 'Forgot Password'.
          +elseif('success')
            .my-1.mb-6.rounded.border.border-green-200.bg-green-50.px-4.py-3.text-center.text-sm.leading-6.text-green-900
              | Password reset successful.
            a.group.flex.justify-center.font-medium.text-action.transition.hover_text-action-hover(
              href='{PUBLIC_ORIGIN}/signin'
            )
              span Sign in with your new password
              span.translate-x-1.transition(class='group-hover_translate-x-1.5') &rarr;

          +elseif('showForm')
            +if('$errors.password')
              .my-1.mb-6.rounded.border.border-rose-200.bg-rose-50.px-4.py-3.text-sm.text-rose-900 { $errors.password }
            form.space-y-6(method='post', use:enhance)
              // prettier-ignore
              TextInput(id='password', label='New password', type='password', required, autofocus, bind:value='{$form.password}', on:blur='{validatePassword}')
              .pt-2
                Button(
                  label='Reset password',
                  type='submit',
                  large,
                  processingLabel='Resetting...',
                  loading='{ $submitting }',
                  disabled='{ $submitting }'
                )
          .mt-10
            a.group.flex.justify-center.gap-x-1.text-sm.text-content-tertiary.transition.hover_text-action-hover(
              href='{PUBLIC_ORIGIN}/'
            )
              span &larr;
              span.underline.transition.group-hover_translate-x-1(class='translate-x-1.5') Return Home</template>
