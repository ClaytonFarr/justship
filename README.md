# Just Ship ⚡️ Customized

A personalized version of Fulco's [JustShip](https://github.com/ocluf/justship) SvelteKit marketing + app boilerplate.

## Updates Made

*Added*

+ Svelte Preprocess & Pug markup
+ Tailwind Forms plugin
+ Inter variable font
+ separate routes for 'marketing' and 'app' content


====

# Just Ship - A batteries included Svelte 5 SaaS Boilerplate

## Getting Started 🚀

### Local Development

1. Run `npm install --legacy-peer-deps` or `pnpm install`
2. Rename the `.env.example` file to `.env`
   - add a value to `.env` for `FROM_EMAIL` (e.g. 'noreply@domain.com')
3. Run `npm run generate && npm run migrate` to create a local database
4. [Install mailpit](https://mailpit.axllent.org/docs/install/) to receive emails locally
   - start mailpit running in background (e.g. `brew services start mailpit`)
   - note: can stop background mailpit process after dev (e.g. `brew services stop mailpit`)
5. run `npm run dev`
6. create a new account at [login page](http://localhost:5173/login) using any email address
   - check for sign-up email at [Mailpit localhost:8025](http://localhost:8025/)
   - click email activation link to create account and login

### Production

1. Get a domain name
2. Create a **[Postmark](https://postmarkapp.com/)** account and get Server API key
3. Set up account and database in **[Turso](https://turso.tech/)**
4. Create OAuth credential in **[Google Cloud](https://console.cloud.google.com/)**
5. Add project from repo to **[Vercel](https://vercel.com)**
6. Point main domain name to project on Vercel
7. Fill out environment variables in `.env`
8. Add environment variables to project in Vercel

## Tools / Packages / Services

† Added
~~Removed~~

- _Frontend / APIs_
  - Svelte 5
  - TailwindCSS
  - Tailwind Typography
  - DaisyUI
  - Embla Carousel
  - Lucide (icons)
  - Svelte Preprocess †
  - Pug †
- _App Framework & APIs_
  - SvelteKit 2
  - TypeScript
- _Forms_
  - SvelteKit Superforms
  - Tailwind Forms †
  - Zod
- _Auth_
  - Arctic
  - Lucia
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
