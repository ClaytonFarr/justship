<script lang="ts">
  import {
    PUBLIC_COMPANY_NAME,
    PUBLIC_PRODUCT_NAME,
    PUBLIC_PRODUCT_DOMAIN,
    PUBLIC_ORIGIN,
    PUBLIC_SUPPORT_EMAIL,
  } from '$env/static/public'
  import type { PolicyLinks } from '$lib/types'
  const PUBLIC_COMPANY_NAME_SHORT = PUBLIC_COMPANY_NAME.replace(/,?\s*LLC$/, '') // strip LLC, if present

  const lastUpdatedDate: string = 'July 9, 2024'

  const appStatusMonitoringUrl = {
    include: false,
    url: 'status.domain.com', // omit `https://` prefix
  }
  const dataDeletion = {
    include: false,
    activeSystemsDeletionDays: 30,
    backupsDeletionDays: 60,
  }
  const additionalPolicies: PolicyLinks = {
    abuse: {
      include: false,
      url: '/policies/abuse/',
    },
    cancellation: {
      include: false,
      url: '/policies/cancellation/',
    },
    copyright: {
      include: false,
      url: '/policies/copyright/',
    },
    gdpr_dpa: {
      include: false,
      url: '/policies/gdpr-dpa.pdf',
    },
    ownership: {
      include: false,
      url: '/policies/ownership/',
    },
    refund: {
      include: false,
      url: '/policies/taxes/',
    },
    security: {
      include: false,
      url: '/policies/security/',
    },
    securityResponse: {
      include: false,
      url: '/policies/security/response/',
    },
    subprocessors: {
      include: false,
      url: '/policies/subprocessors/',
    },
    taxes: {
      include: false,
      url: '/policies/refund/',
    },
  }
</script>

