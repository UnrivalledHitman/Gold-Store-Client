# Initial Commercial Quotation & 90-Day Execution Proposal
## Gold-Plated Jewellery Digital Transformation, Custom E-Commerce Storefront & Omnichannel Growth

| Document Field | Details |
| :--- | :--- |
| **Prepared For** | `[Client Brand Name]` (`[Client Authorized Signatory / Director]`) |
| **Prepared By** | `[Your Agency Name]` |
| **Proposal Reference** | `[PROP-PLATED-2026-001]` |
| **Prepared Date** | `[Prepared Date]` |
| **Quotation Validity** | 30 Calendar Days from Prepared Date *(Initial budgetary quotation subject to Week-1 Discovery & Catalog Sign-Off)* |
| **Program Timeline** | **60 Calendar Days** to Production Go-Live + **30 Days** Live Launch Marketing & Complimentary Bug Warranty (**90-Day Program**) |
| **Target Market & Currency** | Pan-India D2C & Omnichannel Retail · **INR (`₹`)** |
| **Core Tech Package (Module A)** | **₹6,60,000** Excl. GST (**₹7,78,800** Incl. 18% GST) |
| **Full 90-Day Modular Package (Modules A–E)** | **₹11,50,000** Excl. GST (**₹13,57,000** Incl. 18% GST) |

---

## 1. Executive Summary

`[Client Brand Name]` is transitioning an established traditional **gold-plated jewellery** business into a scalable, high-trust digital brand with unified online and showroom sales. Unlike solid-bullion retail, high-converting gold-plated and demi-fine jewellery e-commerce wins on **sub-second mobile speed for Instagram/Meta traffic, honest material and plating transparency, curated bridal/festive bundles to lift Average Order Value (AOV), seamless WhatsApp video consultations, and tight Cash-on-Delivery (COD) Return-to-Origin (RTO) control**.

Rather than adapting a generic template store, our team has already built an interactive Next.js storefront prototype in our workspace demonstrating luxury editorial merchandising, multi-facet catalog filtering, interactive *Shop the Look* hotspots, automatic bundle savings, and omnichannel showroom/WhatsApp flows.

### Why Custom Next.js + Supabase Beats Generic Template Platforms for Gold-Plated Jewellery
1. **Faster Mobile Landing Pages = Higher Ad ROAS:** Gold-plated jewellery traffic comes predominantly from Instagram Reels and Meta Ads on mid-range mobile devices. Our **Next.js (App Router) + Tailwind CSS** storefront deployed on **Vercel** delivers near-instant page transitions and Core Web Vitals performance without bloated third-party theme scripts.
2. **Zero Recurring USD App Bloat:** On typical plated-jewellery order values (`₹1,200 – ₹3,500`), template SaaS platforms quickly accumulate recurring monthly USD subscriptions for paid Indian apps (bundles, COD verification, swatch selectors, Shiprocket sync, WhatsApp recovery, custom filters). Custom Next.js + **Supabase** eliminates recurring app commissions and puts every conversion lever natively in your codebase.
3. **Conversion Built Around Plated Jewellery Realities:** Native support for variant sizing (e.g., bangle sizes `2.4 / 2.6 / 2.8`, necklace length, matte/antique finish), fixed MRP vs. offer pricing, *"Complete the Look"* cross-sells, prepaid incentives vs. COD verification, and 1-click **"Request Real-Light Video on WhatsApp"** for bridal sets.
4. **Full Code & Data Ownership:** Upon final milestone settlement, `[Client Brand Name]` owns 100% of the custom application codebase, PostgreSQL database schema, and creative assets.

---

## 2. Modular Scope of Work (90-Day Transformation)

To keep commercial alignment flexible, the engagement is structured into **one required Core Technical Module (Module A)** and **four optional modular blocks (Modules B–E)** that can be toggled on or off depending on what `[Client Brand Name]` handles in-house versus through our agency.

### Module A (Core — Required): E-Commerce Storefront, Custom `/admin` CMS, Integrations & Technical SEO — ₹6,60,000

