<script lang="ts">
  import { PUBLIC_COMPANY_NAME, PUBLIC_PRODUCT_NAME, PUBLIC_ORIGIN, PUBLIC_SUPPORT_EMAIL } from '$env/static/public'
  import type { PrivacyFeatures } from '$lib/types'
  const PUBLIC_COMPANY_NAME_SHORT = PUBLIC_COMPANY_NAME.replace(/,?\s*LLC$/, '') // strip LLC, if present

  const lastUpdatedDate: string = 'July 9, 2024'

  const dataDeletion = {
    include: false,
    activeSystemsDeletionDays: 30,
    backupsDeletionDays: 60,
  }
  const privacyFeatures: PrivacyFeatures = {
    advertising: {
      include: false,
    },
    captcha: {
      include: false,
    },
    cancellation: {
      include: false,
      url: '/policies/cancellation/',
    },
    ccpa: {
      include: false,
      url: '/policies/ccpa',
    },
    changelog: {
      include: false,
      url: '/policies/privacy-changelog',
    },
    cookies: {
      include: false,
    },
    correspondence: {
      include: false,
    },
    enumerated_rights: {
      include: false,
    },
    gdpr_dpa: {
      include: false,
      url: '/policies/gdpr-dpa.pdf',
    },
    in_us: {
      include: false,
    },
    no_data_selling: {
      include: false,
    },
    no_implicit_marketing: {
      include: false,
    },
    mobile_app: {
      include: false,
    },
    secure_data: {
      include: false,
    },
    security_details: {
      include: false,
      url: '/policies/security/',
    },
    subprocessors: {
      include: false,
      url: '/policies/subprocessors/',
    },
  }
</script>