<template lang="pug">
  h1 Terms of Service
  p: em Last updated – {lastUpdatedDate}

  p When you use any {PUBLIC_COMPANY_NAME_SHORT} products or services, you are agreeing to these latest Terms of Service (“Terms”). Violation of these terms may, at our discretion, result in us terminating your account.
  p We may update these Terms of Service at any time. If we make significant changes, we will refresh the date at the top of this page.

  h2 Definitions
  p “Company”, “we”, “our”, or “us” in any of our policies or terms, refers to {PUBLIC_COMPANY_NAME}.
  p “Services” refers to our websites, including {PUBLIC_PRODUCT_DOMAIN}, and any product created and maintained by { PUBLIC_COMPANY_NAME }, including the {PUBLIC_PRODUCT_NAME} app (all versions), whether delivered within a web browser, desktop application, mobile application, or another format.
  p Finally, “you” or “your” refers to the people or organizations that own an account with one or more of our Services.&nbsp;
    +if('additionalPolicies.ownership.include')
      | We have a specific #[a(href='{PUBLIC_ORIGIN}{additionalPolicies.ownership.url}') Account Ownership Policy] for our products.

  h2 Account Terms
  ol
    li You are responsible for maintaining the security of your account and password and for ensuring that any of your users do the same. The Company cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.
    +if('additionalPolicies.abuse.include')
      li You may not use the Services for any purpose outlined in our #[a(href='{PUBLIC_ORIGIN}{additionalPolicies.abuse.url}') Use Restrictions Policy], and you may not permit any of your users to do so, either.
    li You are responsible for all content posted to and activity that occurs under your account, including content posted by and activity of any users in your account.
    li You must be a human. Accounts registered by “bots” or other automated methods are not permitted.

  h2 Payment, Refunds, and Plan Changes
  ol
    li For paid Services that offer a free trial, we explain the length of trial when you sign up. After the trial period, you need to pay in advance to keep using the Service. If you do not pay, we will freeze your account and it will be inaccessible until you make payment. If your account has been frozen for a while, we will queue it up for auto-cancellation.&nbsp;
      +if('additionalPolicies.cancellation.include')
        | See our #[a(href='{PUBLIC_ORIGIN}{additionalPolicies.cancellation.url}') Cancellation Policy] for more details.
    li If you are upgrading from a free plan to a paid plan, we will charge your card immediately and your billing cycle starts on the day of upgrade. For other upgrades or downgrades in plan level, the new rate starts from the next billing cycle.
    li All fees are exclusive of all taxes, levies, or duties imposed by taxing authorities. Where required, we will collect those taxes on behalf of the taxing authority and remit those taxes to taxing authorities. Otherwise, you are responsible for payment of all taxes, levies, or duties.&nbsp;
      +if('additionalPolicies.taxes.include')
        | See our #[a(href='{PUBLIC_ORIGIN}{additionalPolicies.taxes.url}') Taxes Policy] for more details.
    +if('additionalPolicies.refund.include')
      li We process refunds according to our #[a(href='{PUBLIC_ORIGIN}{additionalPolicies.refund.url}') Refund Policy].

  h2 Cancellation and Termination
  ol
    li You are solely responsible for properly canceling your account.
      +if('additionalPolicies.cancellation.include')
        | You can find instructions for how to cancel your account in our #[a(href='{PUBLIC_ORIGIN}{additionalPolicies.cancellation.url}') Cancellation Policy].&nbsp;
      | An email or phone request to cancel your account is not automatically considered cancellation. If you need help canceling your account, you can always #[a(href='mailto:{PUBLIC_SUPPORT_EMAIL}') contact our Support team].
    li All of your content will be inaccessible from the Services immediately upon account cancellation.&nbsp;
      +if('dataDeletion.include')
        | Within {dataDeletion.activeSystemsDeletionDays} days, all content will be permanently deleted from active systems and logs. Within {dataDeletion.backupsDeletionDays} days, all content will be permanently deleted from our backups. We cannot recover this information once it has been permanently deleted.
    li If you cancel the Service before the end of your current paid up month, your cancellation will take effect immediately, and you will not be charged again. We do not automatically prorate unused time in the last billing cycle.&nbsp;
      +if('additionalPolicies.refund.include')
        | See our #[a(href='{PUBLIC_ORIGIN}{additionalPolicies.refund.url}') Refund Policy] for more details.
    li We reserve the right to suspend or terminate your account and refuse any and all current or future use of our Services for any reason at any time. Suspension means you and any other users on your account will not be able to access the account or any content in the account. Termination will furthermore result in the deletion of your account or your access to your account, and the deletion of all content in your account. We also reserve the right to refuse the use of the Services to anyone for any reason at any time
      +if('additionalPolicies.abuse.include')
        | , including, but not limited to violations of our #[a(href='{PUBLIC_ORIGIN}{additionalPolicies.abuse.url}') Use Restrictions Policy].
        +else
          | .
    li Verbal, physical, written or other abuse (including threats of abuse or retribution) of a Company employee or officer will result in immediate account termination.

  h2 Modifications to the Service and Prices
  ol
    li Sometimes it becomes technically impossible to continue a feature or we redesign a part of our Services because we think it could be better or we decide to close new signups of a product. We reserve the right at any time to modify or discontinue, temporarily or permanently, any part of our Services with or without notice.
    li Sometimes we change the pricing structure for our products. When we do that, we tend to exempt existing customers from those changes. However, we may choose to change the prices for existing customers. If we do so, we will give at least 30 days notice and will notify you via the email address on record. We may also post a notice about changes on our websites or the affected Services themselves.

  h2 Uptime, Security, and Privacy
  ol
    li Your use of the Services is at your sole risk. We provide these Services on an “as is” and “as available” basis. We do not offer service-level agreements, but do take uptime of our applications seriously.&nbsp;
    +if('appStatusMonitoringUrl.include')
      | Visit #[a(href='https://{appStatusMonitoringUrl.url}') {appStatusMonitoringUrl.url}] to see the status of our Services.
    li We reserve the right to temporarily disable your account if your usage significantly exceeds the average usage of other customers of the Services. We’ll reach out to the account owner before taking any action except in rare cases where the level of use may negatively impact the performance of the Service for other customers.
    li We take many measures to protect and secure your data through backups, redundancies, and encryption. We enforce encryption for data transmission from the public Internet. There are some edge cases where we may send your data through our network unencrypted.
    +if('additionalPolicies.security.include')
      | Please refer to our #[a(href='{PUBLIC_ORIGIN}{additionalPolicies.security.url}') Security Overview] for full details
      +if('additionalPolicies.securityResponse.include')
        | and our #[a(href='{PUBLIC_ORIGIN}{additionalPolicies.securityResponse.url}') Security Response] page for how to report a security incident or threat
      | .
    li You agree that {PUBLIC_COMPANY_NAME_SHORT} may process your data as described in our #[a(href='{PUBLIC_ORIGIN}/policies/privacy-policy') Privacy Policy] and for no other purpose. On rare occasion, our staff may access your data for the following reasons:
      ul
        li #[strong To help you with support requests you make.] We’ll ask for express consent before accessing your account.
        li #[strong On the rare occasions when an error occurs that stops an automated process partway through.] We get automated alerts when such errors occur. When we can fix the issue and restart automated processing without looking at any personal data, we do. In rare cases, we have to look at a minimum amount of personal data to fix the issue.
        li #[strong To safeguard {PUBLIC_COMPANY_NAME_SHORT}.] We’ll look at logs and metadata as part of our work to ensure the security of your data and the Services as a whole. If necessary, we may also access accounts as part of an abuse report investigation.
        li #[strong To the extent required by applicable law.] As a U.S. company with its main data infrastructure located in the US, we only preserve or share customer data if compelled by a U.S. government authority with a legally binding order or proper request under the Stored Communications Act, or in limited circumstances in the event of an emergency request. If a non-U.S. authority approaches {PUBLIC_COMPANY_NAME} for assistance, our default stance is to refuse unless the order has been approved by the U.S. government, which compels us to comply through procedures outlined in an established mutual legal assistance treaty or agreement mechanism. If {PUBLIC_COMPANY_NAME_SHORT} is audited by a tax authority, we only share the bare minimum billing information needed to complete the audit.
    +if('additionalPolicies.subprocessors.include')
      li We use third party vendors and hosting partners to provide the necessary hardware, software, networking, storage, and related technology required to run the Services. You can see a list of #[a(href='{PUBLIC_ORIGIN}{additionalPolicies.subprocessors.url}') all our subprocessors here].
    li Under the California Consumer Privacy Act (“CCPA”), {PUBLIC_COMPANY_NAME_SHORT} is a “service provider”, not a “business” or “third party”, with respect to your use of the Services. That means we process any data you share with us only for the purpose you signed up for and as described in these Terms and our #[a(href='{PUBLIC_ORIGIN}/policies/privacy-policy') Privacy Policy]. We do not retain, use, disclose, or sell any of that information for any other commercial purposes unless we have your explicit permission. Similarly, you agree to comply with your requirements under the CCPA and not use Basecamp’s Services in a way that violates the regulations.
    +if('additionalPolicies.gdpr_dpa.include')
      li These Terms incorporate the #[a(href='{PUBLIC_ORIGIN}{additionalPolicies.gdpr_dpa.url}') {PUBLIC_COMPANY_NAME_SHORT} Data Processing Addendum (“DPA”)] when the EU General Data Protection Regulation (“GDPR”) or United Kingdom General Data Protection Regulation (“UK GDPR”) applies to your use of {PUBLIC_COMPANY_NAME_SHORT} Services to process Customer Data as defined in the DPA. The DPA linked above supersedes any previously agreed data processing addendum between you and {PUBLIC_COMPANY_NAME} relating to your use of the {PUBLIC_COMPANY_NAME_SHORT} Services.

  h2 Copyright and Content Ownership
  ol
    li All content posted on the Services must comply with U.S. copyright law.&nbsp;
      +if('additionalPolicies.copyright.include')
        | We provide details on #[a(href='{PUBLIC_ORIGIN}{additionalPolicies.copyright.url}') how to file a copyright infringement claim].
    li You give us a limited license to use the content posted by you and your users in order to provide the Services to you, but we claim no ownership rights over those materials. All materials you submit to the Services remain yours.
    li We do not pre-screen content, but we reserve the right (but not the obligation) in our sole discretion to refuse or remove any content that is available via the Service.
    li The Company or its licensors own all right, title, and interest in and to the Services, including all intellectual property rights therein, and you obtain no ownership rights in the Services as a result of your use. You may not duplicate, copy, or reuse any portion of the HTML, CSS, JavaScript, or visual design elements without express written permission from the Company. You must request permission to use the Company’s logos or any Service logos for promotional purposes. Please #[a(href='mailto:{PUBLIC_SUPPORT_EMAIL}') email us] requests to use logos. We reserve the right to rescind any permissions if you violate these Terms.
    li You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Services, use of the Services, or access to the Services without the express written permission of the Company.

  h2 Services Adaptations and API Terms
  p We may offer Application Program Interfaces (“API”s) for some of our Services. Any use of the API, including through a third-party product that accesses the Services, is bound by these Terms plus the following specific terms:
  ol
    li You expressly understand and agree that we are not liable for any damages or losses resulting from your use of the API or third-party products that access data via the API.
    li Third parties may not access and employ the API if the functionality is part of an application that remotely records, monitors, or reports a Service user’s activity #[em other than time tracking] , both inside and outside the applications. The Company, in its sole discretion, will determine if an integration service violates this bylaw. A third party that has built and deployed an integration for the purpose of remote user surveillance will be required to remove that integration.
    li Abuse or excessively frequent requests to the Services via the API may result in the temporary or permanent suspension of your account’s access to the API. The Company, in its sole discretion, will determine abuse or excessive usage of the API. If we need to suspend your account’s access, we will attempt to warn the account owner first. If your API usage could or has caused downtime, we may cut off access without prior notice.
  p Some third-party providers may create integrations between our Services and theirs. We are not liable or accountable for any of these third-party integrations.

  h2 Liability
  p: strong You agree that the Company is not liable to you or to any third party for damages of any kind that result from the use of the Services, in ability to access data, or unauthorized access of your data or account. The Company is also not liable for damages of any kind related to actions of any third party that uses the Services, or any other consequences related to the Terms or Services.
  p If you have a question about any of these Terms, please #[a(href='mailto:{PUBLIC_SUPPORT_EMAIL}') contact our Support team].</template>
