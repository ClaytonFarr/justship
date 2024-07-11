# Just Ship ⚡️ Customized

A customized version of Fulco's [JustShip](https://github.com/ocluf/justship) SvelteKit marketing + app boilerplate.

This boilerplate provides a full stack shell for a SaaS application driven by SvelteKit with Typescript/Node and SQLite, with separate marketing and application front-ends, user accounts, auth access and control, and paid plans billed with Stripe.

## Customizations

- added Svelte Preprocess + Pug
- converted markup to Pug syntax
- added custom fonts (Inter, Lexend)
- added Tailwind Forms
- removed DaisyUI
- removed Embla Carousel
- created separate routes for 'marketing' and 'app' content, with auth control
- made Google Oauth sign-up & sign-in optional
- removed original marketing components
- added new Tailwind marketing components
- added default privacy & terms content
- updated sign-up & sign-in to use email & password
- added password reset flow
- connected creation of Stripe customer on sign-up
- update pricing UX to default new accounts to free plan

_You'll Need To Build_

- your application 😉
- application settings page (allowing user to manage auth settings and update plan, via Stripe Checkout)
- responses to billing events (see `src/routes/stripe/webhook/server.ts` for starter)

========================

# Just Ship

A batteries included Svelte 5 SaaS Boilerplate - https://github.com/ocluf/justship

## Pricing UX + Plan Assumptions

The current UX and code presume you have a free plan, plus optional paid plans. When a user signs up, the app will create a new user record + an associated Stripe customer record + that is subscribed automatically to your free plan. The user can then change plans within their app settings when prompted/desired.

## Getting Started 🚀

### Local Development

1. Use original repo as template (or fork) to create new GitHub repo
2. Within local copy of repo run `npm install --legacy-peer-deps` or `pnpm install`
3. Rename the `.env.example` file to `.env`
   - add a value to `.env` for `FROM_EMAIL` (e.g. 'noreply@domain.com')
