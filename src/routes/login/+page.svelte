<script lang="ts">
  import { PUBLIC_PROJECT_NAME } from '$env/static/public'
  import { tick } from 'svelte'
  import { superForm } from 'sveltekit-superforms'
  import { Mail, Laugh } from 'lucide-svelte'
  import Google from '$lib/components/icons/Google.svelte'

  const { data } = $props()

  let email_input: HTMLInputElement | null = $state(null)
  let show_email_input = $state(false)
  let email_sent = $state(false)

  const { enhance, errors, submitting } = superForm(data.form, {
    onResult(event) {
      console.log(event)
      if (event.result.type === 'success') {
        email_sent = true
      }
    },
  })

  const handleEmail = async () => {
    if (!show_email_input && email_input) {
      show_email_input = true
      await tick()
      ;(email_input as HTMLInputElement).focus()
    }
  }
</script>

<template lang="pug">
  .flex.h-screen.items-center.justify-center.p-5
    .card.flex.w-full.flex-col.p-5(class='max-w-[470px]')
      +if('email_sent')
        .text-center
          mail.mx-auto.my-4(size='40')
            .text-3xl.font-bold.leading-none.tracking-tight Check your inbox
            .text-muted-primary.mx-auto.mt-4.text-lg.opacity-80(class='max-w-[32ch]')
              | We&apos;ve sent you an activation link. Please check your spam folder as well.

        +else
          .my-4.flex.w-full.flex-col.text-center(class='space-y-1.5')
            .mx-auto.w-fit
              Laugh.my-4.h-12.w-12
            p.mx-auto.text-3xl.font-semibold.leading-none.tracking-tight
              | Welcome to {PUBLIC_PROJECT_NAME}

          +if('data.user')
            a.btn.btn-primary.text-md.mt-4.w-full.font-semibold.md_text-lg(href='/') 
              | Continue with current account
            p.my-3.text-center.text-sm.opacity-70
              | Signed in as {data.user.email}
            +else
              a.btn.btn-primary.text-md.mt-4.w-full.font-semibold.md_text-lg(href='/login/google')
                Google.mr-3.w-4
                span Continue with Google

          +if('data.user')
            form(method='post', action='/login?/signout')
              button.btn.btn-ghost.text-md.mt-2.w-full.font-semibold.sm_text-lg(type='submit')
                | Sign in with a different account
            +else
              form(method='post', action='/login?/login_with_email', use:enhance)
                input.input.my-5.w-full(placeholder='Email', type='email', name='email', class:hidden='{ !show_email_input }', bind:this='{ email_input }')
                +if('$errors.email')
                  span.ml-1.mt-2.text-xs.text-red-500 {$errors.email}
                +if('show_email_input')
                  button.btn.text-md.w-full.font-semibold.sm_text-lg(type='submit', disabled='{ $submitting }')
                  +if('$submitting')
                    span.loading.loading-spinner.loading-xs.mr-2
                  span Continue
                  +else
                    button.btn.text-md.mt-4.w-full.font-semibold.sm_text-lg(onclick='{ handleEmail }', type='button')
                      | Continue with email</template>
