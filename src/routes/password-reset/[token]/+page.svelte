<script lang="ts">
  import { PUBLIC_PROJECT_NAME } from '$env/static/public'
  import { superForm } from 'sveltekit-superforms'
  import TextInput from '$components/TextInput.svelte'
  import Button from '$components/Button.svelte'

  const { data } = $props()

  const { enhance, errors, submitting } = superForm(data.form)
</script>

<template lang="pug">
  .flex.min-h-screen.items-center.justify-center.bg-gray-50.py-12.px-4.sm_px-6.lg_px-8
    .max-w-md.w-full.space-y-8
      div
        img.mx-auto.h-12.w-auto(src='/logo.svg', alt='{ PUBLIC_PROJECT_NAME }')
        h2.mt-6.text-center.text-3xl.font-extrabold.text-gray-900 Reset your password
        p.mt-2.text-center.text-sm.text-gray-600
          | Enter your new password below.

      .mt-8
        +if('$errors.password')
          .text-sm.px-4.py-3.my-1.rounded.text-rose-900.border-rose-400.bg-rose-50 { $errors.password }
        form.space-y-6(method='post', use:enhance)
          TextInput(id='password', label='New password', type='password', required, autofocus)
          .pt-2
            Button(label='Reset password', type='submit', large, loading='{ $submitting }', disabled='{ $submitting }', processingLabel='Resetting...')
</template>