#### A1. Discovery, Brand Adaptation & Conversion Storefront UI — ₹1,80,000
- Brand styling adaptation of our **Next.js 15 / React 19 / TypeScript / Tailwind CSS** storefront to match `[Client Brand Name]`'s palette, typography, logo, and showroom identity.
- **Editorial Homepage:** Hero showcase, Category strip, Collection grid (Bridal Sets, Daily Wear, Traditional/Regional, Minimalist), Interactive *Shop the Look* hotspots, Occasion shelves, Bestsellers, Trust & Plating Care ribbon, and Showroom/Video Concierge banner.
- **Multi-Facet Product Listing Page (PLP):** URL-synced filters (Category, Collection, Base Metal, Plating/Finish, Occasion, Price range, In-Stock status, Sorting) + responsive mobile filter drawer.
- **High-Trust Product Detail Page (PDP):** Multi-angle zoom gallery + 10-second wear-test video player, variant selectors (bangle/ring sizes, finish), **fixed MRP + Offer Price + Savings badge**, honest **Base Metal, Micron/1-Gram Plating Spec, Weight feel & Anti-Tarnish Care Instructions**, Pincode delivery & COD availability checker, *Complete the Look* cross-sells, and a pre-filled **"Request Real-Light Video on WhatsApp"** CTA for high-intent buyers.
- **Conversion Drawers:** Persistent slide-over Shopping Bag (with free-shipping progress bar & automatic bundle discount preview), Wishlist Drawer, Instant Search Overlay, and Showroom/Video Appointment Booking Modal.

#### A2. Backend Database, Checkout, Razorpay + COD & Shiprocket Integration — ₹2,00,000
- **Managed Supabase PostgreSQL Backend:** Clean 7-table schema (`collections`, `products`, `product_variants`, `orders`, `order_items`, `coupons`, `enquiries`) with strict Row Level Security (RLS) and an atomic `decrement_variant_stock` SQL function to prevent overselling limited pieces.
- **Frictionless Checkout & Guest Order Tracking:** Fast **Guest Checkout** (optimized for mobile Meta Ad buyers) plus **optional Customer Accounts** (order history & saved details) and a public **`/track-order`** lookup (Order ID + Phone).
- **Authoritative Server-Side Pricing & Promos:** Cart totals, multi-buy bundle discounts (*Buy 2 Save 10% / Buy 3 Save 15%*), coupon codes, free-shipping thresholds, and **prepaid incentives / optional COD handling fee** are validated exclusively on the server before payment creation.
- **Razorpay + COD RTO Protection:** Full **Razorpay** integration (UPI, Cards, NetBanking, Wallets) with server-side `HMAC-SHA256` webhook verification, paired with **Cash on Delivery (COD)** flagged for WhatsApp/call verification before dispatch.
- **Shiprocket Logistics & Transactional Emails:** Real-time Shiprocket pincode/COD serviceability check, 1-click order push for automated **AWB generation, shipping labels, and Shiprocket GST tax invoices**, plus printable HTML order receipts and automated **Resend** confirmation/dispatch emails.

#### A3. Custom `/admin` Operations Portal & Catalog Engine — ₹1,55,000
- Protected **Next.js `/admin` Portal** authenticated via Supabase Auth so showroom and operations staff manage the entire store from one dashboard.
- **Product, Variant & Stock Manager:** Create/edit products, upload optimized imagery/videos, manage per-variant SKUs and stock counts (`Size 2.4 / 2.6 / 2.8`, finish variants), and toggle active/featured flags.
- **Bulk CSV Importer & Exporter:** Template-driven bulk upload and stock-count sync so physical counter sales can be updated at end-of-day in under 5 minutes without requiring live ERP integration in Phase 1.
- **Order, COD Verification & Dispatch Desk:** Filter orders by status (`New → Confirmed → Packed → Shipped → Delivered / RTO / Cancelled`), toggle **`COD Verified`**, and trigger **1-click Push to Shiprocket** with live AWB tracking links.
- **WhatsApp / Bridal Enquiries Inbox & KPI Strip:** Centralized inbox of PDP WhatsApp video requests and custom bridal enquiries alongside 4 live operational KPI cards (Orders, Revenue, Pending COD Verification, Low-Stock Alerts).

