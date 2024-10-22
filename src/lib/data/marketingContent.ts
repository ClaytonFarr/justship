import type { MarketingContent } from '$lib/types'

const annualPriceDiscount = (1 / 12) * 10 // e.g. 2 months free

export const marketingContent: MarketingContent = {
  hero: {
    heading: 'Accomplish the thing you desire',
    subheading:
      'Achieve your goals with ease and confidence using our suite of specific, high-value tools and features.',
    newsTag: {
      primaryText: 'Take Note of This',
      secondaryText: 'See Something Important',
      href: '#faqs',
    },
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
      'Discover our comprehensive suite of tools designed to streamline your workflow and boost productivity. Our platform offers innovative solutions to meet your business needs.',
    features: [
      {
        heading: 'Feature Heading',
        summary:
          'This feature provides a powerful solution to enhance your productivity. It streamlines complex processes and saves you valuable time.',
        lucideIcon: 'CloudUpload',
        url: '',
      },
      {
        heading: 'Feature Heading',
        summary:
          'Improve your workflow efficiency with this intuitive feature. It offers advanced capabilities to optimize your daily tasks.',
        lucideIcon: 'LockKeyhole',
        url: '',
      },
      {
        heading: 'Feature Heading',
        summary:
          'Experience seamless integration and enhanced collaboration with this feature. It enables smooth communication across your team.',
        lucideIcon: 'RefreshCw',
        url: '',
      },
      {
        heading: 'Feature Heading',
        summary:
          'Unlock new possibilities with this innovative feature. It provides cutting-edge tools to drive your business forward.',
        lucideIcon: 'Award',
        url: '',
      },
      {
        heading: 'Feature Heading',
        summary:
          'Gain valuable insights and make informed decisions with this analytical feature. It offers comprehensive data visualization and reporting.',
        lucideIcon: 'BookText',
        url: '',
      },
      {
        heading: 'Feature Heading',
        summary:
          'Enhance your security and protect your data with this robust feature. It implements advanced measures to safeguard your information.',
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
        question: 'First Frequently Asked Question',
        answer:
          'This is a placeholder answer for the first frequently asked question. It provides a brief explanation or clarification on a common topic or concern related to our product or service.',
      },
      {
        question: 'Second Frequently Asked Question',
        answer:
          'Here is a sample response to the second frequently asked question. This answer aims to address another common inquiry or provide additional information about a specific aspect of what we offer.',
      },
      {
        question: 'Third Frequently Asked Question',
        answer:
          'The third question is answered with this placeholder text. It could cover details about pricing, features, or any other relevant topic that customers often want to know more about.',
      },
      {
        question: 'Fourth Frequently Asked Question',
        answer:
          'This is a generic answer to the fourth question in our FAQ section. It might explain a process, clarify a policy, or provide guidance on how to use a particular feature of our product or service.',
      },
      {
        question: 'Fifth Frequently Asked Question',
        answer:
          'The fifth FAQ item is addressed with this placeholder response. It could cover topics such as customer support, account management, or any other relevant area of interest to our users.',
      },
      {
        question: 'Sixth Frequently Asked Question',
        answer:
          'Our final FAQ item is answered here with generic placeholder text. This could be used to address any remaining common questions, concerns, or to provide additional helpful information to our customers.',
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
