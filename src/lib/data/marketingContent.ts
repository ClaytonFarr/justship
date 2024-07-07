import type { MarketingContent } from '$lib/types'

export const marketingContent: MarketingContent = {
  hero: {
    heading: 'Accomplish the thing you desire',
    subheading:
      'Achieve your goals with ease and confidence using our suite of specific, high-value tools and features.',
    newsTag: {
      show: true,
      primaryText: 'Take Note of This',
      secondaryText: 'See Something Important',
      href: '#add',
    },
    links: {
      primary: {
        text: 'Try for Free',
        href: '#add',
      },
      secondary: {
        text: 'Learn More →',
        href: '#add',
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
      "Choose an affordable plan that's packed with the best features for engaging your audience, creating customer loyalty, and driving sales.",
    plans: [
      {
        id: 'freelancer',
        name: 'Freelancer',
        description: 'The essentials to provide your best work for clients.',
        monthlyPrice: 15,
        annualPrice: 144,
        features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
        purchaseUrl: '/signup',
      },
      {
        id: 'startup',
        name: 'Startup',
        description: 'A plan that scales with your rapidly growing business.',
        monthlyPrice: 30,
        annualPrice: 288,
        features: [
          '25 products',
          'Up to 10,000 subscribers',
          'Advanced analytics',
          '24-hour support response time',
          'Marketing automations',
        ],
        isPopular: true,
        purchaseUrl: '/signup',
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'Dedicated support and infrastructure for your company.',
        monthlyPrice: 60,
        annualPrice: 576,
        features: [
          'Unlimited products',
          'Unlimited subscribers',
          'Advanced analytics',
          '1-hour, dedicated support response time',
          'Marketing automations',
          'Custom reporting tools',
        ],
        purchaseUrl: '/signup',
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
    footerNav: {
      include: false,
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
            { text: 'Claim', href: '#add' },
            { text: 'Privacy', href: '#add' },
            { text: 'Terms', href: '#add' },
          ],
        },
      ],
    },
    newsletter: {
      include: true,
      heading: 'Subscribe to our newsletter',
      subheading: 'Get the latest updates and special savings sent to your inbox.',
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