#### A4. Technical SEO, Server Tracking, WhatsApp/CRM Webhooks, QA & Full-Time Month-3 CRO/Warranty — ₹1,25,000
- **Technical & E-Commerce SEO:** Server-rendered `generateMetadata`, canonical URLs for multi-facet filter combinations (preventing duplicate indexation), dynamic `/sitemap.xml`, `robots.txt`, and Core Web Vitals optimization.
- **Structured Data & Product Feeds:** Rich **JSON-LD** (`Product`, `Offer`, `BreadcrumbList`, `LocalBusiness`) and a live **`/api/feed/gmc.xml`** feed feeding Google Merchant Center and Meta Catalog Dynamic Product Ads.
- **5-Pillar SEO Hub Scaffolding:** Built-in **`/guides/[slug]`** MDX editorial system ready to host gold-plated jewellery buying and care guides without needing a separate CMS.
- **Analytics & Server-Side Attribution:** **Google Tag Manager (GTM)** + **GA4 Enhanced E-Commerce** funnel tracking, **Meta Pixel + Server-Side Meta Conversions API (CAPI)** deduplication, and **Microsoft Clarity** heatmaps/session recordings.
- **WhatsApp BSP & Zoho CRM Webhooks:** API integration with **Interakt / Wati** for automated COD confirmation prompts and Shiprocket dispatch alerts, plus real-time lead/order webhook sync to **Zoho CRM** (or Google Sheets fallback).
- **Production Deployment, Staff Training & Full-Time Month-3 Support:** Months 1–2 deliver the 60-day Production Go-Live (Vercel cutover, SSL/domain routing, `₹10` live prepaid + COD end-to-end test orders, staff training + SOP guide). Month 3 (Days 61–90) includes **full-time dedicated engineering support** for post-launch CRO tweaks, Batch-2 SKU onboarding, and our **30-day complimentary bug-fix warranty**.

---

### Module B (Optional): Brand Identity, Packaging & Care Collateral — ₹75,000
*(Toggle off if `[Client Brand Name]` already has a finalized logo, color system, and packaging design.)*
- Brand audit, positioning refinement, primary & monogram logo suite (vector SVG/AI), luxury colour palette & typography guidelines.
- Social media creative templates (Reels cover frames, carousel templates, product spotlight cards).
- **Anti-Tarnish Packaging & Care Card Design:** Branded jewellery box/pouch print layout plus an **in-box Care & Authenticity Card** featuring plating care tips and a QR code linking to Google Reviews & a repeat-purchase coupon.

---

### Module C (Optional): Studio Photo, 10-Second Wear Video & Catalog Onboarding — ₹1,00,000
*(Baseline allowance: **100 Launch SKUs @ ₹1,000 / SKU**. Reconciled strictly to actual processed SKUs.)*
- **Per-SKU Deliverables Included:**
  1. **Studio & Scale Photography (3–4 frames/SKU):** Clean front hero, clasp/finish macro detail, and natural-light hand/neck wear shot showing realistic scale and gold tone.
  2. **10-Second Wear-Test Video Clip:** Short vertical/square clip usable on both the PDP gallery and Instagram Reels.
  3. **Retouching & Web Optimization:** Dust/scratch cleanup, accurate gold-tone calibration, and crisp WebP compression.
  4. **SEO Copywriting & `/admin` Upload QA:** Honest material/plating description, variant/stock entry, and live storefront verification across all 100 baseline SKUs.

*(See **Section 7** for volume tier discounts above 100 SKUs, client-supplied photo upload rates, and optional bridal model shoots.)*

---

### Module D (Optional): 5-Pillar SEO Content, Looker Studio Dashboard & Month-1 Live Ads — ₹1,35,000

#### D1. 5-Pillar Jewellery SEO Content & Local Google Business Profile — ₹40,000
- Keyword research & search-intent mapping across product, occasion, and regional terms (e.g., *1-gram gold-plated jewellery, traditional Bengali plated bridal sets, lightweight travel wedding jewellery, anti-tarnish care*).
- Copywriting & publishing of **5 comprehensive SEO Pillar Guides** inside `/guides/[slug]` linking directly to commercial collections.
- Optimization of up to **2 physical showroom Google Business Profiles (GBPs)** with standardized NAP citations, product categories, and UTM-tagged appointment links.

