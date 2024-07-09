import type { signinTable } from './server/database/schema'

export interface MarketingContent {
  hero?: HeroContent
  features?: Features
  cta?: CtaContent
  pricing?: PricingContent
  faqs?: FaqContent
  footer?: FooterContent
}

export interface HeroContent {
  heading: string
  subheading: string
  newsTag: {
    show: boolean
    primaryText: string
    secondaryText: string
    href: string
  }
  links?: {
    primary: {
      text: string
      href: string
    }
    secondary?: {
      text: string
      href: string
    }
  }
  image: {
    type: 'screenshot' | 'photo'
    url: string
    alt: string
  }
}

interface Feature {
  heading: string
  summary: string
  lucideIcon: string
  url?: string
}

export interface Features {
  headingTagline: string
  heading: string
  subheading: string
  features: Feature[]
}

export interface CtaContent {
  heading: string
  subheading: string
  ctaLabel: string
}

export interface PricingPlan {
  id: string
  name: string
  description: string
  monthlyPrice: number
  annualPrice: number
  features: string[]
  isPopular?: boolean
  purchaseUrl?: string
}

export interface PricingContent {
  headingTagline: string
  heading: string
  subheading: string
  plans: PricingPlan[]
}

export type FaqContent = {
  items: Faq[]
}

export type Faq = {
  question: string
  answer: string // HTML
}

export interface FooterContent {
  footerNav?: {
    include: boolean
    sections: FooterNavSection[]
  }
  newsletter?: {
    include: boolean
    heading?: string
    subheading?: string
    ctaLabel?: string
    form: {
      action: string
      method?: string
    }
  }
  social?: {
    include: boolean
    links: Link[]
  }
}

interface FooterLink {
  text: string
  href: string
}

interface FooterNavSection {
  heading: string
  links: FooterLink[]
}

export interface Link {
  label: string
  href: string
}

export interface PolicyLink {
  include: boolean
  url: string
}

export type PolicyLinks = {
  [key: string]: PolicyLink
}

export interface PrivacyFeature {
  include: boolean
  url?: string
}

export type PrivacyFeatures = {
  [key: string]: PrivacyFeature
}

export type DefaultSeo = {
  pageTitle: string
  pageDescription: string
  twitterCard: string
  twitterSite: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage: string
  ogType: string
  ogTitle?: string
  ogDescription?: string
  ogUrl: string
  ogImage: string
}

export type Signin = typeof signinTable.$inferInsert

export type Seo = Partial<DefaultSeo>
