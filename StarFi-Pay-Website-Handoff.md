# StarFi Pay website — build handoff

Give this file to a new Claude chat together with `starfi-pay-site.zip`. It covers everything needed to put starfipay.com live in GoHighLevel (GHL), using the same setup as accreditedinterchange.com.

## 1. What this is

- **Company:** StarFi Pay, a trade name (DBA) of **Starfighter Financial LLC**, an Arizona limited liability company.
- **Owner:** Samantha Martinez, President & CEO. She owns the company, runs it from Arizona, and signs for it.
- **Domain:** starfipay.com.
- **Services:** payment processing (interchange-plus), payroll, business insurance, and specialty processing for RUO peptide eCommerce merchants. Businesses served in all 50 states.
- **Address:** 2375 E Camelback Rd #600, Phoenix, AZ 85016.
- **Email:** support@starfipay.com.
- **Support line in the copy:** "24/7 U.S.-based support".
- **Source:** the site is a rebrand of the Accredited Interchange site. Pages, content, structure and ownership facts are the same; only the brand, legal entity and contact details changed.

## 2. How the site works

- Every GHL page holds one Custom Code element. Everything else (HTML, CSS, scripts, header, footer, contact block) loads from a GitHub repo through GitHub Pages.
- Changes are made in GitHub, never by pasting page code into GHL.
- `README.md` in the zip explains the file layout. Read it first.

The Custom Code element on each page contains only this, with `data-page` changed per page:

```html
<div id="ai-root" data-page="home"></div>
<script src="https://mylaunchpartner.github.io/starfi-pay/loader.js"></script>
```

Leave the `ai-` ids and class names as they are. They are internal names from the template, and `core.js` depends on them.

## 3. Step 1: GitHub repo

1. Samantha creates the empty repo **mylaunchpartner/starfi-pay** (public) on GitHub. Creating repos through Claude's proxy has failed before, so she does this step.
2. Unzip `starfi-pay-site.zip` and push its contents to `main`.
3. Samantha turns on GitHub Pages (Settings → Pages → Deploy from branch → `main` / root).
4. Check that `https://mylaunchpartner.github.io/starfi-pay/?page=home` renders.

If the repo name changes, find and replace `mylaunchpartner.github.io/starfi-pay` everywhere. It appears in the embed snippet, `core.js` comments, `seo/schema-head.html`, and the headshot URLs in the pages.

## 4. Step 2: fill in the missing values

Search the repo for `[[` and replace every token. Ask Samantha for any value you don't have, and never invent one.

| Token | Where | Value |
|---|---|---|
| `[[PHONE_DISPLAY]]` | `partials/nap.html` | Phone as shown |
| `[[PHONE_E164]]` | `partials/nap.html` (tel: link) | e.g. +16025550100 |
| `[[PHONE_E164_DASHED]]` | `seo/schema-head.html` | e.g. +1-602-555-0100 |
| `[[ACC_BUSINESS_ID]]` | `pages/about.html`, `pages/ownership.html` | Starfighter Financial LLC's Arizona Corporation Commission Business ID |
| `[[MERCHANT_LOGIN_URL]]` | header (×2), footer, contact page | Merchant portal login URL |
| `[[GHL_CONTACT_FORM_ID]]` | `pages/contact.html` (4 places) | Contact form ID from the new GHL sub-account |
| `[[GHL_BOOKING_CALENDAR_ID]]` | `pages/message-received.html` (2 places) | Booking calendar ID from the new GHL sub-account |

Confirm these with Samantha before launch. They were assumed, not stated:

- **Legal entity:** the exact name is "Starfighter Financial LLC" and it is an Arizona LLC.
- **Trade name filing:** StarFi Pay is registered as its trade name.
- **Founding year:** 2026, used on the About page and in the schema.

## 5. Step 3: GHL setup

Build in Samantha's StarFi Pay sub-account. If there isn't one, ask which sub-account to use.

### Form and calendar

1. Create a contact form (or clone "Contact Us Form - General" from the Accredited sub-account). Its embed ID goes into `[[GHL_CONTACT_FORM_ID]]`.
2. The form should redirect to `/message-received` after submit.
3. Create a booking calendar. Its ID goes into `[[GHL_BOOKING_CALENDAR_ID]]`.

### Website

Create the website (Sites → Websites), named **StarFi Pay**, and add these pages. Each page is one blank section holding one Custom Code element with the snippet above.