#### D2. Launch Creatives, Looker Studio Dashboard & Month-1 Live Ad Management (Days 61–90) — ₹95,000
- **12 Static/Carousel Launch Ad Creatives + 6 Edited Product Reels** produced from the Batch-1 shoot assets.
- Setup and **30 full days of active post-launch optimization (Days 61–90)** across **Google Search, Google Shopping / PMax, and Meta Catalog & Conversion Campaigns**—running strictly **after** the store goes live on Day 60 so zero ad spend is wasted.
- **5-Section Central Management Dashboard (Google Looker Studio):** Unified view covering Project/Ops KPIs, Website Funnel, Ad Spend & ROAS, Orders/COD vs. Prepaid Split, and SEO Search Console metrics.
- *Note: Paid advertising media spend is billed directly by Google and Meta to `[Client Brand Name]`'s ad accounts at actuals.*

---

### Module E (Optional): Dedicated Full-Time 90-Day Project Management & Governance — ₹1,80,000
- Dedicated full-time Single Point of Contact (SPOC) across all 90 days managing weekly staging demos, Merchant KYC follow-through (Razorpay, Shiprocket, WhatsApp BSP), studio handover schedules, UAT sign-offs, live launch coordination, and post-launch sprint governance.

---

## 3. Recommended Technical Architecture

| Layer | Technology Stack | Purpose & Business Benefit |
| :--- | :--- | :--- |
| **Storefront Frontend** | **Next.js (App Router) + React + TypeScript + Tailwind CSS** | Sub-second mobile UX for Instagram/Meta buyers, native SSR/SSG SEO, zero theme bloat. |
| **Hosting & Edge CDN** | **Vercel** | Instant staging preview URLs, automatic HTTPS, global/India edge caching, on-demand revalidation. |
| **Database, Auth & Storage** | **Supabase (PostgreSQL + Auth + Storage)** | 7-table relational schema, RLS security, atomic stock deduction, private `/admin` auth, optimized media storage. |
| **Payments & COD Control** | **Razorpay + Cash on Delivery** | UPI, Cards, NetBanking + server-verified webhooks + COD verification flags & prepaid incentives. |
| **Logistics & GST Labels** | **Shiprocket** *(Alt: Delhivery)* | Automated pincode/COD check, courier selection, AWB generation, tracking webhooks & GST shipping labels. |
| **Transactional Email** | **Resend** | Reliable order confirmation, dispatch AWB, and enquiry notifications with high inbox deliverability. |
| **WhatsApp & CRM** | **WhatsApp Business API (Interakt / Wati) + Zoho CRM** | Automated COD confirmations, real-light bridal video enquiries, order updates, and lead capture. |
| **SEO, Analytics & BI** | **GA4 + GTM + Meta Pixel/CAPI + Clarity + GMC + Looker Studio** | Server-side conversion attribution, heatmaps, live Google Shopping feed, and executive reporting. |

---

## 4. 90-Day Phased Execution Roadmap

> **Clean Sequencing Guarantee:** Storefront engineering, Batch-1 photography, and tracking complete for **Production Go-Live on Day 60**. Paid advertising campaigns (Module D2) and the **30-day complimentary bug-fix warranty** then run concurrently across **Days 61–90** on the live, order-taking store.

