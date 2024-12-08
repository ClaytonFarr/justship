<script lang="ts">
  import { enhance } from '$app/forms'
  import { PUBLIC_PRODUCT_NAME, PUBLIC_COMPANY_NAME } from '$env/static/public'
  import type { FooterContent } from '$lib/types'

  import Facebook from '$components/images/icons/Facebook.svelte'
  import Instagram from '$components/images/icons/Instagram.svelte'
  import X from '$components/images/icons/X.svelte'
  import Github from '$components/images/icons/Github.svelte'
  import Youtube from '$components/images/icons/Youtube.svelte'


  function getIconComponent(iconName: string) {
    switch (iconName) {
      case 'Facebook':
        return Facebook
      case 'Instagram':
        return Instagram
      case 'X':
        return X
      case 'GitHub':
        return Github
      case 'YouTube':
        return Youtube
      default:
        return null
    }
  }

  
  interface Props {
    id?: string;
    reversed?: boolean;
    currentYear?: number;
    // Default content - can overridden by data passed in at route page (e.g. `marketingContent.ts`)
    content?: FooterContent;
  }

  let {
    id = 'footer',
    reversed = false,
    currentYear = new Date().getFullYear(),
    content = {
    // example footer nav content below (likely unwanted or necessary if initially focusing on a single-page landing page)
    footerNav: {
      include: true,
      sections: [
        {
          heading: 'Solutions',
          links: [
            { text: 'Marketing', href: '#add' },
            { text: 'Analytics', href: '#add' },
            { text: 'Commerce', href: '#add' },
            { text: 'Insights', href: '#add' },
          ],
        },
        {
          heading: 'Support',
          links: [
            { text: 'Pricing', href: '#add' },
            { text: 'Documentation', href: '#add' },
            { text: 'Guides', href: '#add' },
            { text: 'API Status', href: '#add' },
          ],
        },
        {
          heading: 'Company',
          links: [
            { text: 'About', href: '#add' },
            { text: 'Blog', href: '#add' },
            { text: 'Jobs', href: '#add' },
            { text: 'Press', href: '#add' },
            { text: 'Partners', href: '#add' },
          ],
        },
        {
          heading: 'Legal',
          links: [
            { text: 'Privacy', href: '/policies/privacy-policy' },
            { text: 'Terms', href: '/policies/terms-of-service' },
          ],
        },
      ],
    },
    newsletter: {
      include: true,
      heading: 'Subscribe for updates',
      subheading: 'Get the latest product updates and special savings sent to your inbox.',
      ctaLabel: 'Subscribe',
      form: {
        action: '#add',
        method: 'post',
      },
    },
    social: {
      include: true,
      links: [
        { label: 'X', href: '#add' },
        { label: 'Instagram', href: '#add' },
        { label: 'Facebook', href: '#add' },
        { label: 'YouTube', href: '#add' },
        { label: 'GitHub', href: '#add' },
      ],
    },
  }
  }: Props = $props();
</script>

<template lang="pug">
  // prettier-ignore
  footer(class!='{ reversed ? "dark" : "" }', aria-labelledby='footer-heading' id='{id}')
    h2#footer-heading.sr-only Footer
    .bg-background
      .container.pb-8.pt-16.sm_pb-12.sm_pt-24

        img.h-7.mb-10(src='/logo.svg', alt='{ PUBLIC_PRODUCT_NAME }').dark_invert
        
        //- Footer Nav
        +if('content.footerNav?.include && content.footerNav.sections.length > 0')
          .grid.grid-cols-2.lg_grid-cols-4.gap-8
            +each('content.footerNav.sections as section')
              .mb-6
                h3.text-sm.font-medium.leading-6.text-foreground {section.heading}
                ul.mt-6.space-y-4(role='list')
                  +each('section.links as link')
                    li
                      a.text-sm.leading-6.text-muted-foreground.hover_text-action-hover.dark_hover_text-foreground(
                        href='{ link.href }'
                      ) {link.text}

        //- Newsletter Signup
        +if('content.newsletter?.include && content.newsletter.form.action')
          .mt-12.border-t.pt-8.lg_flex.lg_items-center.lg_justify-between(class='border-border dark_border-white/15')
            div
              h3.text-sm.font-medium.leading-6.text-foreground {content.newsletter.heading ?? 'Subscribe to our newsletter'}
              p.mt-2.text-sm.leading-6.text-muted-foreground {content.newsletter.subheading ?? 'Get the latest updates and special savings sent to your inbox.'}
            // prettier-ignore
            form(
              action="{content.newsletter.form.action}", 
              method="{content.newsletter.form.method ?? 'post'}" 
              use:enhance
              ).mt-6.sm_flex.sm_max-w-md.lg_mt-0
              label.sr-only(for='email-address') Email address
              input#email-address.w-full.min-w-0.appearance-none.rounded-md.border-0.bg-muted.px-3.text-base.text-foreground.shadow-sm.ring-1.ring-inset.ring-border.placeholder_text-muted-foreground.focus_ring-2.focus_ring-inset.focus_ring-action.sm_w-56.sm_text-sm.sm_leading-6(
                type='email',
                name='email-address',
                autocomplete='email',
                required,
                placeholder='Enter your email',
                class='py-1.5'
              )
              .mt-4.sm_ml-4.sm_mt-0.sm_flex-shrink-0
                button.flex.w-full.items-center.justify-center.rounded-md.bg-action.px-3.py-2.text-sm.font-medium.text-white.shadow-sm.hover_bg-action-hover.focus-visible_outline.focus-visible_outline-2.focus-visible_outline-offset-2.focus-visible_outline-action(
                  type='submit'
                  ) {content.newsletter.ctaLabel ?? 'Subscribe'}

        .mt-8.border-t.pt-8.md_flex.md_items-center.md_justify-between(class='border-border dark_border-white/15')
          //- Social Links
          +if('content.social?.include && content.social.links.length > 0')
            .flex.space-x-4.md_order-1
              +each('content.social.links as link')
                a.text-muted-foreground.opacity-75.hover_opacity-100.hover_text-action-hover(href='{ link.href }')
                  span.sr-only {link.label}
                  +if('getIconComponent(link.label)')
                    +const('Icon = getIconComponent(link.label)')
                    <Icon class='size-5' />

          .flex.space-x-6.md_order-2.leading-5.text-xs.text-muted-foreground.mt-8.md_mt-0
            //- Policies
            .flex.space-x-2
              a.hover_text-action-hover(href='/policies/privacy-policy') Privacy
              span &middot;
              a.hover_text-action-hover(href='/policies/terms-of-service') Terms

            //- Copyright
            span.text-muted-foreground &copy; {currentYear} {PUBLIC_COMPANY_NAME}. All rights reserved.
            
</template>
