# Rough Quotation & End-to-End Execution Proposal
## Custom Gold Jewellery E-Commerce Platform, Studio Catalog Onboarding & Digital Marketing Launch

| Document Field | Details |
| :--- | :--- |
| **Prepared For** | `[Client Brand Name]` (`[Client Authorized Signatory / Director]`) |
| **Prepared By** | `[Your Agency Name]` |
| **Proposal Reference** | `[PROP-GOLD-2026-001]` |
| **Prepared Date** | `[Prepared Date]` |
| **Quotation Validity** | 30 Calendar Days from Prepared Date *(Rough budgetary quotation subject to final discovery sign-off)* |
| **Delivery Timeline** | **75 Calendar Days** to Production Go-Live + **30 Days** Live Month-1 Marketing & Warranty |
| **Target Market & Currency** | Pan-India Retail & Regional Multi-Branch Operations · **INR (`₹`)** |
| **Total Investment (Excl. GST)** | **₹14,00,000** *(Rupees Fourteen Lakhs Only)* |
| **Applicable GST (18%)** | **₹2,52,000** *(SAC 998313 / 998361)* |
| **Grand Total Payable (Incl. GST)** | **₹16,52,000** *(Rupees Sixteen Lakhs Fifty-Two Thousand Only)* |

---

## 1. Executive Summary

`[Client Brand Name]` is expanding from trusted showroom retail into an authoritative pan-India digital jewellery flagship. Fine gold and diamond e-commerce differs fundamentally from standard apparel or lifestyle retail: buyers scrutinize gram weights, karat purity (`24KT / 22KT / 18KT / 14KT`), transparent making charges, BIS HUID hallmarking, `3%` HSN 7113 GST, PAN compliance on orders `≥ ₹2,00,000`, and insured vault logistics before placing high-ticket orders online.

To eliminate guesswork before kickoff, our team has already built an interactive Next.js storefront prototype (**PIXTACY** in the project repository) demonstrating live karat-rate repricing, transparent PDP price breakup, multi-facet URL-synced catalog filtering, interactive Lookbook hotspots, and multi-city boutique pickup workflows.

### Why Custom Full-Stack Next.js Over Template SaaS Platforms
Rather than building on a generic SaaS storefront that charges `0.5%–2.0%` per-order platform fees or forces awkward third-party plugins for weight-based pricing, this engagement extends our production Next.js architecture with a dedicated **PostgreSQL backend**, **Custom Jewellery Admin CMS**, and **Server-Side Bullion Rate Engine**:

1. **Zero Per-Order SaaS Platform Commissions:** On high-ticket jewellery orders (`₹75,000` to `₹5,00,000+`), avoiding percentage-based SaaS platform surcharges saves substantial recurring margin from Day 1.
2. **Authoritative Server-Side Gold Pricing & Rate Lock:** Product prices dynamically follow `22KT` / `18KT` / `14KT` / `925 Silver` rates, while checkout enforces a **10–15 minute rate-lock window** so bullion fluctuations mid-payment never create billing disputes.
3. **Single-Window Launch Readiness:** Website engineering, flexible full-service SKU studio photography/copywriting, and performance marketing infrastructure execute concurrently over **75 days** under one dedicated Project Manager.

---

## 2. Detailed Scope of Work (75-Day Phase 1 Core Suite)

### Workstream 1: Gold Jewellery E-Commerce Website (End-to-End Engineering) — ₹9,50,000