| Phase & Window | Key Activities & Deliverables | Client Gate / Sign-Off |
| :--- | :--- | :--- |
| **Phase 1: Discovery, KYC & Architecture**<br>*(Days 1–14)* | Finalize brand direction, SKU CSV columns, COD/prepaid/return rules & sitemap; provision Domain, Vercel & Supabase; adapt Next.js prototype styling; **submit Razorpay, Shiprocket & WhatsApp BSP KYC by Day 5**. | Scope, SKU template & Week-1 KYC submitted |
| **Phase 2: Core Build & Batch-1 Shoot**<br>*(Days 15–35)* | Build 7-table Supabase DB + RLS + atomic stock RPC, fixed-price + bundle/coupon checkout, Razorpay + COD logic, `/admin` portal & CSV importer, rebranded storefront UI; execute Batch-1 100-SKU photo + 10s video shoot. | **Milestone 2 Gate (Day 35):** Staging Storefront, `/admin` & Checkout Sandbox Demo |
| **Phase 3: Catalog Load, Shiprocket, SEO & Tracking**<br>*(Days 36–52)* | Bulk-import & QA Batch-1 catalog (100 SKUs); integrate Shiprocket AWB/labels, Resend emails, WhatsApp/Zoho CRM webhooks; wire SSR metadata, JSON-LD, XML sitemap, `/api/feed/gmc.xml`, GA4/GTM/Meta CAPI/Clarity; publish 5-pillar SEO guides & Looker Studio dashboard. | **Milestone 3 Gate (Day 52):** Full Staging UAT with Real Catalog, Shiprocket & Tracking Verified |
| **Phase 4: Pre-Launch QA, Staff Training & Go-Live**<br>*(Days 53–60)* | Execute live small-ticket prepaid + COD end-to-end test orders, mobile Core Web Vitals tuning, SSL/backup check, and train showroom staff on `/admin`, 5-minute EOD stock sync, anti-tarnish packing & Shiprocket dispatch. | **Milestone 4 Gate (Day 60):** **Official Production Go-Live** |
| **Phase 5: Live Marketing, CRO & Warranty**<br>*(Days 61–90)* | **Launch Month-1 Google & Meta Ads**, Reels, and WhatsApp enquiry flows; monitor Clarity heatmaps, GA4 drop-offs, and COD RTO rates; push CRO refinements; batch-upload Batch-2 SKUs; deliver Day-90 performance review & handover. | **Day-90 Closure:** 30-Day Live Performance Report & Transition to Month-4 Retainer / Days 91–180 Growth |

---

## 5. Commercial Investment Summary

All prices below are in Indian Rupees (`₹`), exclusive of `18%` GST (`SAC 998313 / 998361`).

| Module | Scope Summary | Status | Investment (Excl. GST) |
| :--- | :--- | :---: | ---: |
| **Module A (Core)** | **E-Commerce Storefront, Backend, `/admin` CMS, Payments/COD, Shiprocket & Tech SEO** | **Required** | **₹6,60,000** |
| `A1` | Discovery, Brand Adaptation & Conversion Storefront UI | Included | ₹1,80,000 |
| `A2` | Supabase DB, Guest + Optional Accounts, Razorpay + COD & Shiprocket API | Included | ₹2,00,000 |
| `A3` | Custom `/admin` Operations Portal, Bulk CSV Import & Dispatch Desk | Included | ₹1,55,000 |
| `A4` | Technical SEO, GMC Feed, GA4/Meta CAPI, WhatsApp/CRM Hooks, QA & Full-Time Month-3 CRO/Warranty | Included | ₹1,25,000 |
| **Module B** | **Brand Identity, Packaging & Anti-Tarnish Care Card Collateral** | Optional | **₹75,000** |
| **Module C** | **100-SKU Studio Photography, 10s Wear Videos, Copywriting & Upload QA** | Optional | **₹1,00,000** |
| **Module D** | **5-Pillar SEO Guides, GBP, Looker Studio & Month-1 Live Ads (Days 61–90)** | Optional | **₹1,35,000** |
| `D1` | Keyword Strategy, 5 Plated-Jewellery SEO Guides & Up to 2 Showrooms GBP | Included | ₹40,000 |
| `D2` | 12 Ad Creatives, 6 Reels, Google/Meta Ads Setup, Looker Dashboard & 30-Day Mgmt | Included | ₹95,000 |
| **Module E** | **Dedicated Full-Time 90-Day Project Management & Governance** | Optional | **₹1,80,000** |

### Package Totals Comparison

| Package Configuration | Subtotal (Excl. GST) | GST @ 18% | Grand Total (Incl. GST) |
| :--- | ---: | ---: | ---: |
| **Core Tech Package Only (Module A)** | **₹6,60,000** | ₹1,18,800 | **₹7,78,800** |
| **Core Tech + Full-Time 90-Day PM (Modules A + E)** | **₹8,40,000** | ₹1,51,200 | **₹9,91,200** |
| **Full 90-Day Modular Transformation (Modules A + B + C + D + E)** | **₹11,50,000** | ₹2,07,000 | **₹13,57,000** |