4. Run `npm run generate && npm run migrate` to create a local database
5. [Install mailpit](https://mailpit.axllent.org/docs/install/) to receive emails locally
   - start mailpit running in background (e.g. `brew services start mailpit`)
   - note: can stop background mailpit process after dev (e.g. `brew services stop mailpit`)
6. run `npm run dev`
7. create a new account at [sign in page](http://localhost:5173/signin) using any email address
   - check for sign-up email at [Mailpit localhost:8025](http://localhost:8025/)
   - click email activation link to create account and sign in
8. Update missing / placeholder content
   - update static resources (or alternatively, the links to them across templates):
     - `static/logo.svg`
     - `static/favicons/…` (e.g. https://favicon.io/)
     - `static/socialcard.jpg`
     - `static/product-image-hero.png` / `static/product-screenshot-hero.svg`
     - `static/signin-image.jpg`
   - update marketing content:
     - can update marketing content in `src/lib/data/marketingContent.ts`
       - sections without content will not be shown
     - can reorder marketing sections by editing `src/routes/(marketing)/+page.svelte`
     - can update privacy policy and terms in `src/routes/(marketing)/privacy/+page.svelte` and `src/routes/(marketing)/terms/+page.svelte`
       - e.g. Privacy/Terms [References](https://github.com/basecamp/policies/tree/master?tab=readme-ov-file#steal-these-policies) of [Generators](https://app.termsfeed.com/)
9. Setup plans and billing with **[Stripe](https://stripe.com)**
   - create new account OR access existing account
     - configure public details at 'Settings : Business : Public details' (e.g. business name, help link, privacy/terms links, etc.)
   - setup test environment
     - search for 'Product Catalog'
       - create a product for each plan level (e.g. 'Starter Plan', 'Pro Plan', 'Elite Plan')
       - add pricing for each product
         - create at least one free plan (e.g. 'Starter Plan' / $0)
         - can optionally add multiple prices per product for monthly/yearly
         - will most likely use 'flat-rate' billing (for app recurring subscriptions)
         - within your free product (aka plan), select '...' menu link next to your $0 price and 'Copy price ID'
           - copy price id value to `STRIPE_FREE_PLAN_PRICE_ID_TEST` in `.env` (locally and in Vercel project)
     - configure Customer Portal settings at 'Settings : Billing : Customer portal'
       - e.g. business info, ability to switch subscription plans, etc.
       - optional: configure branding settings at 'Settings : Business : Branding'
     - search for 'Developers : Webhooks' (may be called 'Event Destinations' later)
       - create new endpoint with url `https://{www.yourdomain.com}/stripe/webhook`
       - add events to listen for:
         - `checkout.session.completed`
         - `customer.subscription.deleted`
         - `customer.subscription.updated`
         - `invoice.paid`
         - `invoice.payment_failed`
       - save endpoint and copy 'Signing secret' value to `STRIPE_WEBHOOK_SIGNING_SECRET_TEST` in `.env` (locally and in Vercel project)
     - search for 'Developers : API Keys'
       - copy key to `STRIPE_SECRET_KEY_TEST` in `.env` (locally and in Vercel project)
   - test plan subscriptions
     - you should now be able to in dev 1) create a new account, 2) verify email (using Mailpit), 3) see new Stripe user created with subscription to free product in Stripe's test environment
10. (Optional: if want to use Google sign-up/in) Setup Google OAuth with **[Google Cloud](https://console.cloud.google.com/)**
    - set `PUBLIC_GOOGLE_OAUTH_ENABLED=true` in `.env` (both locally and in Vercel project)
    - create new account, or access existing account
    - create new project, or use existing project
    - navigate to 'APIs & Services' : 'Credentials'
    - select '+ Create Credentials' : 'OAuth client ID'
    - (full details pending…)

### Production

1. Have or get a domain name
   - (Optional) Setup email account(s) with new domain to create new infrastructure accounts below (e.g. using service like [Migadu](https://migadu.com/))
2. Setup hosting with **[Vercel](https://vercel.com)**
   - create new account, or access existing account
   - add new project by importing repo from GitHub
   - add environment variables to Vercel project
     - can copy-paste full text from `.env` into 'Environment Variables' section of Vercel 'Configure Project' step
   - check for successful build
     - if encounter issues, can run `npm run build` locally to help problem-solve
   - add domain to project on Vercel
     - enable Vercel DNS and update A & CNAME records as indicated by Vercel
3. Setup email service with **[Postmark](https://postmarkapp.com/)**
   - create new account, or access existing account
   - confirm email if new account
   - navigate to 'Sender Signatures'
     - check valid email address present / add new one as needed
     - update DNS records to validate domain for email delivery
       - add Postmark's TEXT & CNAME records to Vercel 'DNS Records' for custom domain
       - check for successful verification at Postmark
   - go to 'API Tokens': copy 'Server API token'
   - update `.env` values, both locally and in Vercel project
     - update `FROM_EMAIL` value to email address from Postmark 'Sender Signatures'
     - add token as `POSTMARK_SERVER_TOKEN` value
4. Setup database with **[Turso](https://turso.tech/)**
   - create new account, or access existing account
   - create new database (if necessary, create new group first)
   - update `.env` values, both locally and in Vercel project; select database then
     - copy database url & add as `TURSO_DB_URL` value
     - generate database token (read & write) & add as `TURSO_DB_AUTH_TOKEN` value
   - in local repo, run `npm run migrate:prod` to create tables on production database tables
     - should see rows read/written in Turso database dashboard update from 0
5. Setup analytics with **[PostHog](https://posthog.com)**
   - create new account OR access existing account
   - complete Product Analytics : 'Get Started' setup flow
   - go to 'Settings' and copy 'Project API key'
   - update `.env` values, both locally and in Vercel project
     - add API key as `PUBLIC_POSTHOG_KEY` value
6. Test email service, database, and analytics
   - redeploy Vercel site if needed to use latest environment variables
   - on deployed site, create a new account
     - initially must use a valid email address that matches domain connected to Postmark account (during its 'review period')
     - should receive verification email (and also see 'Transactional Stream' messages number update in Postmark account)
     - should be able to sign in (and also see a new user in Turso `users` table with `email_verified=1`)
     - should see events in PostHog 'Web Analytics' dashboard
7. Activate plans and billing on **[Stripe](https://stripe.com)**
   - make account live & setup production environment
     - complete company details at 'Settings : Business : Business details' to activate production environment
     - in production environment, repeat steps in 'Development : Stripe' above to create Products, configure Customer Portal, create webhook
       - yep, for some reason, most of this has to be redone manually 🤦‍♂️
       - when viewing products, can select '...' menu and 'Copy to live mode' link
     - within your free product (aka plan), select '...' menu link next to your $0 price and 'Copy price ID'
       - copy price id value to `STRIPE_FREE_PLAN_PRICE_ID` in `.env` (locally and in Vercel project)
     - copy production webhook signing secret to `STRIPE_WEBHOOK_SIGNING_SECRET` in `.env` (locally and in Vercel project)
     - copy production secret key to `STRIPE_SECRET_KEY` in `.env` (locally and in Vercel project)
   - test plan subscriptions
     - you should now be able to in prod 1) create a new account (use address currently allowed by Postmark account), 2) verify email, 3) see new Stripe user created with subscription to free product in Stripe's production environment

========================

# Tools / Packages / Services

† Added, ~~Removed~~

- _Frontend_
  - Svelte 5
  - TailwindCSS
  - Tailwind Typography
  - ~~DaisyUI~~
  - ~~Embla Carousel~~
  - Lucide (icons)
  - Svelte Preprocess †
  - Pug †
  - Inter, Lexend fonts †
- _App Framework & APIs_
  - SvelteKit 2
  - TypeScript
- _Forms_
  - SvelteKit Superforms
  - Tailwind Forms †
  - Zod
- _Auth_
  - Lucia
  - Arctic
  - Olso
- _Database (SQLite/ORM)_
  - Drizzle
  - Turso
- _Email_
  - EmailJS
  - Postmark
  - Mailpit (local)
- _Payments_
  - Stripe
- _Linting_
  - Prettier
- _Testing_
  - Vitest
  - Playwright
- _Analytics_
  - PostHog
- _Hosting_
  - Vercel (frontend / serverless)
  - Turso (database)

## Tool / Service Rationale

- _Why Turso?_

  - The simplicity of SQLite, and Turso extends that simplicity by allowing it not to run on the same server as your application. This offers the best of both worlds: an excellent local development story and worry-free scalability and backups in production.

- _Why Vercel?_

  - Offers remarkable developer experience with features like branch previews and automatic deployments based on GitHub pushes. While it can be costlier with high traffic volumes, this boilerplate is meant for quick product experiments. If a product gains traction, migrating to another service is straightforward.

- _Why Stripe?_

  - Stripe provides an excellent developer experience. While I'm not particularly concerned that they aren't the merchant of record—a key selling point for Paddle or LemonSqueezy — I am open to other payment providers. Feel free to submit a pull request to add alternative payment options.

- _Why PostHog?_
  - PostHog offers a generous free tier, an extensive feature set, and comprehensive documentation. Although I haven’t tested many other analytics providers, my positive experience with PostHog has persuaded me to stick with it.