<template lang="pug">
  h1 Privacy policy
  p: em Last updated: {lastUpdatedDate}

  +if('privacyFeatures.no_data_selling.include')
    p The privacy of your data—and it is your data, not ours! We promise we never sell your data: never have, never will.

  p This policy applies to all products built and maintained by { PUBLIC_COMPANY_NAME } including {PUBLIC_PRODUCT_NAME} app (all versions).
  p This policy applies to our handling of information about site visitors, prospective customers, and customers and authorized users (in relation to their procurement of the services and management of their relationship with { PUBLIC_COMPANY_NAME_SHORT }). We refer collectively to these categories of individuals as "you" throughout this policy.
  p However, this policy does not cover information about a customer’s end users that { PUBLIC_COMPANY_NAME_SHORT } receives from a customer, or otherwise processes on a customer’s behalf, in connection with the services provided by { PUBLIC_COMPANY_NAME_SHORT } to the customer pursuant to an applicable services agreement (including the content of messages of customer end users ("End User Communications")). { PUBLIC_COMPANY_NAME_SHORT } processes End User Communications under the instructions of the relevant customer, which is the "data controller" or "business" (or occupies a similar role as defined in applicable privacy laws), as described in the applicable services agreement between such customer and { PUBLIC_COMPANY_NAME_SHORT }. { PUBLIC_COMPANY_NAME_SHORT }’s obligations as a "data processor" or "service provider" with respect to such information are defined in such services agreement and applicable data protection addendum and are not made part of this policy.
  p If you are a customer’s end user and you have questions about how your information is collected and processed through the services, please contact the organization who has provided your information to us for more information.
  +if('privacyFeatures.ccpa.include')
    p If you are a California resident, please #[a(href='{PUBLIC_ORIGIN}{privacyFeatures.ccpa.url}') click here to see our California Notice at Collection], which includes additional disclosures as required by California law.

  h2 What we collect and why
  p Our guiding principle is to collect only what we need. Here’s what that means in practice:

  h3 Identity and access
  p When you sign up for a { PUBLIC_COMPANY_NAME_SHORT } product, we ask for identifying information such as your name, email address, and maybe a company name. That’s so you can personalize your new account, and we can send you product updates and other essential information. We may also send you optional surveys from time to time to help us understand how you use our products and to make improvements. With your consent, we will send you our newsletter and other updates. We sometimes also give you the option to add a profile picture that displays in our products.&nbsp;
    +if('privacyFeatures.no_data_selling.include')
      | We’ll never sell your personal information to third parties
      +if('privacyFeatures.no_implicit_marketing.include')
        | , and we won’t use your name or company in marketing statements without your permission either
      | .

  h3 Billing information
  p If you sign up for a paid { PUBLIC_COMPANY_NAME_SHORT } product, you will be asked to provide your payment information and billing address. Credit card information is submitted directly to our payment processor and doesn’t hit { PUBLIC_COMPANY_NAME_SHORT } servers. We store a record of the payment transaction, including the last 4 digits of the credit card number, for purposes of account history, invoicing, and billing support. We store your billing address so we can charge you for service, calculate any sales tax due, send you invoices, and detect fraudulent credit card transactions. We occasionally use aggregate billing information to guide our marketing efforts.

  h3 Product interactions
  p We store on our servers the content that you upload or receive or maintain in your { PUBLIC_COMPANY_NAME_SHORT } product accounts. This is so you can use our products as intended, for example, to create projects in {PUBLIC_PRODUCT_NAME}. We keep this content as long as your account is active.&nbsp;
    +if('dataDeletion.include')
      | If you delete your account, we’ll delete the content within {dataDeletion.activeSystemsDeletionDays} days.

  h3 General Geolocation data
  p For most of our products, we log the full IP address used to sign up a product account and retain that for use in mitigating future spammy signups. We also log all account access by full IP address for security and fraud prevention purposes, and we keep this login data for as long as your product account is active.

  h3 Website interactions
  p We collect information about your browsing activity for analytics and statistical purposes such as conversion rate testing and experimenting with new product designs. This includes, for example, your browser and operating system versions, your IP address, which web pages you visited and how long they took to load, and which website referred you to us. If you have an account and are signed in, these web analytics data are tied to your IP address and user account until your account is no longer active. The web analytics we use are described further in the Advertising and Cookies section.

  +if('privacyFeatures.captcha.include')
    h3 Anti-bot assessments
    p We use #[a(href='https://en.wikipedia.org/wiki/CAPTCHA') CAPTCHA] across our applications to mitigate brute force logins and as a means of spam protection. We have a legitimate interest in protecting our apps and the broader Internet community from credential stuffing attacks and spam. When you log into your { PUBLIC_COMPANY_NAME_SHORT } accounts the CAPTCHA service evaluates various information (e.g., IP address, how long the visitor has been on the app, mouse movements) to try to detect if the activity is from an automated program instead of a human. The CAPTCHA service then provides { PUBLIC_COMPANY_NAME_SHORT } with the spam score results; we do not have access to the evaluated information.

  h3
    +if('privacyFeatures.advertising.include')
      | Advertising&nbsp;
      +if('privacyFeatures.advertising.include && privacyFeatures.cookies.include')
        | and&nbsp;
        +if('privacyFeatures.cookies.include')
        | Cookies
  +if('privacyFeatures.advertising.include')
    p { PUBLIC_COMPANY_NAME_SHORT } runs contextual ads on various third-party platforms such as Google, Reddit, and LinkedIn. Users who click on one of our ads will be sent to the {PUBLIC_PRODUCT_NAME} marketing site. Where permissible under law, we may load an ad-company script on their browsers that sets a third-party cookie and sends information to the ad network to enable evaluation of the effectiveness of our ads, e.g., which ad they clicked and which keyword triggered the ad, and whether they performed certain actions such as clicking a button or submitting a form.
  +if('privacyFeatures.cookies.include')
    p We also use persistent first-party cookies and some third-party cookies to store certain preferences, make it easier for you to use our applications, and perform A/B testing as well as support some analytics.
    p A cookie is a piece of text stored by your browser. It may help remember login information and site preferences. It might also collect information such as your browser type, operating system, web pages visited, duration of visit, content viewed, and other click-stream data. You can adjust cookie retention settings and accept or block individual cookies in your browser settings, although our apps won’t work and other aspects of our service may not function properly if you turn cookies off.

  +if('privacyFeatures.correspondence.include')
    h3 Voluntary correspondence
    p When you email { PUBLIC_COMPANY_NAME_SHORT } with a question or to ask for help, we keep that correspondence, including your email address, so that we have a history of past correspondence to reference if you reach out in the future.
    p We also store information you may volunteer, for example, written responses to surveys. If you agree to a customer interview, we may ask for your permission to record the conversation for future reference or use. We will only do so with your express consent.

  +if('privacyFeatures.mobile_app.include')
    h3 How we approach mobile app permissions
    p We offer optional desktop and mobile apps for some of our products. Because of how the platforms are designed, our apps typically must request your consent before accessing contacts, calendar, camera, and other privacy-sensitive features of your device. Consent is always optional and our apps will function without it, though some features may be unavailable. There are a few exceptions, for example:
    ul
      li Our iOS apps will ask for permission to use push notifications upon first sign-in.
      li Android apps do not require permission to send push notifications.
      li For our apps on Android 5, the OS will prompt for permission upon installation to read and write to your device files so that you can select attachments from your device to upload to the app, and can download files from the app to your device.

  h2 When we access or disclose your information
  +if('privacyFeatures.subprocessors.include')
    p #[strong To provide products or services you’ve requested]. We use some third-party subprocessors to help run our applications and provide the Services to you. You can see a list of #[a(href='{PUBLIC_ORIGIN}{privacyFeatures.subprocessors.url}') all our subprocessors here].
  p We may disclose your information at your direction if you integrate a third-party service into your use of our products. For example, we may allow you, at your option, to connect your Gmail account to your {PUBLIC_PRODUCT_NAME} account so that you can sign in.
  p No { PUBLIC_COMPANY_NAME_SHORT } human looks at your content except for limited purposes with your express permission, for example, if an error occurs that stops an automated process from working and requires manual intervention to fix. These are rare cases, and when they happen, we look for root cause solutions as much as possible to avoid them recurring. We may also access your data if required in order to respond to legal process (see "When required under applicable law" below).
  p #[strong To exclude you from seeing our ads.] Where permissible by law and if you have a {PUBLIC_PRODUCT_NAME} account, we may disclose a one-way hash of your email address with ad companies to exclude you from seeing our ads.
  p #[strong To help you troubleshoot or squash a software bug, with your permission.] If at any point we need to access your content to help you with a support case, we will ask for your consent before proceeding.
  p #[strong To investigate, prevent, or take action regarding restricted uses].] Accessing a customer's account when investigating potential abuse is a measure of last resort. We want to protect the privacy and safety of both our customers and the people reporting issues to us, and we do our best to balance those responsibilities throughout the process. If we discover you are using our products for a restricted purpose, we will take action as necessary, including notifying appropriate authorities where warranted.
  p #[strong Aggregated and de-identified data.] We may aggregate and/or de-identify information collected through the services. We may use de-identified or aggregated data for any purpose, including marketing or analytics.
  p #[strong When required under applicable law.] { PUBLIC_COMPANY_NAME_SHORT } is a U.S. company and all data infrastructure are located in the U.S.
  ul
    li Requests for user data. Our policy is to not respond to government requests for user data unless we are compelled by legal process or in limited circumstances in the event of an emergency request. However, if U.S. law enforcement authorities have the necessary warrant, criminal subpoena, or court order requiring us to disclose data, we must comply. Likewise, we will only respond to requests from government authorities outside the U.S. if compelled by the U.S. government through procedures outlined in a mutual legal assistance treaty or agreement. It is { PUBLIC_COMPANY_NAME_SHORT }’s policy to notify affected users before we disclose data unless we are legally prohibited from doing so, and except in some emergency cases.
    li Preservation requests. Similarly, { PUBLIC_COMPANY_NAME_SHORT }’s policy is to comply with requests to preserve data only if compelled by the U.S. Federal Stored Communications Act, 18 U.S.C. Section 2703(f), or by a properly served U.S. subpoena for civil matters. We do not disclose preserved data unless required by law or compelled by a court order that we choose not to appeal. Furthermore, unless we receive a proper warrant, court order, or subpoena before the required preservation period expires, we will destroy any preserved copies of customer data at the end of the preservation period.
    li If we are audited by a tax authority, we may be required to disclose billing-related information. If that happens, we will disclose only the minimum needed, such as billing addresses and tax exemption information.
  p Finally, if { PUBLIC_COMPANY_NAME_SHORT } is acquired by or merges with another company — we don’t plan on that, but if it happens — we’ll notify you well before any of your personal information is transferred or becomes subject to a different privacy policy.

  +if('privacyFeatures.enumerated_rights.include')
    h2 Your rights with respect to your information
    p At { PUBLIC_COMPANY_NAME_SHORT }, we strive to apply the same data rights to all customers, regardless of their location. Some of these rights include:
    ul
      li #[strong Right to Know.] You have the right to know what personal information is collected, used, shared or sold. We outline both the categories and specific bits of data we collect, as well as how they are used, in this privacy policy.
      li #[strong Right of Access.] This includes your right to access the personal information we gather about you, and your right to obtain information about the sharing, storage, security and processing of that information.
      li #[strong Right to Correction.] You have the right to request correction of your personal information.
      li #[strong Right to Erasure / "To Be Forgotten".] This is your right to request, subject to certain limitations under applicable law, that your personal information be erased from our possession and, by extension, from all of our service providers. Fulfillment of some data deletion requests may prevent you from using { PUBLIC_COMPANY_NAME_SHORT } services because our applications may then no longer work. In such cases, a data deletion request may result in closing your account.
      li #[strong Right to Complain.] You have the right to make a complaint regarding our handling of your personal information with the appropriate supervisory authority.
      li #[strong Right to Restrict Processing.] This is your right to request restriction of how and why your personal information is used or processed, including opting out of sale of your personal information.&nbsp;
        +if('privacyFeatures.no_data_selling.include')
          | Again: we never have and never will sell your personal data.
      li #[strong Right to Object.] You have the right, in certain situations, to object to how or why your personal information is processed.
      li #[strong Right to Portability.] You have the right to receive the personal information we have about you and the right to transmit it to another party. If you want to export data from your accounts, you can do so by #[a(href='mailto:{PUBLIC_SUPPORT_EMAIL}') contacting our Support team].
      li #[strong Right to not Be Subject to Automated Decision-Making.] You have the right to object to and prevent any decision that could have a legal or similarly significant effect on you from being made solely based on automated processes. This right is limited if the decision is necessary for performance of any contract between you and us, is allowed by applicable law, or is based on your explicit consent.
      li #[strong Right to Non-Discrimination.] We do not and will not charge you a different amount to use our products, offer you different discounts, or give you a lower level of customer service because you have exercised your data privacy rights. However, the exercise of certain rights may, by virtue of your exercising those rights, prevent you from using our Services.
    p Many of these rights can be exercised by signing in and updating your account information. Please note that certain information may be exempt from such requests under applicable law. For example, we need to retain certain information in order to provide our services to you.
    p In some cases, we also need to take reasonable steps to verify your identity before responding to a request, which may include, at a minimum, depending on the sensitivity of the information you are requesting and the type of request you are making, verifying your name and email address. If we are unable to verify you, we may be unable to respond to your requests. If you have questions about exercising these rights or need assistance, please #[a(href='mailto:{PUBLIC_SUPPORT_EMAIL}') contact us]. If an authorized agent is corresponding on your behalf, we will need written consent with a signature from the account holder before proceeding.
    p Depending on applicable law, you may have the right to appeal our decision to deny your request, if applicable. We will provide information about how to exercise that right in our response denying the request. You also have the right to lodge a complaint with a supervisory authority. If you are in the EU or UK, you can contact your data protection authority to file a complaint or learn more about local privacy laws.

  +if('privacyFeatures.secure_data.include')
    h2 How we secure your data
    p All data is encrypted via #[a(href='https://en.wikipedia.org/wiki/Transport_Layer_Security') SSL/TLS] when transmitted from our servers to your browser. The database backups are also encrypted. In addition, we go to great lengths to secure your data at rest.
      +if('privacyFeatures.security_details.include')
        | For more information about how we keep your information secure, please review our #[a(href='{PUBLIC_ORIGIN}{privacyFeatures.security_details.url}') security overview].

  +if('dataDeletion.include || privacyFeatures.cancellation.include')
    h2 What happens when you delete content in your product accounts
  +if('dataDeletion.include')
    p In many parts of our applications, we give you the option to trash content. Anything you trash in your product accounts while they are active will be kept in an accessible trash can for about {dataDeletion.activeSystemsDeletionDays - 5} days. After that time, the trashed content cannot be accessed via the application and we are not able to retrieve it for you. The trashed content may remain on our active servers for another {dataDeletion.activeSystemsDeletionDays} days, and copies of the content may be held in backups of our application databases for up to {dataDeletion.backupsDeletionDays} days total.
  +if('privacyFeatures.cancellation.include')
    p If you choose to cancel your account, your content will become immediately inaccessible.&nbsp;
      +if('dataDeletion.include')
        | Your data should be purged from our systems in full within {dataDeletion.backupsDeletionDays} days. This applies both for cases when an account owner directly cancels and for auto-canceled accounts.
      +if('privacyFeatures.cancellation?.url')
        | Please refer to our #[a(href='{PUBLIC_ORIGIN}{privacyFeatures.cancellation.url}') Cancellation policy] for more details.

  h2 Data retention
  p We keep your information for the time necessary for the purposes for which it is processed. The length of time for which we retain information depends on the purposes for which we collected and use it and your choices, after which time we may delete and/or aggregate it. We may also retain and use this information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements. Through this policy, we have provided specific retention periods for certain types of information.

  +if('privacyFeatures.in_us.include')
    h2 Location of site and data
    p Our products and other web properties are operated in the United States. If you are located in the European Union, UK, or elsewhere outside of the United States, #[strong please be aware that any information you provide to us will be transferred to and stored in the United States]. By using our websites or Services and/or providing us with your personal information, you consent to this transfer.

  +if('privacyFeatures.gdpr_dpa.include && privacyFeatures.gdpr_dpa.url')
    h2 When transferring personal data from the EU
    p The European Data Protection Board (EDPB) has issued guidance that personal data transferred out of the EU must be treated with the same level of protection that is granted under EU privacy law. UK law provides similar safeguards for UK user data that is transferred out of the UK. Accordingly, { PUBLIC_COMPANY_NAME_SHORT } has adopted a data processing addendum with Standard Contractual Clauses to help ensure this protection. { PUBLIC_COMPANY_NAME_SHORT }’s DPA is #[a(href='{PUBLIC_ORIGIN}{privacyFeatures.gdpr_dpa.url}') available here].
    p There are also a few ad hoc cases where EU personal data may be transferred to the U.S. in connection with { PUBLIC_COMPANY_NAME_SHORT } operations, for instance, if an EU user signs up for our newsletter or participates in one of our surveys or buys swag from our company online store. Such transfers are only occasional and data is transferred under the #[a(href='https://gdpr-info.eu/art-49-gdpr/') Article 49(1)(b) derogation] under GDPR and the UK version of GDPR.

  h2 Changes and questions
  p We may update this policy as needed to comply with relevant regulations and reflect any new practices.&nbsp;
    +if('privacyFeatures.changelog.include && privacyFeatures.changelog.url')
      | You can view a history of the #[a(href='{PUBLIC_ORIGIN}{privacyFeatures.changelog.url}') changes to our policies here].&nbsp;
    | Whenever we make a significant change to our policies, we will refresh the date at the top of this page and take any other appropriate steps to notify users.
  p Have any questions, comments, or concerns about this privacy policy, your data, or your rights with respect to your information? Please get in touch by emailing us at #[a(href='mailto:{PUBLIC_SUPPORT_EMAIL}') {PUBLIC_SUPPORT_EMAIL}] and we’ll be happy to try to answer them.</template>
