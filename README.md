# StarFi Pay — website

Source for starfipay.com. The site is built in GoHighLevel (GHL). Each GHL page holds one Custom Code element, and everything else loads from this repo through GitHub Pages. Make changes here, not in GHL.

StarFi Pay is a trade name of Starfighter Financial LLC, an Arizona limited liability company owned by Samantha Martinez, President & CEO.

## How it works

Each page's Custom Code element contains only:

```html
<div id="ai-root" data-page="home"></div>
<script src="https://mylaunchpartner.github.io/starfi-pay/loader.js"></script>
```

`loader.js` is a small stub that loads `core.js` with a cache key that changes every minute. `core.js` fetches `pages/<data-page>.html` and the shared partials, puts them on the page, and runs the page's scripts (nav, savings calculator, FAQ, the GHL form and the GHL calendar). It also strips GHL's section padding so pages run edge to edge.

The `ai-` prefixes on ids and classes (`ai-root`, `ai-shell`, `ai-nap`) are internal names carried over from the template. Leave them as they are; renaming them breaks the loader.

## Pages

| Live URL | `data-page` | File |
|---|---|---|
| `/` | `home` | `pages/home.html` |
| `/contact-us` | `contact` | `pages/contact.html` (GHL form `[[GHL_CONTACT_FORM_ID]]`) |
| `/message-received` | `message-received` | `pages/message-received.html` (GHL calendar `[[GHL_BOOKING_CALENDAR_ID]]`) |
| `/specialty-peptide-payment-processing` | `peptides` | `pages/peptides.html` |
| `/privacy-policy` | `privacy` | `pages/privacy.html` |
| `/terms-of-service` | `terms` | `pages/terms.html` |
| `/about` | `about` | `pages/about.html` |
| `/ownership` | `ownership` | `pages/ownership.html` |
| `/samantha-martinez` | `samantha-martinez` | `pages/samantha-martinez.html` |
| `/blog` and `/blog/category/*` | `blog` | `pages/blog.html` (sits above GHL's Blog Posts element) |

Page titles and meta descriptions are set in GHL (page builder → SEO & AI search optimization), not in these files.

## Shared parts

- `partials/header.html`: wordmark, main menu ("Specialty Processing" and "More" dropdowns), mobile menu
- `partials/footer.html`: footer columns and legal line
- `partials/nap.html`: name, legal entity, address, phone, email. Inserted wherever a page has `<!--ai:nap-->`, so it matches character for character everywhere.
- `partials/shell.css`: header, footer and wordmark styles

Pages mark where these go with `<!--ai:header-->` and `<!--ai:footer-->`. A block marked `data-ai-append-body` (the blog footer) is moved to the end of the page.

## Structured data

`seo/schema-head.html` is the Organization + Person JSON-LD. Paste it into GHL under the website's Settings → Head tracking code. Edit it here first, then paste.

## Values still to fill in

Search the repo for `[[` and replace each token:

| Token | What it is |
|---|---|
| `[[PHONE_DISPLAY]]` | Phone as shown, e.g. (602) 555-0100 |
| `[[PHONE_E164]]` | Same number for tel: links, e.g. +16025550100 |
| `[[PHONE_E164_DASHED]]` | Same number for schema, e.g. +1-602-555-0100 |
| `[[ACC_BUSINESS_ID]]` | Starfighter Financial LLC's Arizona Corporation Commission Business ID |
| `[[MERCHANT_LOGIN_URL]]` | Merchant portal login URL |
| `[[GHL_CONTACT_FORM_ID]]` | ID of the StarFi Pay contact form in GHL |
| `[[GHL_BOOKING_CALENDAR_ID]]` | ID of the StarFi Pay booking calendar in GHL |

## Assets

- `assets/starfi-pay-logo.png`: wordmark PNG (used in the schema)
- `assets/samantha-martinez-starfi-pay.jpg`: owner headshot (home, about, author and blog pages). Pages show "SM" initials if it fails to load.

## Making a change

1. Edit the file and commit to `main`.
2. GitHub Pages republishes in about a minute; the loader picks it up within a minute after that.

## Preview without the live site

`https://mylaunchpartner.github.io/starfi-pay/?page=about`
