# Muskat Groceries — Website Brief & Build Specification

**Project:** Muskat Groceries e-commerce website  
**Document type:** Product brief, content direction and implementation prompt  
**Version:** 1.1 — 18 November 2026  
**Working concept:** *Fresh groceries. Real convenience. A little more joy.*

> **Important:** This is a proposed website, not a description of an existing Muskat Groceries website. The business supplied the customer-facing phone number **0796 110 826**, produce categories and delivery customer types. Delivery days are described in two ways (Monday/Wednesday/Saturday and everyday), so scheduling must be reconciled before publishing guaranteed delivery availability. Prices, delivery zones/fees, stock levels, payment accounts, and social handles still need confirmation. Product examples and other proposed copy are illustrative.

---

## 1. The brand

**Muskat Groceries** is a Nairobi-based grocery business focused on fresh, organic and exotic fruits and vegetables, according to a public business listing. It was founded by **Mary Muthoni**, who describes herself as **“Mama Mboga, but digital.”** Her journey from a local stall to a TikTok-driven grocery business is a strong point of differentiation.

**Brand positioning:** Fresh, organic and exotic fruits and vegetables delivered to homes, offices and hotels — with the warmth and trust of your favourite mama mboga and the convenience of shopping online.

**Business-supplied service details:**
- **Products:** Fresh, organic and exotic fruits and vegetables (retain these as the business’s self-description; substantiate any product-specific organic certification claims before applying labels).
- **Delivery recipients:** Homes, offices and hotels.
- **Delivery schedule:** One message says **Monday, Wednesday and Saturday**; another says **everyday**. Treat the three days as a possible regular route schedule and daily delivery as a claim pending operational confirmation.
- **Phone / WhatsApp contact supplied:** **0796 110 826** (`+254796110826` international format; verify WhatsApp activation before launch).
- **Delivery charge:** The words “at a few” may mean “at a fee.” Do not display a fee or free-delivery promise until clarified.

**Suggested tagline options:**