---

## 6. Payment Milestone Schedule (30% / 30% / 25% / 15%)

### Option 1: Full 90-Day Modular Package (₹11,50,000 Excl. GST)

| Milestone | Trigger / Target Day | Share | Amount (Excl. GST) | GST (18%) | Total Payable (Incl. GST) |
| :--- | :--- | :---: | ---: | ---: | ---: |
| **Milestone 1** | Project Kickoff & Day-5 Merchant KYC Initiation *(Day 1)* | **30%** | ₹3,45,000 | ₹62,100 | **₹4,07,100** |
| **Milestone 2** | Staging Storefront, `/admin` Portal & Checkout Sandbox Demo *(Day 35)* | **30%** | ₹3,45,000 | ₹62,100 | **₹4,07,100** |
| **Milestone 3** | Batch-1 Catalog Loaded, Shiprocket & SEO/Tracking UAT *(Day 52)* | **25%** | ₹2,87,500 | ₹51,750 | **₹3,39,250** |
| **Milestone 4** | Production Go-Live, Staff Training & Month-1 Ads Start *(Day 60)* | **15%** | ₹1,72,500 | ₹31,050 | **₹2,03,550** |
| **Total** | | **100%** | **₹11,50,000** | **₹2,07,000** | **₹13,57,000** |

### Option 2: Core Tech Package Only — Module A (₹6,60,000 Excl. GST)

| Milestone | Trigger / Target Day | Share | Amount (Excl. GST) | GST (18%) | Total Payable (Incl. GST) |
| :--- | :--- | :---: | ---: | ---: | ---: |
| **Milestone 1** | Kickoff & Architecture Lock *(Day 1)* | **30%** | ₹1,98,000 | ₹35,640 | **₹2,33,640** |
| **Milestone 2** | Staging Storefront, `/admin` & Checkout Sandbox *(Day 35)* | **30%** | ₹1,98,000 | ₹35,640 | **₹2,33,640** |
| **Milestone 3** | Catalog Import, Shiprocket & Tracking UAT *(Day 52)* | **25%** | ₹1,65,000 | ₹29,700 | **₹1,94,700** |
| **Milestone 4** | Production Go-Live & Staff Handover *(Day 60)* | **15%** | ₹99,000 | ₹17,820 | **₹1,16,820** |
| **Total** | | **100%** | **₹6,60,000** | **₹1,18,800** | **₹7,78,800** |

*Invoices are payable within **7 calendar days** of milestone completion to preserve the 60-day launch schedule.*

---

## 7. Flexible Creative Per-SKU Rate Card (Module C)

| Creative Tier / Add-On | Unit Rate (Excl. GST) | Scope & Terms |
| :--- | :---: | :--- |
| **Baseline Launch Allowance (1–100 SKUs)** | **₹1,000 / SKU** | Included in Module C (`₹1,00,000`). Unused allowance below 100 SKUs is credited or carried forward to Batch-2 festive arrivals. |
| **Scale Tier A (101–250 SKUs)** | **₹850 / SKU** | Volume-discounted rate for studio + natural-light wear shots, 10s video clip, retouching, SEO copy & CMS upload. |
| **Scale Tier B (251+ SKUs)** | **₹750 / SKU** | High-volume catalog rate; SKUs above 120 are batch-loaded post Day-60 so inventory volume never delays launch. |
| **CMS Upload Only (Client-Supplied Studio Photos)** | **₹200 / SKU** | Image optimization, crop/tone check, copy formatting, and `/admin` upload when `[Client Brand Name]` supplies ready photos. |
| **Optional Half-Day Bridal / Festive Model Shoot** | **₹55,000** | Studio/set, styling, 1 model, hair & makeup, 15–20 retouched lookbook hero shots for homepage banners & Meta ads. |
| **Optional Full-Day Bridal / Festive Model Shoot** | **₹95,000** | Full-day production, 2 wardrobe themes, 35–40 retouched hero lookbook shots + raw short clips for Reels & *Shop the Look*. |

---

## 8. Post-Delivery Maintenance, Retainers & Phase 2 Roadmap

