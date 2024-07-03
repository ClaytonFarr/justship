<script lang="ts">
  import { PUBLIC_PROJECT_NAME } from '$env/static/public'
  import { fade } from 'svelte/transition'
  import { enhance } from '$app/forms'
  import TextInput from '$components/TextInput.svelte'
  import Checkbox from '$components/Checkbox.svelte'
  import Button from '$components/Button.svelte'
  import Google from '$components/icons/Google.svelte'
  import GitHub from '$components/icons/GitHub.svelte'

  let returningUser: boolean = true
  let email: string = ''
  let password: string = ''
  let rememberMe: boolean = false

  function handleSubmit() {
    // Handle form submission
    console.log({ email, password, rememberMe })
  }
</script>

<template lang="pug">
  +if('returningUser')
    .flex.min-h-screen
      .flex.flex-1.flex-col.px-4.py-24.sm_px-6.lg_flex-none.lg_px-20.xl_px-24
        .mx-auto.w-full.max-w-sm.lg_w-96
          img.h-10.w-auto(src='logo.svg', alt='{ PUBLIC_PROJECT_NAME }')
          .mt-8.space-y-3
            h2.text-2xl.font-medium.leading-9.tracking-tight.text-gray-900 Welcome Back
            p.mt-2.flex.gap-x-2.text-sm.leading-6.text-gray-500
              span New?
              button.text-action.hover_text-action-hover.font-medium(on:click!='{ () => returningUser = !returningUser }') Sign Up &rarr;

          .mt-10
            form.space-y-6(on:submit|preventDefault='{ handleSubmit }')
              // prettier-ignore
              TextInput(id='email', label='Email', type='email', required, bind:value='{ email }')
              // prettier-ignore
              TextInput(id='password', label='Password', type='password', required, bind:value='{ password }', autocomplete='current-password')

              .flex.items-center.justify-between
                // prettier-ignore
                Checkbox(id='remember-me', label='Remember me', bind:checked='{ rememberMe }')
                .text-sm.leading-6
                  a.text-action.hover_text-action-hover.font-medium(href='#fix') Forgot password?

              .pt-2
                Button(label='Sign In', type='submit', large)

            .mt-10
              .relative
                .absolute.inset-0.flex.items-center(aria-hidden='true')
                  .w-full.border-t.border-gray-200
                .relative.flex.justify-center.text-sm.font-medium.leading-6
                  span.bg-white.px-6.text-gray-900 Or sign in with

              .mt-6
                a.flex.w-full.items-center.justify-center.gap-3.rounded-md.bg-white.px-3.py-2.text-sm.font-medium.text-gray-900.shadow-sm.ring-1.ring-inset.ring-gray-300.hover_bg-gray-50.focus-visible_ring-transparent(
                  href='#fix'
                )
                  Google
                  span.text-sm.font-medium.leading-6 Google

      .relative.hidden.w-0.flex-1.lg_block
        img.absolute.inset-0.h-full.w-full.object-cover(
          src='https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1908&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1908&q=80',
          alt=''
        )

    +else
      .flex.min-h-screen
        .flex.flex-1.flex-col.px-4.py-24.sm_px-6.lg_flex-none.lg_px-20.xl_px-24
          .mx-auto.w-full.max-w-sm.lg_w-96
            img.h-10.w-auto(src='logo.svg', alt='{ PUBLIC_PROJECT_NAME }')
            .mt-8.space-y-3
              h2.text-2xl.font-medium.leading-9.tracking-tight.text-gray-900 Sign Up for Free
              p.mt-2.flex.gap-x-2.text-sm.leading-6.text-gray-500
                span Have an account?
                button.text-action.hover_text-action-hover.font-medium(on:click!='{ () => returningUser = !returningUser }') Sign In &rarr;

            .mt-10
              form.space-y-6(on:submit|preventDefault='{ handleSubmit }')
                // prettier-ignore
                TextInput(id='email', label='Email', type='email', required, bind:value='{ email }')
                // prettier-ignore
                TextInput(id='password', label='Password', type='password', required, bind:value='{ password }', autocomplete='current-password')

                .pt-2
                  Button(label='Sign Up', type='submit', large)

              .mt-10
                .relative
                  .absolute.inset-0.flex.items-center(aria-hidden='true')
                    .w-full.border-t.border-gray-200
                  .relative.flex.justify-center.text-sm.font-medium.leading-6
                    span.bg-white.px-6.text-gray-900 Or sign up with

                .mt-6
                  a.flex.w-full.items-center.justify-center.gap-3.rounded-md.bg-white.px-3.py-2.text-sm.font-medium.text-gray-900.shadow-sm.ring-1.ring-inset.ring-gray-300.hover_bg-gray-50.focus-visible_ring-transparent(
                    href='#fix'
                  )
                    Google
                    span.text-sm.font-medium.leading-6 Google

        .relative.hidden.w-0.flex-1.lg_block
          img.absolute.inset-0.h-full.w-full.object-cover(
            src='https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1908&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1908&q=80',
            alt=''
          )</template>