| Page | URL path | `data-page` | SEO title | Meta description |
|---|---|---|---|---|
| Home | `/` | `home` | StarFi Pay \| Owner Samantha Martinez | StarFi Pay is an Arizona company owned by Samantha Martinez, offering payment processing, payroll and business insurance nationwide. |
| Contact | `/contact-us` | `contact` | Contact StarFi Pay | Talk to StarFi Pay about payment processing, payroll or business insurance. Send a message and a specialist will follow up. |
| Message received | `/message-received` | `message-received` | Message Received \| StarFi Pay | Thanks for reaching out to StarFi Pay. Book a call with our team at a time that works for you. |
| Peptides | `/specialty-peptide-payment-processing` | `peptides` | RUO Peptide Payment Processing \| StarFi Pay | Specialized payment processing for Research Use Only peptide eCommerce: individual underwriting, fraud protection, chargeback management, and long-term stability. |
| Privacy | `/privacy-policy` | `privacy` | Privacy Policy \| StarFi Pay | Privacy Policy for StarFi Pay: how we collect, use, and protect your information across payment processing, payroll, and insurance services. |
| Terms | `/terms-of-service` | `terms` | Terms of Service \| StarFi Pay | Terms of Service for StarFi Pay payment processing, payroll, and commercial insurance services. |
| About | `/about` | `about` | About StarFi Pay \| Samantha Martinez, Owner | StarFi Pay is an Arizona company owned by Samantha Martinez, offering payment processing, payroll and business insurance nationwide. |
| Ownership | `/ownership` | `ownership` | Ownership \| StarFi Pay | StarFi Pay is owned by Samantha Martinez. Legal entity: Starfighter Financial LLC, an Arizona LLC (ACC Business ID [[ACC_BUSINESS_ID]]). |
| Author | `/samantha-martinez` | `samantha-martinez` | Samantha Martinez, President & CEO \| StarFi Pay | Samantha Martinez is the President and CEO of StarFi Pay, an Arizona payment processing, payroll and business insurance company. |

### Head tracking code

Under Website Settings → Head tracking code, paste `seo/schema-head.html`, after its tokens are filled.

### Blog

1. Create a GHL blog site named "StarFi Pay Blog" at `/blog`.
2. **Author:** Samantha Martinez. Role "President & CEO, StarFi Pay". Canonical link `/samantha-martinez`. Add her headshot.
3. **Categories** (these exact slugs are hard-coded in `pages/blog.html`): From the Owner (`from-the-owner`), Payments Guides (`payments-guides`), Industry Guides (`industry-guides`), Arizona Business (`arizona-business`). Also add Payroll & Insurance, then add its link to `pages/blog.html` once you know its slug.
4. **Blog Home page:** in the blog builder, keep GHL's **Blog Posts** element. Add a Custom Code element in the **same column, directly above** it, with `data-page="blog"`. The blog home and category pages share this template.
5. **Blog Home SEO:** title "StarFi Pay Blog | Samantha Martinez". Description "Payments, payroll and business guides from Samantha Martinez, President and CEO of StarFi Pay."
6. Do **not** copy the Accredited Interchange blog posts word for word. The same articles on two domains count as duplicate content and hurt both sites. Write new posts, or rewrite substantially.

### Builder tips learned on the Accredited build

- To add a Custom Code element:
  1. Click "+ Add Elements" and search "code".
  2. Click the Code card. It may land in a new section at the bottom.
  3. Drag it in the Layers panel to where it belongs.
  4. Delete any empty leftover section. Hover the section edge, then use the trash icon on its green side toolbar.
- After adding the element, click it, then "Open Code Editor", type the snippet, and click Save. Then save the page and click Publish.
- To clear a text field in the builder, select-all doesn't work. Press End, then Backspace repeatedly.
- The builder's canvas preview may not run the loader. Check the published page instead.

## 6. Step 4: launch

1. Point starfipay.com's DNS to GHL, using the records GHL shows when you add the domain. Samantha makes the DNS change herself.
2. After it resolves, load every page on starfipay.com at desktop and phone widths, and check:
   - Header dropdowns ("Specialty Processing", "More") open.
   - The contact form submits and redirects to `/message-received`.
   - The calendar loads.
   - The footer contact block shows the real phone.
   - No `[[` tokens remain anywhere.
   - The headshot loads.
3. Submit `https://starfipay.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools. This needs Samantha's logins.

## 7. Rules Samantha has set (carried over from Accredited Interchange)

- Don't brand the company with a state in parentheses (no "StarFi Pay (Arizona)"). Write "StarFi Pay" or the legal name.
- Do not name Eric or Anthony anywhere on the site. The only person shown is Samantha.
- **No graph-paper grid backgrounds.** She considers them a tell-tale sign of AI design. They have already been removed from these files; don't add them back.
- **Testimonials:** the home page testimonial section is hidden (`hidden` attribute, with a comment) because StarFi Pay has no customers of its own yet. Show it again only with real, permissioned customer quotes.
- Always include the time zone when stating a date or time. She is in Arizona (MST, UTC−7, no daylight saving).
- The headshot is `assets/samantha-martinez-starfi-pay.jpg`, the same photo as the Accredited site.
- Brand colors are the same indigo palette as Accredited Interchange (`--indigo #4F46FF`, ink `#0F1222`), with fonts Space Grotesk and Inter.
- **Logo:** the "StarFi Pay" wordmark, where the star is the dot of the "i". It is built in HTML and CSS in `partials/header.html` and `partials/footer.html` (classes `sf-wordmark`, `sf-star`, `sf-pay` in `partials/shell.css`). `assets/starfi-pay-logo.png` is a PNG of it for the schema and social use. Swap in a designed logo file if Samantha provides one.