1. **Your mama mboga, now online.** *(Recommended; confirm founder's preference.)*
2. Fresh groceries, made simple.
3. Good food starts here.

**Primary audiences:**
- Busy Nairobi households ordering fruits and vegetables.
- Offices that need regular fruit baskets, fresh produce or pantry supplies.
- Hotels and hospitality kitchens ordering produce, potentially in larger quantities.
- Younger social-media customers who discover produce through TikTok and Instagram.
- Health-conscious customers interested in fresh, organic and unusual produce.
- Repeat buyers who want a reliable, quick way to order their usual basket.

**Primary business goal:** Convert social-media attention into completed orders, with repeat purchase as a major secondary goal.

**Success metrics:** Visitors from social profiles, product views, add-to-cart rate, checkout/order-start rate, fulfilled orders, repeat purchase rate, average basket value and abandoned carts.

---

## 2. Creative direction

The brand should feel **fresh, joyful, approachable, trustworthy and proudly Kenyan** — not clinical, overly luxurious or like a generic supermarket template.

### Proposed design palette

| Use | Colour | Hex |
| --- | --- | --- |
| Primary / headings / key buttons | Deep leafy green | `#234D32` |
| Background | Warm cream | `#F5F2E9` |
| Accent / promotions | Mango gold | `#E6A846` |
| Soft highlight | Light sage | `#DCE9D7` |
| Cards / contrast | White | `#FFFFFF` |
| Main text | Rich charcoal | `#243029` |

These are **concept colours**, not verified existing brand colours.

### Typography
- **Headings:** DM Sans, Plus Jakarta Sans or Sora — bold, modern, warm.
- **Body:** Inter or DM Sans — highly legible on phones.
- Use restrained type sizes, generous spacing, rounded corners and clear price hierarchy.

### Photography
- Prioritise **real Muskat product photos**, Mary at work, market/farm scenes, packing orders and customer deliveries (with permission).
- Use richly coloured close-ups of fresh produce against warm neutral backgrounds.
- Avoid misleading stock photos that imply Muskat sells products it does not offer.
- Use short founder/social videos where properly licensed and technically supported.

### UX personality
- Mobile-first, fast and low-friction.
- Clear, friendly Kenyan English; occasional natural Swahili phrases are welcome.
- Shopping should take fewer steps than sending a long DM asking what is available.
- All product prices in **KES**, with clear unit labels: `/kg`, `/bunch`, `/piece`, `/pack`.

---

## 3. Recommended sitemap

```text
/
├── /shop
│   ├── /shop?category=fruits
│   ├── /shop?category=vegetables
│   ├── /shop?category=exotic-produce
│   └── /product/[slug]
├── /bundles
├── /our-story
├── /delivery-for-businesses   [hotels and offices]
├── /how-it-works
├── /delivery-and-faq
├── /contact
├── /cart
├── /checkout                [Phase 2 or Phase 1 if payment is ready]
└── /privacy-policy /terms-and-conditions /returns-policy
```

**Launch recommendation:** Prioritise Home, Shop, Product, Cart, Our Story, How It Works, Contact, Delivery/FAQ and a light **Hotel & Office Deliveries** section. Add Bundles when confirmed offerings exist.

---

## 4. Homepage layout (in order)

### A. Announcement strip
A short, editable banner for promotions, e.g. `Fresh fruits & vegetables delivered to your door` or `Home • Office • Hotel Deliveries`.

**Schedule option, pending confirmation:** `Regular delivery days: Monday • Wednesday • Saturday`. Do not pair this with `Everyday delivery` as an unconditional guarantee until Muskat clarifies which days apply to which customers or locations.

**Do not claim free delivery, same-day delivery or discounts until confirmed.**

### B. Navigation
- Logo: **Muskat Groceries**
- Links: Shop | Hotel & Office Deliveries | Our Story | How It Works
- Icons: Search, Cart
- Primary CTA: **Shop Fresh Produce**
- Mobile: compact menu, persistent cart count, no clutter.

### C. Hero section

**Eyebrow:** FRESH • ORGANIC • EXOTIC PRODUCE

# Farm-fresh goodness, delivered to you.

**Subheading:** Shop fresh, organic and exotic fruits and vegetables for your home, office or hotel. Order easily and let Muskat take care of the delivery details.

**Primary button:** `Shop Groceries`  
**Secondary button:** `Order on WhatsApp`

**Trust strip:** `Home deliveries • Office deliveries • Hotel deliveries`

**Contact:** `Call or WhatsApp: 0796 110 826`

**Visual:** Gorgeous, authentic produce photography, ideally featuring Muskat's own produce, packing process or founder.

Optional supporting line: `Fresh fruits • Vegetables • Exotic finds`.

**Delivery schedule copy:** Show `Monday • Wednesday • Saturday` only after confirming this is an active service schedule. If delivery is available every day, specify whether any cutoff times or route restrictions apply.

### D. Shop by category
Three striking photographic category cards:
1. **Fresh Fruits** — Everyday favourites and seasonal picks.
2. **Fresh Vegetables** — The greens and essentials for your kitchen.
3. **Exotic Finds** — Something different for your next fruit bowl.

Categories are proposed. Confirm actual inventory before populating them.

### E. Popular right now
A horizontally browsable or responsive grid of **4–8 products** drawn dynamically from the catalogue.

Each card should show:
- Real product photograph.
- Product name.
- Price **and unit**.
- Availability status.
- Quantity control.
- `Add to Cart` action.

Never display invented prices or pretend unavailable products are in stock.

### F. The Muskat promise
Three simple reasons to shop, written as brand commitments to approve:

- **Fresh picks** — Produce selected with care.
- **Simple shopping** — Build your basket in minutes.
- **A real person behind the brand** — A business built by Mary and her community.

Avoid promises such as “100% organic”, “straight from farm” or “delivery in 30 minutes” without evidence.

### G. Founder story feature

**Eyebrow:** THE STORY BEHIND THE BASKET

## Meet Mary — the mama mboga who went digital.

**Copy:** Muskat Groceries started with a simple determination: make a grocery business work, even when the traditional route wasn't working. Founder Mary Muthoni took her business online, built a community through TikTok, and kept finding new ways to serve her customers.

**Button:** `Read Our Story`

**Visual:** Real portrait of Mary, ideally at her store or with produce. Obtain permission before publishing.

### H. Delivery for your home, office or hotel
Three clear panels explaining the same service to different buyers:
- **Home deliveries** — Fresh fruits and vegetables for everyday cooking and family meals.
- **Office deliveries** — Produce or fruit selections for workplaces; support scheduled or repeat enquiries.
- **Hotel deliveries** — Fresh produce supply enquiries for hospitality kitchens, with requested quantities and preferred delivery times.

**CTA:** `Request a Delivery Quote` or `Chat on WhatsApp`. Do not promise bulk discounts, credit terms or guaranteed everyday deliveries until approved.

### I. How it works
1. **Explore** fresh produce and choose what you need.
2. **Build your basket** and check quantities and prices.
3. **Place your order** through the enabled checkout method.
4. **Get your groceries** according to confirmed delivery or pickup arrangements.

### J. From TikTok to your kitchen
- Embed selected Muskat TikTok/Instagram videos once the **official handles and embedding permission** are confirmed.
- Content ideas: new arrivals, produce tips, packing orders, the founder answering questions.
- CTA: `Follow Muskat`.

### K. Reviews / community
Show customer testimonials **only with permission and with authentic wording**. If none are ready, use a community/social section instead of fabricated stars or testimonials.

### L. FAQ + footer
Top questions: delivery areas, **which days deliveries operate**, delivery charges, **hotel/office order process**, payment options, order cutoff, stock substitutions, cancellations and storage tips.

Footer: **Call/WhatsApp 0796 110 826** (business-supplied), verified social profiles, confirmed business hours and delivery schedule, delivery/returns policies, privacy policy and copyright.

---

## 5. Shop and product catalogue

### Catalogue essentials
- Categories and product search.
- Filters: category, price, availability and product type where relevant.
- Sort: Popular, Price Low–High, Price High–Low, New Arrivals.
- Product cards with clear units and thumbnails.
- Product detail page with image gallery, short description, unit/size variants, accurate price, stock status and quantity selector.
- Cart updates without page reload.
- Friendly empty, loading and out-of-stock states.
- Responsive layout: two-column product grid on small mobile where legible, more columns on larger screens.

### Example product *data shape*, not actual Muskat inventory

```json
{
  "id": "sample-fruit-001",
  "name": "Example Fruit",
  "slug": "example-fruit",
  "category": "fruits",
  "description": "Illustrative product entry; replace with real catalogue data.",
  "price_kes": null,
  "unit": "kg",
  "in_stock": false,
  "image_url": null,
  "featured": false
}
```

### Bundles (optional)
Once Muskat confirms real bundle offerings, support curated baskets such as:
- Weekly Kitchen Basket
- Fruit Bowl Selection
- Greens & Veggie Basket

For each bundle, show included items, substitutions policy, price and availability.

---

## 6. Checkout strategy

### Phase 1 — Quick launch: WhatsApp-assisted checkout
Ideal if Muskat currently handles orders directly and payment infrastructure is not yet ready.

1. Customer selects items and quantities on the website.
2. Cart shows an itemised total in KES **excluding delivery until calculated/confirmed**.
3. Customer enters or selects a delivery area and provides necessary details with consent.
4. Clicking **Send Order via WhatsApp** opens a **prefilled, readable order summary** addressed to Muskat's **verified business number**.
5. Muskat confirms stock, substitutions, delivery fee, final total and payment arrangements.
6. Website clearly states **“Order request — not confirmed until Muskat responds.”**

**Suggested WhatsApp order message:**

```text
Hi Muskat! I'd like to place an order:

- [Product] — [Quantity] x KES [Unit Price]
- [Product] — [Quantity] x KES [Unit Price]

Items subtotal: KES [Subtotal]
Delivery area: [Area]
Delivery type: [Home / Office / Hotel]
Preferred delivery date: [Date]

Please confirm availability, delivery fee and final total. Thanks!
```

**WhatsApp configuration:** The business supplied `0796110826`. Use `https://wa.me/254796110826` as the intended WhatsApp ordering destination **after testing that this number is enabled for WhatsApp**. The website should use the phone number in contact sections even if WhatsApp has not yet been verified.

### Phase 2 — Full online checkout
- Order placement with order ID, order status and confirmation message.
- M-Pesa STK Push through a vetted Kenyan payment provider or PSP.
- Server-verified payment webhooks; never trust a client-side payment result.
- Delivery fee calculation by confirmed zone and order rules.
- Payment success/failure handling and retry flow.
- Order status: `Pending`, `Awaiting Payment`, `Paid`, `Preparing`, `Dispatched`, `Delivered`, `Cancelled`.
- Optional customer account, order history and **Reorder Basket**.

**Avoid holding card data or M-Pesa credentials in the browser.**

---

## 7. Admin and operational requirements

Create a protected business dashboard so Muskat's team can:

- Add, edit, hide and feature products.
- Upload and crop images.
- Set units, prices, availability and stock status.
- Update featured collections and hero announcements.
- Review orders and update fulfilment status (full checkout phase).
- Manage delivery zones, fees, delivery weekdays, cutoffs and exceptions (when established).
- Distinguish **home**, **office** and **hotel** orders; optionally allow business buyers to request recurring or larger-quantity deliveries.
- Export orders to CSV (where customer data processing permits).
- View basic sales and conversion reporting (where tracked).

Use role-based access for administrative actions, input validation and audit logs for price/order changes.

---

## 8. Story page: suggested copy

# A mama mboga with a bigger vision.

Muskat Groceries is a story of resilience, community and doing business differently.

Founder Mary Muthoni began with a local grocery stall and a problem many entrepreneurs know too well: good produce, but not enough customers. Rather than give up, she took her business to TikTok, used content to connect with people and grew Muskat into a digitally driven grocery business serving customers in Nairobi.

Mary calls herself a **“Mama Mboga, but digital.”** It captures what Muskat is about: the personal connection of a neighbourhood grocery seller, made more convenient through technology.

Her entrepreneurial journey has also been recognised by KEPSA, including the **Female Rising Star in Digital Innovation Award**, and took her to the **World Food Forum in Rome in October 2025**.

**Suggested CTA:** `Shop With Us` or `See What's Fresh`

> This story is based on the KEPSA profile. Obtain Mary's review and approval before publishing as official company copy.

---

## 9. Example interface microcopy

| Location | Copy |
| --- | --- |
| Search placeholder | `Search fruits, greens, and more…` |
| Add-to-cart success | `Added to your basket!` |
| Empty cart | `Your basket is looking a little empty.` |
| Empty cart CTA | `Explore fresh picks` |
| Out of stock | `Not available right now` |
| Order CTA (Phase 1) | `Send Order via WhatsApp` |
| Delivery fee pending | `Delivery fee confirmed before your order is final` |
| Checkout helper | `We'll confirm availability and the final total.` |
| Home/office/hotel section | `Fresh produce, wherever you need it.` |
| Contact CTA | `Call or WhatsApp 0796 110 826` |
| Delivery date note | `Delivery dates confirmed when we receive your order.` |
| Newsletter title (optional) | `Good things are growing.` |
| 404 page | `Looks like this one wandered off the market.` |

---

## 10. Technical implementation recommendation

This stack is a **suggestion**, not a requirement:

- **Frontend:** Next.js + TypeScript, Tailwind CSS.
- **UI:** Accessible reusable components (e.g. shadcn/ui) with custom visual design.
- **Backend/data:** Supabase/PostgreSQL or another managed database with secure access rules.
- **Images:** Optimised image storage and responsive delivery.
- **Authentication:** Protected admin-only sign-in; guest checkout for buyers.
- **Payments:** Phase 1 WhatsApp; Phase 2 secure Kenyan M-Pesa provider integration.
- **Hosting:** Vercel or a comparable deployment service.
- **Analytics:** Privacy-aware site analytics; only measure what is necessary.

### Suggested core entities

```text
Product
Category
ProductVariant
ProductImage
Cart / CartItem
Customer (optional for guest checkout)
Order / OrderItem
DeliveryZone
DeliverySchedule / DeliveryCutoff
OrderCustomerType (home, office, hotel)
BusinessDeliveryEnquiry (optional)
PaymentTransaction (Phase 2)
Promotion (optional)
AdminUser
```

### Quality requirements
- Responsive from 320px mobile screens through desktop.
- Fast first load, compressed images and minimal heavy animation.
- Keyboard-accessible navigation and functional focus states.
- WCAG-aware contrast and form labels.
- Clear error, loading and empty states.
- Product pricing calculated server-side in full checkout.
- SEO-ready metadata, product structured data where appropriate, sitemap and human-readable URLs.
- Secure form validation, rate limiting and spam protection.
- Privacy policy and data minimisation aligned with applicable Kenyan data protection obligations.
- Analytics and cookie consent where applicable.

---

## 11. Launch phases

### MVP — publish the storefront
- [ ] Final brand logo, colours and product photography approved.
- [ ] Homepage and all essential content pages complete.
- [ ] Working product catalogue, filters/search and cart.
- [ ] Phone displayed consistently as **0796 110 826**; test WhatsApp at `+254796110826` before activating order links.
- [ ] Home, office and hotel delivery services clearly presented.
- [ ] Delivery days reconciled: Monday/Wednesday/Saturday versus everyday; hours, fees and coverage approved.
- [ ] WhatsApp order handoff to the tested business number.
- [ ] Delivery/FAQ and policies reviewed.
- [ ] Social links and contact details verified.
- [ ] SEO essentials, mobile QA and analytics implemented.

### Next iteration — reduce manual work
- [ ] Full M-Pesa checkout and payment confirmation.
- [ ] Dynamic delivery zones and charges.
- [ ] Admin order management and fulfilment updates.
- [ ] Reorder previous basket and saved favourites.
- [ ] Authentic customer reviews and social/video integrations.
- [ ] Optional bundles and seasonal campaigns.

---

## 12. Information to confirm with Muskat before build or launch

1. Logo, existing brand palette and preferred tagline.
2. Confirm **0796 110 826** supports WhatsApp; obtain verified TikTok/Instagram handles.
3. Actual inventory, categories, products, units, photos and current prices.
4. **Resolve the delivery-day contradiction:** Is Monday/Wednesday/Saturday the standard delivery schedule while daily delivery applies to selected customers/areas, or has the business moved to everyday service? Confirm areas, delivery fee (“at a few” may mean “at a fee”), minimum order, cutoff times, hours and pickup options.
5. Accepted payment methods and whether M-Pesa integration is desired on day one.
6. Policy for substitutions, cancellations, refunds and unavailable produce.
7. Business/legal name, support contact, operating hours and privacy-policy owner.
8. Mary Muthoni's approval of her biography, portrait and award mentions.
9. How hotel and office deliveries should work: request a quote versus standard cart; bulk order sizes; recurring delivery; payment terms.
10. Whether customer accounts, subscriptions or nutrition content are needed.

---

## 13. Build prompt for an AI coding assistant

> Build an elegant, production-minded, mobile-first e-commerce website for **Muskat Groceries**, a Nairobi-based grocery business with a warm, digital-first “mama mboga” identity. Follow the site map, design palette, homepage structure, product data requirements and copy in this document. Use Next.js, TypeScript and Tailwind CSS unless another stack is explicitly requested. Create reusable components, realistic layouts, accessibility states and fast page loading. Include Home, Shop, Product Detail, Cart, Our Story, How It Works, Delivery/FAQ, Contact and a Hotel & Office Deliveries page. Implement catalogue filtering, quantity controls and a functional cart. The business supplied phone number **0796110826** (international **+254796110826**). Display this number in the header/footer/contact sections and prepare WhatsApp order messages addressed to `254796110826`, with a clear launch checklist item to test WhatsApp on this number before enabling the link. Include the delivery type (home/office/hotel) in order requests. Seed only clearly labelled **sample data**, with no fictitious reviews, business claims or purported real prices. Do **not** hardcode an unverified everyday delivery promise: business text mentions both Monday/Wednesday/Saturday and every day; keep schedule messaging configurable and mark it pending confirmation. Keep payments disabled until production credentials and delivery policies are confirmed. Make the design distinctive, trustworthy, visual and ready for genuine Muskat content.

---

## Research sources (used for background only)

- [KEPSA Kenya Business Channel Q1 2026 — profile of Mary Muthoni, Muskat Groceries](https://fliphtml5.com/oyjuiu/kenya-Business-Channel-Q1-2026/kenya_Business_Channel_Q1_2026/)
- [KEPSA SMEHub newsletter, May 2026](https://www.linkedin.com/pulse/april-newsletter-kenya-private-sector-alliance-keps-pixjf)
- [FindGlocal Nairobi greengrocers directory — MuskatGroceries listing](https://www.findglocal.com/KE/Nairobi/1477002-20/genre/128157407253652/Greengrocers/3)

**Editorial note:** The founder's achievements are source-backed, but should still be confirmed with Muskat before publication on its official site. Everything else marked as proposed is a design, product or copy recommendation.