#### 1.1 Discovery, Brand Customization & Storefront Productionization — ₹2,20,000
- Brand identity customization of the existing Next.js 15 / React 19 / Tailwind CSS 4 storefront architecture to match `[Client Brand Name]` typography, color palette, logo, boutique locations, and tone of voice.
- Production-grade **Homepage** (Hero editorial showcase, Category strip, Collection grid, Interactive *Shop the Look* hotspots, Occasion/Tier shelves, Bestsellers, Trust ribbon, Concierge appointment banner).
- **Multi-Facet Product Listing Page (PLP)** with URL-synced filters (Category, Collection/Tier, Purity, Metal Finish, Occasion, Price range, In-Stock/Dispatch status, and Sorting) plus responsive mobile filter drawer.
- **High-Trust Product Detail Page (PDP)** featuring multi-angle zoom gallery, purity/metal/ring-size/engraving selectors, **live Metal + Stone + Making Charge + `3%` GST Price Breakup**, BIS Hallmark / HUID / IGI / SGL certification badges, ring size guide, and live pincode delivery & nearest showroom pickup checker.
- Persistent **Slide-Over Bag Drawer**, **Wishlist Drawer**, **Boutique & Video Appointment Booking Modal**, and **Instant Search Overlay** backed by live database queries.

#### 1.2 Backend APIs, PostgreSQL Database & Live Gold-Rate Engine — ₹1,90,000
- Relational **PostgreSQL** schema & ORM covering collections, products, purity/finish variants, inventory/stock status, orders, cart sessions, customers, promo codes, gold rate snapshots, and boutique appointments.
- **Automated Live Gold & Silver Rate Sync Engine:** Scheduled sync with an approved Indian bullion rate feed (e.g., IBJA / Metalprice / Metals-API — vendor subscription billed at client actuals) plus **instant manual Admin Rate Override** capability (`₹0` extra API cost mode if client prefers daily showroom rate entry).
- **Dynamic Server-Side Price Recomputation & Checkout Rate Lock:** Every cart total and order line item is recalculated authoritatively on the server (`Metal Value = Weight × Purity Rate`, `Making Charges`, `Stone Value`, `3% GST`). Once checkout begins, a **10–15 minute Rate-Lock Token** freezes the gold rate until payment completion.
- Hardened REST / Server Action APIs with input validation, rate limiting, and atomic inventory locking to prevent overselling unique pieces.

#### 1.3 Custom Jewellery Admin CMS — ₹2,30,000
- Role-based Admin Portal (`Super Admin`, `Catalog Manager`, `Order & Compliance Ops`, `Showroom Staff`) with audit logs.
- **Jewellery SKU & Pricing Manager:** Manage gross/net gold weights (grams), stone weights/values, purity options (`24KT / 22KT / 18KT / 14KT / 925 Silver`), percentage or fixed making charges, diamond/stone specifications, BIS **HUID** & lab certificate metadata, and fixed-price demi-fine overrides.
- **Bulk CSV / Excel Importer & Exporter:** Template-driven bulk upload, validation reporting, and bulk making-charge / rate adjustments across categories or collections.
- **Order, Boutique Booking & Promo Operations:** End-to-end order lifecycle management (`Pending Verification → Confirmed → Hallmarking/QC → Dispatched → Delivered`), manual rate-override history, boutique/video appointment calendar, and promo/privilege rule builder (`%`, flat `₹`, bundle discounts).

