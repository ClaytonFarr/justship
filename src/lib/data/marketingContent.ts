import type { MarketingContent } from '$lib/types'

const annualPriceDiscount = (1 / 12) * 10 // e.g. 2 months free

export const marketingContent: MarketingContent = {
  hero: {
    heading: 'Accomplish the thing you desire',
    subheading:
      'Achieve your goals with ease and confidence using our suite of specific, high-value tools and features.',
    // newsTag: {
    //   primaryText: 'Take Note of This',
    //   secondaryText: 'See Something Important',
    //   href: '#faqs',
    // },
    links: {
      primary: {
        text: 'Get Started Today',
        href: '/signin?new',
      },
      secondary: {
        text: 'Sign In  →',
        href: '/signin',
      },
    },
    image: {
      type: 'screenshot',
      url: 'product-screenshot-hero.svg',
      alt: 'App Screenshot',
    },
  },
  features: {
    headingTagline: 'Accomplish what you need',
    heading: 'Everything you need to do exactly what you need.',
    subheading:
      'Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.',
    features: [
      {
        heading: 'Feature Heading',
        summary:
          'Pellentesque enim a commodo malesuada turpis eleifend risus. Facilisis donec placerat sapien consequat tempor fermentum nibh.',
        lucideIcon: 'CloudUpload',
        url: '',
      },
      {
        heading: 'Feature Heading',
        summary:
          'Pellentesque enim a commodo malesuada turpis eleifend risus. Facilisis donec placerat sapien consequat tempor fermentum nibh.',
        lucideIcon: 'LockKeyhole',
        url: '',
      },
      {
        heading: 'Feature Heading',
        summary:
          'Pellentesque enim a commodo malesuada turpis eleifend risus. Facilisis donec placerat sapien consequat tempor fermentum nibh.',
        lucideIcon: 'RefreshCw',
        url: '',
      },
      {
        heading: 'Feature Heading',
        summary:
          'Pellentesque enim a commodo malesuada turpis eleifend risus. Facilisis donec placerat sapien consequat tempor fermentum nibh.',
        lucideIcon: 'Award',
        url: '',
      },
      {
        heading: 'Feature Heading',
        summary:
          'Pellentesque enim a commodo malesuada turpis eleifend risus. Facilisis donec placerat sapien consequat tempor fermentum nibh.',
        lucideIcon: 'BookText',
        url: '',
      },
      {
        heading: 'Feature Heading',
        summary:
          'Pellentesque enim a commodo malesuada turpis eleifend risus. Facilisis donec placerat sapien consequat tempor fermentum nibh.',
        lucideIcon: 'Cable',
        url: '',
      },
    ],
  },
  cta: {
    heading: 'Get Started Today',
    subheading:
      'Discover the power of our solution. Take the next step towards achieving your goals and optimizing your workflows.',
    ctaLabel: 'Get first month free',
  },
  pricing: {
    headingTagline: 'Pricing',
    heading: 'Pricing plans for teams of all sizes',
    subheading:
      'Choose a plan that fits your needs – from our free starter option to our plans with comprehensive professional features.',
    cta: {
      include: true,
      requirePurchaseUrl: false,
    },
    plans: [
      {
        id: 'starter',
        name: 'Starter',
        description: 'Get started with essential features at no cost.',
        monthlyPrice: 0,
        annualPrice: Math.floor(0 * 12 * annualPriceDiscount),
        features: ['3 products', 'Up to 500 subscribers', 'Basic analytics', 'Email support'],
      },
      {
        id: 'pro',
        name: 'Pro',
        description: 'Advanced features for growing businesses and teams.',
        monthlyPrice: 49,
        annualPrice: Math.floor(49 * 12 * annualPriceDiscount),
        features: [
          '25 products',
          'Up to 10,000 subscribers',
          'Advanced analytics',
          '24-hour support time',
          'Marketing automations',
        ],
        isPopular: true,
      },
      {
        id: 'elite',
        name: 'Elite',
        description: 'Comprehensive features and support for large operations.',
        monthlyPrice: 99,
        annualPrice: Math.floor(99 * 12 * annualPriceDiscount),
        features: [
          'Unlimited products',
          'Unlimited subscribers',
          'Advanced analytics',
          '4-hour response time',
          'Marketing automations',
          'Custom reporting tools',
        ],
      },
    ],
  },
  faqs: {
    items: [
      {
        question: 'Question One',
        answer:
          'Curabitur blandit tempus porttitor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas faucibus mollis interdum.',
      },
      {
        question: 'Question Two',
        answer:
          'Curabitur blandit tempus porttitor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas faucibus mollis interdum.',
      },
      {
        question: 'Question Three',
        answer:
          'Curabitur blandit tempus porttitor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas faucibus mollis interdum.',
      },
      {
        question: 'Question Four',
        answer:
          'Curabitur blandit tempus porttitor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas faucibus mollis interdum.',
      },
      {
        question: 'Question Five',
        answer:
          'Curabitur blandit tempus porttitor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas faucibus mollis interdum.',
      },
      {
        question: 'Question Six',
        answer:
          'Curabitur blandit tempus porttitor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas faucibus mollis interdum.',
      },
    ],
  },
  footer: {
    // example footer nav content below (likely unwanted or necessary if initially focusing on a single-page landing page)
    // footerNav: {
    //   include: true,
    //   sections: [
    //     {
    //       heading: 'Product',
    //       links: [
    //         { text: 'Marketing', href: '#add' },
    //         { text: 'Analytics', href: '#add' },
    //         { text: 'Commerce', href: '#add' },
    //         { text: 'Insights', href: '#add' },
    //       ],
    //     },
    //     {
    //       heading: 'Support',
    //       links: [
    //         { text: 'Pricing', href: '#add' },
    //         { text: 'Documentation', href: '#add' },
    //         { text: 'Guides', href: '#add' },
    //         { text: 'API Status', href: '#add' },
    //       ],
    //     },
    //     {
    //       heading: 'Company',
    //       links: [
    //         { text: 'About', href: '#add' },
    //         { text: 'Blog', href: '#add' },
    //         { text: 'Jobs', href: '#add' },
    //         { text: 'Press', href: '#add' },
    //         { text: 'Partners', href: '#add' },
    //       ],
    //     },
    //     {
    //       heading: 'Legal',
    //       links: [
    //         { text: 'Privacy', href: '/policies/privacy-policy' },
    //         { text: 'Terms', href: '/policies/terms-of-service' },
    //       ],
    //     },
    //   ],
    // },
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
  },
}
