# StarFi Pay — website

Source for starfipay.com. The site is built in GoHighLevel (GHL). Each GHL page holds one Custom Code element, and everything else loads from this repo through GitHub Pages. Make changes here, not in GHL.

StarFi Pay is a trade name of Starfighter Financial LLC, an Arizona limited liability company owned by Samantha Martinez, President & CEO.

## How it works

Each page's Custom Code element contains only:

```html
<div id="ai-root" data-page="home"></div>
<script src="https://mylaunchpartner.github.io/starfi-pay/loader.js"></script>
```

If `data-page` is missing, `core.js` picks the page from the URL path (`/contact-us` → `contact`, and so on), so a cloned GHL page still loads the right content.

`loader.js` is a small stub that loads `core.js` with a cache key that changes every minute. `core.js` fetches `pages/<data-page>.html` and the shared partials, puts them on the page, and runs the page's scripts (nav, savings calculator, FAQ, the GHL form and the GHL calendar). It also strips GHL's section padding so pages run edge to edge.

The `ai-` prefixes on ids and classes (`ai-root`, `ai-shell`, `ai-nap`) are internal names carried over from the template. Leave them as they are; renaming them breaks the loader.

## Pages

| Live URL | `data-page` | File |
|---|---|---|
| `/` | `home` | `pages/home.html` |
| `/contact-us` | `contact` | `pages/contact.html` (GHL form `l9dHbUA0Lhn3K0IDt1Gz`, "Contact Us Form - General") |
| `/message-received` | `message-received` | `pages/message-received.html` (GHL calendar `ODUlJhywRK50Worsh354`, "StarFi Pay Fit Call") |
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
| `ODUlJhywRK50Worsh354` | ID of the StarFi Pay booking calendar in GHL |

## Design

The site follows the logo kit: Midnight `#0B1026`, Cobalt `#2D5BFF` (buttons and links), Gold `#F5B83D` (the star and the savings figure only), with Sora for headings and Public Sans for body text. Shared tokens and the header/footer live in `partials/shell.css`. Avoid pill labels above headings, colored words inside headlines, glow gradients and scroll-in animations.

## Assets

- `assets/starfi-pay-logo.png`: wordmark PNG (used in the schema)
- `assets/hero-merchant-checkout.jpg`, `assets/merchant-counter-tap.jpg`: home page photos, licensed from Envato ("Friendly Saleswoman Processes Mobile Payment at Store" by stockscar; "Happy Woman Paying with Phone at Zero Waste Store" by DC_Studio). Full-size originals are in Samantha's StarFi Pay folder.
- `assets/samantha-martinez-starfi-pay.jpg`: owner headshot (home, about, author and blog pages). Pages show "SM" initials if it fails to load.

## Making a change

1. Edit the file and commit to `main`.
2. GitHub Pages republishes in about a minute; the loader picks it up within a minute after that.

## Preview without the live site

`https://mylaunchpartner.github.io/starfi-pay/?page=about`
