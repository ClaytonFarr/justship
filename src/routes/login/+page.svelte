<script lang="ts">
  import { PUBLIC_PROJECT_NAME } from '$env/static/public'
  import { tick } from 'svelte'
  import { fade } from 'svelte/transition'
  // import { enhance } from "$app/forms";
  import { superForm } from 'sveltekit-superforms'
  import TextInput from '$components/TextInput.svelte'
  import Checkbox from '$components/Checkbox.svelte'
  import Button from '$components/Button.svelte'
  import Google from '$components/icons/Google.svelte'
  import GitHub from '$components/icons/GitHub.svelte'

  const { data } = $props()

  let returningUser = $state(true)
  let rememberMe = $state(false)
  let email_input: HTMLInputElement | null = $state(null)
  let password_input: HTMLInputElement | null = $state(null)
  let show_email_input = $state(true)
  let email_sent = $state(false)

  const { enhance, errors, submitting } = superForm(data.form, {
    onResult(event) {
      console.log(event)
      if (event.result.type === 'success') {
        email_sent = true
      }
    },
  })
</script>

<template lang="pug">
  .flex.min-h-screen
    // prettier-ignore
    .flex.flex-1.flex-col.px-6.py-12.sm_py-24.transition.sm_px-6.lg_flex-none.lg_px-20.xl_px-24.returningUser(class!='{ returningUser ? "bg-white" : "bg-action/10" }')
      +if('returningUser')
        .mx-auto.w-full.max-w-sm.lg_w-96
          img.h-10.w-auto(src='logo.svg', alt='{ PUBLIC_PROJECT_NAME }')
          .mt-8.space-y-3
            h2.text-2xl.font-medium.leading-9.tracking-tight.text-gray-900 Welcome Back
            p.mt-2.flex.gap-x-2.text-sm.leading-6.text-gray-500
              span New?
              button.group.flex.font-medium.text-action.hover_text-action-hover.transition(onclick!='{ () => returningUser = !returningUser }')
                span Sign Up
                span(class='group-hover_translate-x-1.5').translate-x-1.transition &rarr;

          .mt-10
            form.space-y-6(method='post', action='/login?/login_with_email', use:enhance)
              // prettier-ignore
              TextInput(id='email', label='Email', type='email', required, bind:value='{ email_input }', autofocus='{returningUser ? true : false}')
              // prettier-ignore
              TextInput(id='password', label='Password', type='password', required, bind:value='{ password_input }', autocomplete='current-password')
              .flex.items-center.justify-between
                // prettier-ignore
                Checkbox(id='remember-me', label='Remember me', bind:checked='{ rememberMe }')
                .text-sm.leading-6
                  a.font-medium.text-action.hover_text-action-hover(href='#fix') Forgot password?
              .pt-2
                Button(label='Sign In', type='submit', large)

            .mt-10
              .flex.items-center
                .w-full.border-t.border-gray-300(aria-hidden='true')
                span.px-6.text-gray-900.whitespace-nowrap Or sign in with
                .w-full.border-t.border-gray-300(aria-hidden='true')
              .mt-6
                a.flex.w-full.items-center.justify-center.gap-3.rounded-md.bg-white.px-3.py-2.text-sm.font-medium.text-gray-900.shadow-sm.ring-1.ring-inset.ring-gray-300.hover_bg-gray-50.focus-visible_ring-transparent(
                  href='/login/google'
                )
                  Google
                  span.text-sm.font-medium.leading-6 Google
            
            .mt-10
              a.group.flex.gap-x-1.text-sm.text-slate-400.hover_text-action-hover.transition(href='/')
                span &larr;
                span(class='translate-x-1.5').underline.group-hover_translate-x-1.transition Return Home

        +else
          .mx-auto.w-full.max-w-sm.lg_w-96
            img.h-10.w-auto(src='logo.svg', alt='{ PUBLIC_PROJECT_NAME }')
            .mt-8.space-y-3
              h2.text-2xl.font-medium.leading-9.tracking-tight.text-gray-900 Sign Up for Free
              p.mt-2.flex.gap-x-2.text-sm.leading-6.text-gray-500
                span Have an account?
                button.group.flex.font-medium.text-action.hover_text-action-hover.transition(onclick!='{ () => returningUser = !returningUser }')
                  span Sign In
                  span(class='group-hover_translate-x-1.5').translate-x-1.transition &rarr;

            .mt-10
              form.space-y-6(method='post', action='/login?/signup_with_email', use:enhance)
                // prettier-ignore
                TextInput(id='email', label='Email', type='email', required, bind:value='{ email_input }', autofocus='{!returningUser ? true : false}')
                // prettier-ignore
                TextInput(id='password', label='Password', type='password', required, bind:value='{ password_input }', autocomplete='current-password')
                .pt-2
                  Button(label='Sign Up', type='submit', large)

              .mt-10
                .flex.items-center
                  .w-full.border-t.border-gray-300(aria-hidden='true')
                  span.px-6.text-gray-900.whitespace-nowrap Or sign up with
                  .w-full.border-t.border-gray-300(aria-hidden='true')
                .mt-6
                  a.flex.w-full.items-center.justify-center.gap-3.rounded-md.bg-white.px-3.py-2.text-sm.font-medium.text-gray-900.shadow-sm.ring-1.ring-inset.ring-gray-300.hover_bg-gray-50.focus-visible_ring-transparent(
                    href='/login/google'
                  )
                    Google
                    span.text-sm.font-medium.leading-6 Google

              .mt-10
                a.group.flex.gap-x-1.text-sm.text-slate-400.hover_text-action-hover.transition(href='/')
                  span &larr;
                  span(class='translate-x-1.5').underline.group-hover_translate-x-1.transition Return Home

    .relative.hidden.w-0.flex-1.lg_block
      +if('!returningUser')
        .absolute.inset-0.z-10(class='bg-action/50', transition:fade='{{ duration: 300 }}')
      img.absolute.inset-0.h-full.w-full.object-cover(
        src='https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1908&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1908&q=80',
        alt=''
      )</template>