### A. Complimentary Post-Launch Warranty (Days 61–90)
Every build includes **30 calendar days of complimentary bug-fix warranty** starting from Day-60 Production Go-Live. This covers functional defects against agreed Phase 1 specifications (new features, redesigns, and catalog uploads fall outside warranty).

### B. Ongoing Monthly Tech Maintenance Plans *(Commencing Day 91 / Month 4+, Excl. GST)*

| Plan Tier | Monthly Fee | Included Deliverables & Monthly Dev Capacity |
| :--- | :---: | :--- |
| **Tier 1: Essential Tech AMC & Uptime** | **₹18,000 / month** | Uptime & Sentry error monitoring, Vercel/Next.js/Supabase security & dependency patches, Razorpay/Shiprocket/WhatsApp webhook monitoring, backup checks, and up to **5 dev hours/month** for minor UI/banner updates. |
| **Tier 2: Growth & Festive Support** *(Recommended)* | **₹30,000 / month** | Everything in Tier 1 **+ up to 12–15 dev hours/month** for seasonal/festive campaign landing pages (Durga Puja, Dhanteras, Wedding Season), new promo/bundle mechanics, CRO tweaks from Clarity/GA4 data, GMC feed checks & priority support. |
| **Tier 3: Tech AMC + Phase 2 Feature Sprint** | **₹50,000 / month** | Everything in Tier 2 **+ 25–30 dev hours/month** continuously shipping Phase 2 capabilities (OTP accounts, photo reviews, loyalty wallet, partial COD, ERP sync) without separate project quotes. |
| **Ad-Hoc Support (No Retainer)** | **₹2,000 / hour** | Billed per request with a **₹5,000 minimum** per task/ticket. |

### C. Optional Marketing & SEO Growth Retainer *(Days 91–180, Excl. GST)*
- **Performance Ads, Reels & SEO Growth Retainer:** **`₹45,000 – ₹65,000 / month`** covering ongoing Meta/Google Ads optimization, monthly SEO guides/category expansion, festive creative refreshes, and bi-weekly ROAS/RTO reporting *(paid media spend billed directly to client).*

### D. Pre-Scoped Phase 2 Feature Add-On Menu *(Post-Launch Sprints, Excl. GST)*

| Phase 2 Module | Est. Investment | Est. Timeline | Key Capabilities |
| :--- | :---: | :---: | :--- |
| **Verified Customer Photo & Video Reviews** | **₹45,000** | 1–2 Weeks | Post-delivery review requests via WhatsApp/email, moderated buyer photos on PDPs, and `AggregateRating` schema. |
| **Partial COD & Automated RTO Scoring** | **₹55,000** | 2 Weeks | Collect `₹149–₹299` token advance online on high-risk COD orders + automated pincode/order-history RTO risk flagging. |
| **Loyalty Points & Referral Wallet** | **₹85,000** | 2–3 Weeks | Store-credit cashback on prepaid orders, birthday/anniversary bonuses, and referral discount links. |
| **Wholesale / Boutique B2B Ordering Portal** | **₹1,10,000** | 3–4 Weeks | Tiered MOQ pricing, GSTIN B2B checkout, and bulk assortment re-ordering for resellers. |
| **Tally / Marg / Zoho Books 2-Way Sync** | **₹1,25,000 – ₹2,00,000** | 4–6 Weeks | Automated inventory & invoice sync with client billing/accounting software *(subject to vendor API specs)*. |

---

## 9. Client-Owned Deployment, Hosting & Third-Party Services

All production cloud, payment, logistics, and marketing accounts are registered directly in `[Client Brand Name]`'s name and GST billing with **zero agency markup**.

> **Pricing & FX Verification Notice:** USD vendor plans below reflect published standard tiers and are shown with an indicative `₹86 / $1` conversion for budgeting only. Verify exact live vendor tariffs, applicable taxes/FX fees, and Indian merchant rate cards on official order forms at onboarding.