#### 1.4 Payment Gateway, ≥ ₹2L PAN KYC Compliance, 3% GST Invoices & Logistics — ₹1,90,000
- **Razorpay / Cashfree Payment Integration:** Full support for UPI (with smart guidance when order totals exceed UPI's `₹1,00,000` per-transaction cap), Credit/Debit Cards, NetBanking, and high-value NEFT/RTGS/Virtual Account routing for `₹1L–₹10L+` bridal purchases, plus webhook signature verification and automated refund triggers.
- **Income Tax Rule 114B Compliance (`≥ ₹2,00,000` Orders):** Conditional checkout workflow enforcing PAN number capture, format validation, and encrypted PAN card document upload whenever cart value reaches or exceeds `₹2,00,000`, stored securely for compliance audit.
- **HSN 7113 `3%` GST Invoice Engine:** Automated, downloadable itemized GST tax invoice PDF per order showing gold weight, purity, rate/gram, stone charge, making charge, `3%` GST split (CGST/SGST or IGST based on delivery state), HUID/certificate reference, and client GSTIN.
- **Insured Jewellery Logistics & Salon Pickup:** Integration with insured jewellery courier API (e.g., **Sequel Logistics / BVC**) for pincode serviceability, AWB generation, insured transit tracking, and OTP handover—paired with **Complimentary Multi-City Showroom Pickup** reservation flows.

#### 1.5 Customer Portal, Transactional Alerts, Security, QA & 30-Day Warranty — ₹1,20,000
- **Customer Account Portal:** Passwordless Mobile OTP / Email login, saved addresses, order history, live shipment tracking, downloadable GST invoices & certificate dossiers, wishlist sync, and booked showroom appointments.
- **Transactional Notification Triggers:** Automated WhatsApp / SMS / Email alerts for OTP login, order confirmation, PAN verification status, dispatch AWB, pickup readiness, and boutique booking confirmation (messaging gateway credits at client actuals).
- **Security Hardening & Pre-Launch QA:** SSL/TLS enforcement, server-side price/auth checks, OWASP input sanitization, encrypted KYC document storage, cross-browser & mobile responsive QA, and production deployment with CI/CD & automated database backups.
- **Staff Training & 30-Day Warranty:** Live walkthrough training sessions for client catalog/ops staff, Admin CMS user SOP guide, and **30 calendar days of complimentary post-launch bug-fix warranty**.

---

### Workstream 2: Full-Service Creative & Catalog Onboarding (Flexible Baseline Allowance) — ₹1,20,000

Because `[Client Brand Name]`'s exact launch SKU count is being finalized during discovery, creative production is structured as a **capped baseline allowance with a transparent per-SKU rate card**—ensuring you never overpay for unused capacity or face surprise studio fees when scaling.

- **Included Baseline Allowance:** **100 Launch SKUs @ ₹1,200 / SKU = ₹1,20,000**
- **Per-SKU Deliverables Included:**
  1. **Macro Jewellery Studio Photography:** `3–4` high-resolution angles per SKU (hero front, clasp/profile detail, scale/texture macro, packaging/certificate view) on clean luxury backdrops.
  2. **High-End Jewellery Retouching:** Specular reflection cleanup, dust/scratch removal, accurate 22KT/18KT gold tone calibration, gemstone brilliance enhancement, and web-optimized WebP/PNG exports.
  3. **Conversion & SEO Jewellery Copywriting:** Luxury editorial product description, structured specifications (`weight`, `purity`, `stone specs`, `occasions`, `care instructions`), and SEO title/meta descriptions.
  4. **Admin CMS Upload & Data QA:** Complete entry and verification of weights, making charges, HUID/certification tags, images, and live pricing checks across all 100 baseline SKUs.

*(See **Section 7** for the Per-SKU Rate Card above 100 SKUs, reconciliation credit for fewer than 100 SKUs, and optional Bridal Model Lookbook shoots.)*

---

### Workstream 3: Digital Marketing (Core Performance & SEO Launch Stack) — ₹1,80,000

Designed so foundational search, tracking, and local trust are engineered during the 75-day build, while **Month-1 live ad management runs for a full 30 days starting from Production Go-Live**—ensuring zero wasted days before the site can accept real orders.

#### 3.1 Technical & E-Commerce SEO Foundation — ₹50,000
- Jewellery keyword architecture mapped to collections, categories, occasions, and regional search intent (`22KT temple choker`, `18KT daily wear rings`, `gold mangalsutra online`, etc.).
- Clean SSR/SSG metadata templates, canonical URL rules for multi-facet filter combinations (preventing duplicate indexation), XML sitemaps, `robots.txt`, and Core Web Vitals optimization.
- Rich **Structured Data (JSON-LD)** implementation (`Product`, `Offer`, `AggregateRating` when enabled, `LocalBusiness` for showrooms, `BreadcrumbList`, `FAQPage`).
- On-page SEO optimization for top category/collection landing pages and the baseline launch catalog.

#### 3.2 Local SEO & Showroom Google Business Profiles — ₹25,000
- Audit, verification support, and optimization for up to **4 physical showroom Google Business Profiles (GBPs)**.
- Standardized NAP (Name, Address, Phone) citations, showroom category taxonomy, service attributes (`BIS Hallmarked Gold`, `Bridal Jewellery`, `In-Store Pickup`), showroom photo curation, and UTM-tagged website/appointment links.

#### 3.3 Analytics & Server-Side Conversion Tracking — ₹40,000
- **Google Tag Manager (GTM)** + **GA4 Enhanced E-Commerce** funnel tracking (`view_item`, `add_to_cart`, `begin_checkout`, `add_payment_info`, `purchase`, `book_boutique_appointment`) using server-verified INR order values.
- **Meta Pixel + Meta Conversions API (CAPI)** server-side event deduplication for accurate attribution across iOS/ad-block browsers.
- **Google Merchant Center (GMC) & Meta Catalog Feed Setup:** Automated product feed integration pushing live repriced INR values, availability, and studio imagery for Google Shopping & Dynamic Product Ads.

#### 3.4 Google & Meta Launch Campaigns + Month-1 Live Management — ₹65,000
- Account structuring, audience research (high-intent bridal/festive, luxury buyers, geo-radius around showrooms, lookalike & retargeting segments), and conversion-focused ad copy.
- **12–15 Launch Ad Static Creatives / Carousels** designed from the studio SKU shoot for Meta & Google Display/Demand Gen.
- Campaign setup across **Google Search, Google Shopping / PMax, and Meta Conversions/Catalog Sales**.
- **30 Full Days of Active Post-Launch Optimization** (bid/ROAS tuning, negative keyword pruning, creative rotation, weekly performance reporting to client & Manager).
- *Note: Paid ad media spend is billed directly by Google/Meta to `[Client Brand Name]`'s ad accounts at actuals.*

---

### Workstream 4: Dedicated Project Management, Client Liaison & Governance — ₹1,50,000

- **Single Point of Contact (SPOC):** Dedicated Project Manager serving as `[Client Brand Name]`'s direct interface throughout the 75-day engagement, translating business/showroom nuances into clear engineering and marketing sprint tickets.
- **Sprint Cadence & Transparency:** Weekly stakeholder status demos on staging URLs, milestone sign-off tracking, and WhatsApp/Slack/Email coordination channel.
- **Cross-Vendor Orchestration:** Scheduling and QA supervision across the **2 Full-Stack Developers**, **Jewellery Studio Shoot Vendor**, and **Performance/SEO Marketing Specialists**—including Merchant KYC (Razorpay/Sequel) follow-through and UAT sign-off governance.

---

## 3. Delivery Team & Governance Structure

| Role | Allocation | Core Responsibilities |
| :--- | :--- | :--- |
| **Dedicated Project / Account Manager** | Full 75-Day Engagement | Client interface, requirement gathering, sprint translation, weekly demos, shoot & marketing vendor coordination, UAT & go-live governance. |
| **Senior Full-Stack Lead Developer** | Full 75-Day Engagement | System architecture, PostgreSQL schema, live bullion rate-sync & checkout rate-lock engine, Razorpay/Cashfree, PAN KYC, 3% GST invoice engine, security & production DevOps. |
| **Full-Stack Storefront & CMS Developer** | Full 75-Day Engagement | Rebranded Next.js storefront productionization, Admin CMS UI, bulk CSV tooling, Sequel courier/salon pickup UX, customer account portal, GTM/GA4/CAPI event hooks. |
| **Jewellery Creative & Studio Specialist** *(Contracted)* | Phased (Days 15–55) | Macro studio lighting & photography, gold/stone color-accurate retouching, luxury SEO product copywriting, catalog upload QA. |
| **Performance Marketer & SEO Specialist** *(Contracted)* | Setup (Days 35–75) + Month-1 Live | Technical & local SEO, GBP optimization, GA4/CAPI/Merchant Center setup, ad creatives, launch & 30-day optimization of Google/Meta campaigns. |

---

## 4. 75-Day Phased Execution Roadmap

> **Important Timeline Note:** Website & pre-launch marketing readiness completes on **Day 75 (Production Go-Live)**. **Month-1 Live Ad Campaign Management** runs for **30 full calendar days starting from Go-Live** so 100% of ad spend and optimization operates on the live, order-ready site.

| Phase & Window | Key Activities & Deliverables | Client Gate / Sign-Off |
| :--- | :--- | :--- |
| **Phase 1: Discovery, Brand & Infrastructure**<br>*(Days 1–15)* | Finalize brand guidelines, SKU count & making-charge rules; initiate Razorpay/Cashfree, Sequel Logistics, Bullion API & WhatsApp API KYC; lock DB schema; schedule studio jewellery handover; audit GBPs & SEO keyword map. | Brand sign-off, KYC submission, Pilot SKU batch handover |
| **Phase 2: Core Backend, CMS & Studio Shoot**<br>*(Days 16–45)* | Build PostgreSQL DB, live bullion rate sync + rate-lock engine, Custom Jewellery Admin CMS, bulk CSV tools, and customer accounts; execute 100-SKU macro studio photography, retouching & copywriting; configure GMC/GTM/CAPI scaffolding. | **Milestone 2 Gate:** Admin CMS & backend API demo + studio image/copy style approval |
| **Phase 3: Storefront Productionization, Integrations & Pre-Launch Marketing**<br>*(Days 46–62)* | Wire production Next.js storefront to live PostgreSQL APIs; complete Razorpay, `≥ ₹2L` PAN KYC, `3%` GST PDF invoices & Sequel courier/salon pickup; upload full baseline catalog; implement JSON-LD SEO schema, pixel/CAPI verification & launch ad creatives. | **Milestone 3 Gate:** Full staging UAT sign-off with real test transactions & verified catalog |
| **Phase 4: Hardening, Training & Production Go-Live**<br>*(Days 63–75)* | Security & load hardening, cross-device QA, live domain cutover, SSL/backup verification, showroom & ops staff CMS training, GBP/SEO launch checks, and Go-Live activation of Google & Meta campaigns. | **Milestone 4 Gate:** Production Go-Live + 30-Day Warranty & Month-1 Live Ads Start |

---

## 5. Commercial Investment Summary

All prices below are in Indian Rupees (`₹`), exclusive of `18%` GST unless stated otherwise.

| Line Item | Scope Summary | Investment (Excl. GST) |
| :--- | :--- | ---: |
| **1. Gold Jewellery E-Commerce Website** | **End-to-end Next.js + PostgreSQL + Custom CMS Engineering** | **₹9,50,000** |
| 1.1 | Discovery, Brand Customization & Storefront Productionization | ₹2,20,000 |
| 1.2 | Backend APIs, PostgreSQL DB & Live Gold-Rate + Rate-Lock Engine | ₹1,90,000 |
| 1.3 | Custom Jewellery Admin CMS (SKUs, Weights, Purity, HUID, Orders, CSV) | ₹2,30,000 |
| 1.4 | Razorpay/Cashfree, ≥ ₹2L PAN KYC, 3% GST Invoices & Sequel/Salon Pickup | ₹1,90,000 |
| 1.5 | Customer Portal, Alerts, Security, QA, Deployment & 30-Day Warranty | ₹1,20,000 |
| **2. Full-Service Creative & Catalog Onboarding** | **Flexible Baseline Allowance: 100 Launch SKUs @ ₹1,200/SKU** *(Macro Shoot, Retouching, Copywriting, Upload & QA)* | **₹1,20,000** |
| **3. Digital Marketing Launch Stack** | **Core Performance & SEO Setup + Month-1 Live Management** | **₹1,80,000** |
| 3.1 | Technical & E-Commerce SEO, Schema Markup & On-Page Optimization | ₹50,000 |
| 3.2 | Local SEO & Google Business Profiles (Up to 4 Showrooms) | ₹25,000 |
| 3.3 | GA4 E-Commerce, GTM, Meta Pixel + CAPI & Merchant Center Feed | ₹40,000 |
| 3.4 | Google Search/Shopping & Meta Ads Setup, Creatives & 30-Day Management | ₹65,000 |
| **4. Dedicated Project Management & Governance** | **75-Day Client Liaison, Sprint Management & Cross-Vendor Oversight** | **₹1,50,000** |
| | **PROJECT SUBTOTAL (EXCL. GST)** | **₹14,00,000** |
| | **GST @ 18%** *(SAC 998313 / 998361)* | **₹2,52,000** |
| | **GRAND TOTAL PAYABLE (INCL. 18% GST)** | **₹16,52,000** |

---

## 6. Payment Milestone Schedule (30% / 30% / 25% / 15%)

| Milestone | Trigger / Target Day | Share | Amount (Excl. GST) | GST (18%) | Total Payable (Incl. GST) |
| :--- | :--- | :---: | ---: | ---: | ---: |
| **Milestone 1** | Project Kickoff & Discovery Initiation *(Day 1)* | **30%** | ₹4,20,000 | ₹75,600 | **₹4,95,600** |
| **Milestone 2** | Core Backend, Live Rate Engine, Admin CMS Demo & Studio Style Approval *(Day 45)* | **30%** | ₹4,20,000 | ₹75,600 | **₹4,95,600** |
| **Milestone 3** | Full Storefront Staging UAT, Baseline Catalog Loaded & SEO/Tracking Ready *(Day 62)* | **25%** | ₹3,50,000 | ₹63,000 | **₹4,13,000** |
| **Milestone 4** | Production Go-Live, Staff Training & Month-1 Campaign Activation *(Day 75)* | **15%** | ₹2,10,000 | ₹37,800 | **₹2,47,800** |
| **Total** | | **100%** | **₹14,00,000** | **₹2,52,000** | **₹16,52,000** |

*Invoices are payable within **7 calendar days** of milestone completion to preserve the 75-day critical path.*

---

## 7. Flexible Creative Per-SKU Rate Card & Shoot Add-Ons

Workstream 2 includes a **capped baseline allowance of ₹1,20,000 (100 SKUs @ ₹1,200/SKU)**. Final creative billing reconciles strictly to actual processed SKUs:

| Creative Tier / Add-On | Unit Rate (Excl. GST) | Scope & Terms |
| :--- | :---: | :--- |
| **Baseline Launch Allowance (1–100 SKUs)** | **₹1,200 / SKU** | Included in base quote (`₹1,20,000`). If launch catalog is `< 100` SKUs, unused allowance is credited or carried forward to post-launch arrivals. |
| **Scale Tier A (101–250 SKUs)** | **₹1,100 / SKU** | Volume-discounted rate for 3–4 angle macro shoot, retouching, SEO copy, and CMS upload. |
| **Scale Tier B (251+ SKUs)** | **₹950 / SKU** | High-volume catalog rate; delivery schedule above 150 SKUs can be phased across post-launch batches without delaying Day-75 Go-Live. |
| **CMS Upload Only (Client-Supplied Studio Photos)** | **₹250 / SKU** | Image optimization, basic crop/color check, copy formatting, and CMS upload when `[Client Brand Name]` supplies ready photos. |
| **Optional Half-Day Bridal / Editorial Model Shoot** | **₹75,000** | Studio/set, jewellery styling, 1 model, hair & makeup, 15–20 retouched campaign/lookbook hero images *(ideal for homepage banners & Meta ads)*. |
| **Optional Full-Day Bridal / Editorial Model Shoot** | **₹1,35,000** | Full-day production, 2 wardrobe/theme looks, 35–40 retouched hero lookbook shots + raw short clips for ads/Lookbook hotspots. |

---

## 8. Optional Post-Launch Retainers & Phase 2 Add-On Menu

### A. Optional Ongoing Monthly Retainers *(Commencing Month 2+, Excl. GST)*

| Retainer Plan | Monthly Fee | Included Deliverables |
| :--- | :---: | :--- |
| **Website Tech AMC & SLA Support** *(Starts post 30-day free warranty)* | **₹35,000 / month** | 24×7 uptime & error monitoring, dependency & security patches, Razorpay/Sequel/Bullion API maintenance, daily DB backup verification, and up to **15 dev hours/month** for minor UI/feature enhancements. |
| **Performance Ads & SEO Growth Retainer** *(Starts Month 2 after included Month-1)* | **₹65,000 / month** | Ongoing Google Search/Shopping/PMax & Meta campaign management, A/B creative refresh, monthly SEO content/category expansion, CRO insights, and bi-weekly ROAS reporting *(ad spend at actuals)*. |

### B. Optional Modular Digital Marketing Add-Ons *(Excl. GST)*

| Module | Pricing | Scope |
| :--- | :---: | :--- |
| **Social Media Management & Reels** | **₹45,000 / month** | Instagram & Facebook calendar management, `12–16` luxury feed/carousel posts + `4–6` short-form reels/month. |
| **WhatsApp Business API & Email Retention Automation** | **₹35,000 setup + ₹15,000 / month** | Automated abandoned cart recovery, live gold-rate alert broadcasts, festive VIP drops, and post-purchase care sequences *(BSP messaging credits at actuals)*. |
| **Offline-to-Online Showroom Footfall & VIP Reactivation** | **₹25,000 / campaign** | Geo-fenced hyperlocal ads around showroom pincodes + segmented WhatsApp/SMS reactivation for past showroom buyers. |
| **Influencer & Bridal Creator Campaign Management** | **₹30,000 / campaign** | Creator shortlisting, briefing, deliverables tracking, and tracking-link attribution *(creator fees at actuals)*. |

### C. Priced Phase 2 Jewellery Software Add-On Menu *(Post Day-75, Excl. GST)*

To guarantee a rock-solid, risk-free launch in **75 days**, the specialized modules below are intentionally scoped out of Phase 1 and offered as pre-priced Phase 2 sprints:

| Phase 2 Module | Est. Investment | Est. Timeline | Key Capabilities |
| :--- | :---: | :---: | :--- |
| **Old Gold Exchange / Buyback Estimator** | **₹1,20,000** | 2–3 Weeks | Interactive purity/weight estimator, showroom drop-off or insured pickup scheduling, and store-credit voucher issuance. |
| **Monthly Gold Saving Scheme (11+1 SIP Portal)** | **₹2,20,000** | 4–5 Weeks | Customer enrollment, e-Mandate / UPI AutoPay recurring installments, digital passbook, bonus tracking, and online/showroom redemption. |
| **Showroom ERP / POS 2-Way Sync** | **₹2,00,000 – ₹3,50,000** | 4–6 Weeks | Automated inventory & invoice sync with Tally / Marg / Ornate / Acme *(final price/timeline subject to ERP vendor API documentation)*. |
| **Live Video Shopping & WhatsApp Concierge CRM** | **₹1,50,000** | 3 Weeks | Dedicated live-assisted video consultation flow, instant in-call SKU sharing, and showroom sales-executive assignment. |
| **AR Virtual Try-On Integration** | **₹1,60,000** | 3–4 Weeks | Camera try-on integration for necklaces/earrings/rings via leading AR jewellery SDK *(third-party AR SDK license at client actuals)*. |

---

## 9. Indicative Third-Party Pass-Through Running Costs

All third-party infrastructure, API, payment gateway, logistics, and ad media accounts are owned directly by `[Client Brand Name]` and billed at **vendor actuals** (zero agency markup).

> **Verification Notice:** The INR figures below are **indicative market estimates** for budgeting purposes only; exact tariffs depend on selected plan tiers, order volumes, insured parcel values, and live vendor rate cards at the time of onboarding. Verify exact pricing on official vendor order forms.

| Service Category | Recommended Providers | Indicative Monthly / Per-Unit Cost | Billing Model |
| :--- | :--- | :--- | :--- |
| **Domain Name (`.in` / `.com`)** | Cloudflare / GoDaddy / Namecheap | `~₹1,000 – ₹1,800 / year` | Direct to Client |
| **Cloud Hosting, PostgreSQL DB & Media CDN** | Vercel Pro + Managed PostgreSQL (Neon/Supabase/AWS RDS) + Cloudinary/R2 | `~₹6,000 – ₹15,000 / month` | Direct to Client |
| **Live Gold & Silver Rate Feed API** | Approved Bullion API *(or `₹0` using built-in Daily Admin Override)* | `₹0` (Manual) or `~₹2,500 – ₹8,000 / month` | Direct to Client |
| **Payment Gateway MDR** | Razorpay / Cashfree | `~0%` UPI (standard consumer rails, subject to RBI/NPCI rules) · `~1.8% – 2.2%` Cards/NetBanking *(verify high-ticket jewellery slab)* | Deducted per transaction |
| **Insured Jewellery Logistics** | Sequel Logistics / BVC Logistics | `~₹450 – ₹1,500+ / shipment` depending on route, weight & declared insurance value | Direct to Client |
| **Transactional WhatsApp & SMS/Email** | Interakt / Gupshup / MSG91 / Resend | `~₹1,500 – ₹5,000 / month` *(utility templates + OTPs)* | Direct to Client |
| **Paid Advertising Media Spend** | Google Ads & Meta Ads | Recommended launch budget: `₹1,00,000 – ₹3,00,000 / month` *(client-controlled)* | Direct to Google / Meta |

---

## 10. Assumptions, Client Dependencies & Commercial Terms

1. **Client Dependencies & 48-Hour Approval SLA:** To hold the 75-day timeline, `[Client Brand Name]` will designate an authorized decision-maker for design, pricing rule, and UAT sign-offs within **48 business hours** of submission. Delays in sign-off or jewellery handover shift subsequent dates proportionally.
2. **Merchant KYC Initiation (Week 1 Mandatory):** Payment gateway (Razorpay/Cashfree), insured courier (Sequel/BVC), and WhatsApp Business API onboarding require `[Client Brand Name]`'s GSTIN, PAN, cancelled cheque, and BIS/jewellery trade KYC. These applications must be initiated in **Week 1** to avoid delaying Phase 3 integration testing.
3. **Jewellery Handover & Transit Insurance During Studio Shoot:** Physical pieces provided for studio macro photography remain under `[Client Brand Name]`'s jeweller block/transit insurance and are returned upon image sign-off per signed handover manifest.
4. **30-Day Complimentary Bug-Fix Warranty:** Covers functional defects in implemented Phase 1 code against agreed specifications for 30 calendar days post-Go-Live. New feature additions, design changes, or third-party API breakages post-launch are handled via Change Request or Tech AMC.
5. **Source Code & IP Ownership:** Upon settlement of Milestone 4, `[Client Brand Name]` receives full ownership of the custom application codebase, PostgreSQL schema, and all commissioned creative assets created under this engagement.
6. **Change-Request (CR) Governance:** Any requirement outside the Phase 1 Core Suite (e.g., Phase 2 ERP integration, extra storefront workflows) will be estimated separately with time/cost impact before execution.
7. **Rough Quotation Nature:** This document is a budgetary rough quotation designed for commercial alignment. Final fixed-price Statement of Work (SOW) locks after the Week-1 Discovery & Catalog Audit workshop.

---

### Proposal Acceptance (For Alignment / SOW Trigger)

| For `[Client Brand Name]` | For `[Your Agency Name]` |
| :--- | :--- |
| Name: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | Name: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
| Designation: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | Designation: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
| Signature & Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | Signature & Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
