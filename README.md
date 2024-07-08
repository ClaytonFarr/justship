# Just Ship ⚡️ Customized

A customized version of Fulco's [JustShip](https://github.com/ocluf/justship) SvelteKit marketing + app boilerplate.

## Customizations

- added Svelte Preprocess + Pug
- converted markup to Pug syntax
- added custom font (Inter, Lexend)
- added Tailwind Forms
- removed DaisyUI
- removed Embla Carousel
- created separate routes for 'marketing' and 'app' content, with auth control
- removed original marketing components
- updated sign-up & sign-in to use email & password
- made Google Oauth sign-up & sign-in optional
- added password reset flow
- added new Tailwind marketing components
- (pending) add basic layout & linked data for privacy & terms pages
- (pending) added app settings page

========================

# Just Ship

A batteries included Svelte 5 SaaS Boilerplate - https://github.com/ocluf/justship

## Getting Started 🚀

### Local Development

1. Use original repo as template (or fork) to create new repo
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

### Production

1. Update missing / placeholder content
   - `src/lib/data/marketingContent.ts`
2. (Optional) Have or get a domain name
   - (Optional) Setup email account(s) with new domain to create new infrastructure accounts below (e.g. using service like [Migadu](https://migadu.com/))
3. Setup mail service with **[Postmark](https://postmarkapp.com/)**
   - create new account OR access existing account
   - go to 'API Tokens': copy 'Server API token'
   - add token to `.env` as 'POSTMARK_SERVER_TOKEN' value
4. Setup database with **[Turso](https://turso.tech/)**
   - create new account OR access existing account
   - create new database
   - select database
   - copy database url & add to `.env` as 'TURSO_DB_URL' value
   - generate database token (read & write) & add to `.env` as 'TURSO_DB_AUTH_TOKEN' value
5. (Optional: if want to use Google sign-up/in) Setup Google OAuth with **[Google Cloud](https://console.cloud.google.com/)**
   - set `PUBLIC_GOOGLE_OAUTH_ENABLED=true` in `.env`
   - create new account OR access existing account
   - create new project OR use existing project
   - navigation to 'APIs & Services' : 'Credentials'
   - select '+ Create Credentials' : 'OAuth client ID'
   - (other details pending) …
6. Setup billing with **[Stripe](https://stripe.com)**
   - create new account OR access existing account
   - (details pending) …
7. Setup analytics with **[PostHog](https://posthog.com)**
   - create new account OR access existing account
   - (details pending) …
8. Setup hosting with **[Vercel](https://vercel.com)**
   - create new account OR access existing account
   - add new project, importing from own repo
   - add environment variables to project
     - can copy-paste full text from `.env` into 'Environment Variables' section of Vercel 'Configure Project' step
   - check for successful build
     - if encounter issues, can run `npm run build` in local project to problem-solve
   - (Optional) add domain name to project on Vercel

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