| Service Category | Recommended Provider & Plan | Indicative Monthly / Annual Cost | Ownership & Billing |
| :--- | :--- | :--- | :--- |
| **Domain Name (`.in` / `.com`)** | Cloudflare Registrar / Namecheap / GoDaddy | `~₹1,000 – ₹1,800 / year` *(indicative)* | Client Direct |
| **Storefront Hosting & Edge CDN** | **Vercel Pro** *(1 Owner seat + unlimited free Viewer seats)* | `$20 / month` (`~₹1,720 / mo`) | Client Direct |
| **Database, Auth & Media Storage** | **Supabase Pro** *(includes `$10` compute credit, 8 GB DB, 100 GB storage, 250 GB egress, daily backups)* | `$25 / month` (`~₹2,150 / mo`) | Client Direct |
| **Product Media CDN** | Supabase Storage + Next.js `<Image>` *(within Pro quota)* or **Cloudinary Free** *(25 credits/mo)* | `₹0` baseline *(Cloudinary Plus is `$89/mo` annual / `$99/mo` monthly if ever needed)* | Client Direct |
| **Transactional Emails** | **Resend** *(Free: 3,000/mo, 100/day → Pro: 50,000/mo, no daily cap)* | `$0` launch → `$20 / month` (`~₹1,720 / mo`) at scale | Client Direct |
| **Error & Uptime Monitoring** | **Sentry** *(Developer Free: 5,000 errors/mo → optional Team plan)* | `$0` launch *(Team `$26 / mo` annual optional)* | Client Direct |
| **WhatsApp Business API (BSP)** | Interakt / Wati / Gupshup | `~₹1,500 – ₹3,500 / month` + Meta conversation fees *(indicative)* | Client Direct |
| **Analytics, Feeds & CRM** | GA4, GTM, Search Console, Merchant Center, Clarity, Looker Studio (`₹0`) + Zoho CRM / HubSpot Starter | `₹0 – ₹1,500 / user / month` *(indicative)* | Client Direct |
| **Payment Gateway & Logistics** | **Razorpay** (UPI/Cards/NetBanking) + **Shiprocket** (Prepaid & COD) | Per-order MDR & courier weight-slab charges *(verify live merchant slab)* | Deducted / Billed per order |
| **Estimated Fixed Monthly SaaS Baseline** | *(Excl. per-order Razorpay/Shiprocket charges & ad media spend)* | **`~₹5,500 – ₹9,500 / month`** | **Client Direct** |

---

## 10. Compliance, Assumptions & Commercial Terms

1. **Product & Legal Compliance (India):** `[Client Brand Name]` will confirm applicable GST/HSN classification (imitation/gold-plated vs. 925 silver base), Legal Metrology packaged-commodity declarations (MRP, net quantity, country of origin, customer care), Consumer Protection (E-Commerce) Rules disclosures, and honest plating/care terminology with its CA and legal adviser before Go-Live.
2. **Week-1 Merchant KYC Initiation:** Razorpay/Cashfree, Shiprocket, and WhatsApp Business API onboarding require `[Client Brand Name]`'s GSTIN, PAN, cancelled cheque, and business address proofs. Submitting these by **Day 5** prevents delays in Phase 3 live testing.
3. **48-Hour Approval SLA & Revision Cap:** Storefront UI includes **2 structured design revision rounds** prior to UI lock. `[Client Brand Name]` will designate one decision-maker to provide design, copy, and UAT sign-offs within **48 business hours**.
4. **Daily Inventory Hygiene:** Until Phase 2 ERP sync is added, showroom staff will run a 5-minute end-of-day stock check in `/admin` (or allocate a dedicated online stock buffer) to prevent counter-sold items from remaining orderable online.
5. **Source Code & IP Ownership:** Upon settlement of Milestone 4, `[Client Brand Name]` receives full ownership of the custom Next.js application repository, Supabase PostgreSQL schema, and commissioned creative assets.
6. **Change-Request (CR) Governance:** Requirements outside the selected modules (e.g., Phase 2 loyalty wallet, ERP sync, or custom wholesale flows) will be estimated transparently before execution.

---

### Proposal Acceptance (For SOW Initiation)

| For `[Client Brand Name]` | For `[Your Agency Name]` |
| :--- | :--- |
| Selected Package: `[ ] Full 90-Day (₹11,50,000)` · `[ ] Core Tech (₹6,60,000)` | Name: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
| Name: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | Designation: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
| Designation: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | Signature & Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
| Signature & Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | |
