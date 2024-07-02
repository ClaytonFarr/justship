<script lang="ts">
  import { tick } from 'svelte'
  import { PUBLIC_PROJECT_NAME } from '$env/static/public'
  import { superForm } from 'sveltekit-superforms'
  import { Mail, Laugh } from 'lucide-svelte'
  import Google from '$lib/components/icons/Google.svelte'

  const { data } = $props()

  let email_input: HTMLInputElement | null = $state(null)
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

  const handleEmail = async () => {
    if (!show_email_input && email_input) {
      show_email_input = true
      await tick()
      ;(email_input as HTMLInputElement).focus()
    }
  }
</script>

<template lang="pug">
  .flex.h-screen.items-center.justify-center.bg-slate-50.p-6
    .min-w-sm.flex.max-w-2xl.flex-col.items-center.space-y-4.rounded-xl.bg-white.p-12.shadow-sm
      h1.flex.items-center.gap-x-3.pb-5
        img.h-8.w-auto(src='logo.svg', alt='')
        span.text-2xl.font-semibold.tracking-tight {PUBLIC_PROJECT_NAME}

      +if('email_sent')
        .flex.flex-col.items-center.space-y-5
          .flex.items-center.gap-x-3
            Mail.w-6(strokeWidth='1.5')
            h2.text-lg.font-medium.leading-none.tracking-tight Check Your Inbox
          p.mx-auto.mt-4.max-w-sm.text-center.opacity-80
            | We&apos;ve sent you an activation link. Please check your spam folder as well.

        +else
          form(method='post', action='/login?/login_with_email', use:enhance)
            input.my-5.w-full.rounded.border-slate-500(
              placeholder='Email',
              type='email',
              name='email',
              class:hidden='{ !show_email_input }',
              bind:this='{ email_input }'
            )

            +if('$errors.email')
              span.ml-1.mt-2.text-xs.text-red-500 {$errors.email}
 
            +if('show_email_input')
              .space-y-2
                button.w-full.rounded-md.border.border-gray-200.px-5.py-2.font-medium(type='submit', disabled='{ $submitting }')
                  +if('$submitting')
                    svg.-ml-1.mr-3.h-5.w-5.animate-spin.text-white(xmlns='http://www.w3.org/2000/svg', fill='none', viewBox='0 0 24 24')
                      circle.opacity-25(cx='12', cy='12', r='10', stroke='currentColor', stroke-width='4')
                      path.opacity-75(
                        fill='currentColor',
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      )
                  span.text-md Sign In
                button.w-full.px-5.py-2(type='button', onclick!='{ () => show_email_input = false }')
                  span.text-sm Cancel
              +else
                button.flex.w-full.items-center.justify-center.gap-x-3.rounded-full.border.border-gray-200.px-6.py-2(onclick='{ handleEmail }', type='button')
                  Mail.w-5(strokeWidth='2')
                  span.text-md Sign In with Email

          +if('!show_email_input')
            a.mt-4.flex.w-full.items-center.justify-center.rounded-full.border.border-gray-200.px-5.py-2(href='/login/google', class='gap-x-2.5')
              Google.w-4
              span.text-md Sign In with Google</template>
