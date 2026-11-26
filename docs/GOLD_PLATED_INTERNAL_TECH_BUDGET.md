# CONFIDENTIAL — INTERNAL PROPOSAL FOR MANAGER
## Gold-Plated Jewellery E-Commerce: Tech Stack, 2-Dev Split, AI/SaaS Tooling, Budget & Margin Model

> **STRICTLY INTERNAL — DO NOT SHARE WITH CLIENT.**

---

## 1. Executive Summary & Critical Corrections to Initial Roadmap Email

Updating our client context from **solid gold & diamond** to **gold-plated jewellery** removes heavy regulatory/bullion complexity while shifting what actually wins sales online (**mobile ad speed, honest plating care specs, bundle AOV, and COD RTO control**).

| Area | Manager's Initial Email (Solid Gold Template) | Updated Plan for Gold-Plated Jewellery |
| :--- | :--- | :--- |
| **Platform Choice** | Suggested **Shopify** first | **Custom Next.js 15 + Tailwind 4 + Vercel + Supabase** with our **2-dev team**. Zero Shopify learning curve, faster mobile landing pages for Meta Ads, zero recurring USD app bloat, and instant reuse of our existing prototype (`src/`). |
| **Pricing & Inventory** | Daily 22KT bullion rate engine + piece-level gram tracking | **Fixed MRP + Sale Price**, quantity + variant stock (`Size 2.4/2.6/2.8`, finish), multi-buy bundles & coupons. |
| **Hallmark / PAN Rules** | BIS 916/HUID & `≥ ₹2L` PAN KYC | **Removed.** Claiming BIS gold hallmarking on gold-plated jewellery is non-compliant. Replaced with honest base-metal, plating micron/1-gram specs & anti-tarnish care cards. |
| **Payments & Logistics** | Prepaid + Sequel/BVC vault logistics | **Razorpay (UPI/Cards/NetBanking) + COD** with prepaid incentive + WhatsApp COD verification; **Shiprocket / Delhivery** (now the ideal fit!). |
| **Launch Sequencing** | Paid ads starting Day 56 before Payment Test (Day 74) & Launch (Day 81) | **Fixed:** Storefront Go-Live on **Day 60**; Month-1 Paid Ads + 30-day warranty run **Days 61–90** on a live, checkout-ready store. |
| **Commercial Structure** | Unpriced 8-workstream wish list | **Modular Client Quote (3.0 FTE Dedicated):** **₹6,60,000** Core Tech (`Module A`) or **₹11,50,000** Full 90-Day Package (`Modules A–E`, Excl. GST). |

---

## 2. Unified TypeScript Architecture & 2-Developer Ownership Split

Keeping both developers inside one **TypeScript + Next.js + Supabase + Vercel** repository eliminates separate backend deployments, duplicate models, and cross-stack handoff friction.

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                    VERCEL (Next.js 15 App Router + Edge CDN)            │
│                                                                         │
│  [Dev 1: Frontend & SEO Lead]        [Dev 2: Backend, /admin & APIs]    │
│  ├─ Branded Storefront UI            ├─ /api/checkout/create-order      │
│  ├─ PLP Multi-Facet Filters          ├─ /api/webhooks/razorpay (HMAC)   │
│  ├─ PDP (Variants, Video, Bundles)   ├─ /api/shipping/pincode & awb     │
│  ├─ Bag, Wishlist, /track-order      ├─ /api/admin/* (CSV, CRUD, COD)   │
│  ├─ /admin UI Components             ├─ /api/enquiries (WhatsApp/Zoho)  │
│  └─ SSR Metadata, JSON-LD, GA4/Pixel └─ /api/feed/gmc.xml & CAPI        │
└──────────────────────────────────┬──────────────────────────────────────┘
                                   │
          ┌────────────────────────┼────────────────────────┐
          ▼                        ▼                        ▼
┌───────────────────┐   ┌────────────────────┐   ┌────────────────────────┐
│  SUPABASE CLOUD   │   │  COMMERCE & LOGS   │   │   OMNICHANNEL & BI     │
│ ├─ Postgres (7 Tbl)│  │ ├─ Razorpay + COD  │   │ ├─ Interakt/Wati (WA)  │
│ ├─ RLS + Stock RPC│   │ ├─ Shiprocket API  │   │ ├─ Zoho CRM Webhooks   │
│ ├─ Auth (/admin)  │   │ ├─ Resend (Emails) │   │ └─ GA4/CAPI/Clarity    │
│ └─ Media Storage  │   │ └─ Sentry (Errors) │   └────────────────────────┘
└───────────────────┘   └────────────────────┘
```

### Core Supabase Schema (7 Tables + 1 Atomic RPC)
1. `collections` — `id, slug, name, subtitle, description, banner_url, sort_order`
2. `products` — `id, slug, sku_prefix, name, description, collection_id, category, base_metal, plating_spec, finish, weight_approx_g, mrp_inr, sale_price_inr, care_instructions, images (jsonb), video_url, is_featured, is_active`
3. `product_variants` — `id, product_id, sku, label, stock_qty, price_override_inr`
4. `orders` — `id, order_number, customer_name, phone, email, address_json, payment_method, payment_status, cod_verified, order_status, subtotal_inr, discount_inr, shipping_fee_inr, cod_fee_inr, total_inr, razorpay_order_id, razorpay_payment_id, shiprocket_order_id, awb_code, tracking_url, created_at`
5. `order_items` — `id, order_id, product_id, variant_id, sku, product_name, variant_label, unit_price_inr, qty`
6. `coupons` — `id, code, type, value, min_cart_inr, max_discount_inr, is_active, expires_at`
7. `enquiries` — `id, type, product_id, customer_name, phone, message, status, created_at`
8. **RPC `decrement_variant_stock(p_variant_id, p_qty)`** — atomic `UPDATE ... WHERE stock_qty >= p_qty` preventing concurrent overselling.

### Five Non-Negotiable Production Security Guardrails
1. **Server-Side Price Authority:** `POST /api/checkout/create-order` always reads prices, bundle tiers, coupons, and COD/shipping fees from Supabase—never trusting browser totals.
2. **Webhook Signature Verification:** `POST /api/webhooks/razorpay` validates `x-razorpay-signature` (`HMAC-SHA256`) before marking orders `paid` or decrementing stock.
3. **Strict Supabase RLS:** Anonymous keys can only `SELECT` active catalog rows; all order, coupon, enquiry, and `/admin` writes use `SUPABASE_SERVICE_ROLE_KEY` exclusively on the server.
4. **Atomic Stock Deduction:** Executed via Postgres RPC on confirmed payment/COD confirmation.
5. **Secret Isolation:** `RAZORPAY_KEY_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`, `SHIPROCKET_API_TOKEN`, `META_CAPI_TOKEN`, and `RESEND_API_KEY` live strictly in Vercel server env vars (never `NEXT_PUBLIC_*`).

---

## 3. Developer Supporting Services: AI Tools, Software Subscriptions & Staging (Internal Overhead)

These tools equip our **2 developers** to ship faster and maintain quality. They are treated as **internal agency overhead** (never itemized raw to the client).

> **Verification Notice:** USD software prices reflect published monthly/annual vendor rates converted at an indicative `₹86 / $1` exchange rate. Confirm exact invoice billing & GST/FX markup on company cards.

### A. 3-Month Build Period Tooling & Staging Budget

| Tool / Service | Plan & Seat Allocation | Monthly USD | Indicative INR / Mo | 3-Month Build Total | Purpose |
| :--- | :--- | :---: | ---: | ---: | :--- |
| **AI Coding Assistants** *(2 Dev Seats)* | **Cursor Premium** (`$30/user/mo × 2`) *(Lean alt: GitHub Copilot Pro `$10/user/mo` or Cursor Plus `$8/user/mo`)* | `$60.00` | ₹5,160 | **₹15,480** | Parallel UI, API, SQL migration, test & refactor acceleration across both devs. |
| **UI Design & Handoff** | **Figma Professional** (`1 Full seat @ $20/mo` monthly, or `$16/mo` annual; unlimited free Viewer seats) | `$20.00` | ₹1,720 | **₹5,160** | Component tokens, mobile PDP/checkout screens & client visual sign-off. |
| **Agency Staging & Preview Hosting** | **Vercel Pro** (`1 Member seat @ $20/mo`; unlimited free Viewer preview links) | `$20.00` | ₹1,720 | **₹5,160** | Staging branch deployments, client review URLs & preview testing before client cutover. |
| **Error Tracking** | **Sentry Developer** (`$0/mo`, 5,000 errors/mo) | `$0.00` | ₹0 | **₹0** | Build/staging exception capture *(upgrade to Team `$26/mo` annual only if multi-project volume grows)*. |
| **Repo, API Test & PM** | **GitHub Free** + **Postman Free** + **ClickUp/Trello Free** | `$0.00` | ₹0 | **₹0** | Git PR workflows, Razorpay/Shiprocket API debugging & sprint tracking. |
| **Live Test & AI API Buffer** | Small-ticket Razorpay/Shiprocket live test parcels & miscellaneous token usage | — | — | **₹1,200** | End-to-end live checkout & AWB verification prior to Day-60 Go-Live. |
| **TOTAL 3-MONTH DEV TOOLING & STAGING** | | **`$100/mo`** | **₹8,600/mo** | **₹27,000** | **Absorbed in Internal Overhead** |

*Note: Production runtime accounts (**Client's Vercel Pro `$20/mo`, Supabase Pro `$25/mo`, Resend `$0–$20/mo`, WhatsApp BSP, Razorpay, Shiprocket**) are owned and paid directly by the client (`~₹5,500–₹9,500/mo` baseline).*

### B. Ongoing Monthly Internal Tooling Overhead (Month 4+ Maintenance)
- Once in monthly AMC maintenance across client retainers, active internal tooling (2 AI dev seats + agency Sentry/Figma/Vercel seat share) totals **`~₹8,600 – ₹10,800 / month`** across the agency's active retainer portfolio (amortized at **`~₹2,500 – ₹4,000 / month`** per retained client when supporting 2–3 accounts).

---

## 4. Bottom-Up Internal Cost Model & Margin Table (90-Day Program — 3.0 FTE Dedicated)

Modeled on **full-time dedication (`3.0` FTE-months across all 90 days)** for all three internal roles:
- **Dev 1 (Frontend Lead — You):** `₹75,000 / month` × `3.0` FTE-months = **₹2,25,000**
- **Dev 2 (Backend / CMS / Integrations):** `₹50,000 / month` × `3.0` FTE-months = **₹1,50,000**
- **Manager / PM Governance:** `₹60,000 / month` × `3.0` FTE-months = **₹1,80,000** *(included under Optional Module E in Full Package; Core Tech + Dedicated 3.0 FTE PM = `₹8,40,000` quote vs `₹6,00,000` cost → `28.6%` margin)*

| Cost Line Item | Full 90-Day Package (Modules A–E) | Core Tech Only (Module A) | Basis / Notes |
| :--- | ---: | ---: | :--- |
| **Dev 1 — Frontend & SEO Lead** | ₹2,25,000 | ₹2,25,000 | `₹75,000 × 3.0` FTE-months (full 90-day dedication) |
| **Dev 2 — Backend, `/admin` & APIs** | ₹1,50,000 | ₹1,50,000 | `₹50,000 × 3.0` FTE-months (full 90-day dedication) |
| **Manager / PM Oversight** | ₹1,80,000 | — | `₹60,000 × 3.0` FTE-months (Full Package Module E; add ₹1.80L if PM bundled with Core Tech) |
| **Internal Dev AI Tools, Figma & Staging** | ₹27,000 | ₹27,000 | 3-month AI seats, Figma Pro, Vercel staging & test buffer |
| **Optional Module B Vendor (Brand & Packaging)** | ₹45,000 | — | Contracted graphic/brand designer (Quoted at `₹75,000`) |
| **Optional Module C Vendor (100-SKU Photo/Video)** | ₹60,000 | — | Contracted studio shoot + retouch + copy @ `₹600/SKU` (Quoted at `₹1,00,000`) |
| **Optional Module D Vendor (SEO Guides + Month-1 Ads)** | ₹80,000 | — | Content writer + Performance marketer + creatives (Quoted at `₹1,35,000`) |
| **QA & Risk Contingency Buffer** | ₹33,000 | ₹18,000 | Rework, KYC follow-up & launch stabilization buffer |
| **TOTAL INTERNAL COST** | **₹8,00,000** | **₹4,20,000** | |
| **CLIENT QUOTE (EXCL. GST)** | **₹11,50,000** | **₹6,60,000** | |
| **NET GROSS PROFIT (INR)** | **₹3,50,000** | **₹2,40,000** | |
| **BLENDED GROSS MARGIN %** | **30.4%** | **36.4%** | Healthy ~30%+ agency margin on full 3.0 FTE dedication |

---

## 5. Negotiation Ladder, Scope Trades & Custom Payroll Formula

### A. Negotiation Ladder (Full 90-Day Package — Internal Cost ₹8,00,000)

| Commercial Tier | Client Price (Excl. GST) | Discount vs Anchor | Net Gross Profit | Blended Margin % | Approval Required |
| :--- | ---: | :---: | ---: | :---: | :--- |
| **Anchor Pitch Price** | **₹11,50,000** | `0%` | **₹3,50,000** | **30.4%** | Standard Proposal |
| **Target Closing Price** | **₹10,50,000** | `-8.7%` | **₹2,50,000** | **23.8%** | Manager / Account Lead |
| **Hard Walk-Away Floor** | **₹9,75,000** | `-15.2%` | **₹1,75,000** | **17.9%** | Leadership Approval Only |

> **Margin Rule:** Never discount below **₹9,75,000** without toggling off an optional module below.

### B. Clean Scope-Trade Playbook (Keep ~28%–36% Margin When Client Pushes Budget)

| Scope Trade Option | Price Cut | Cost Saved | New Client Price | New Cost | New Profit | Margin % |
| :--- | ---: | ---: | ---: | ---: | ---: | :---: |
| **Baseline Full Package (Modules A–E)** | `₹0` | `₹0` | **₹11,50,000** | ₹8,00,000 | **₹3,50,000** | **30.4%** |
| **Drop Module B** *(Client already has logo/brand)* | `-₹75,000` | `-₹45,000` | **₹10,75,000** | ₹7,55,000 | **₹3,20,000** | **29.8%** |
| **Drop Module C** *(Client shoots & uploads via CSV)* | `-₹1,00,000` | `-₹60,000` | **₹10,50,000** | ₹7,40,000 | **₹3,10,000** | **29.5%** |
| **Drop Module D2** *(Client runs own ads; keep SEO D1)* | `-₹95,000` | `-₹55,000` | **₹10,55,000** | ₹7,45,000 | **₹3,10,000** | **29.4%** |
| **Core Tech + Full-Time 90-Day PM (Modules A + E)** | `-₹3,10,000` | `-₹2,00,000` | **₹8,40,000** | ₹6,00,000 | **₹2,40,000** | **28.6%** |
| **Core Tech Only (Module A — 2 Devs × 3.0 FTE)** | `-₹4,90,000` | `-₹3,80,000` | **₹6,60,000** | ₹4,20,000 | **₹2,40,000** | **36.4%** |

### C. Manager's Custom Payroll Sensitivity Formula (3.0 FTE-Months for All)
Plug actual company monthly salaries into this formula before locking final client pricing:

```text
Full Internal Cost = (Dev1_Monthly + Dev2_Monthly + Manager_Monthly) × 3.0 + ₹2,45,000
```
*(Where `₹2,45,000` = Dev Tooling/Staging `₹27,000` + Contracted Vendors `₹1,85,000` + Contingency `₹33,000`.)*

| Payroll Tier | Monthly Salaries (`Dev1 / Dev2 / Mgr`) | 3.0 FTE Payroll | Total Internal Cost | Profit @ ₹11,50,000 Anchor | Margin % | Pricing Guidance |
| :--- | :---: | ---: | ---: | ---: | :---: | :--- |
| **Lean Team** | `₹55K / ₹40K / ₹45K` | ₹4,20,000 | **₹6,65,000** | **₹4,85,000** | **42.2%** | Strong room to close at ₹9.75L–₹10.5L |
| **Benchmark Model** | `₹75K / ₹50K / ₹60K` | ₹5,55,000 | **₹8,00,000** | **₹3,50,000** | **30.4%** | Recommended default anchor |
| **Mid-Senior Team** | `₹1,00K / ₹75K / ₹75K` | ₹7,50,000 | **₹9,95,000** | **₹1,55,000** | **13.5%** | Raise Anchor Quote to **₹13,50,000–₹14,00,000** before pitching |

---

## 6. Post-Delivery Monthly Maintenance Unit Economics (Month 4+ / Day 91+)

| Retainer Plan | Monthly Client Fee | Est. Dev Hours | Est. Internal Effort + Amortized Tooling | Net Monthly Profit | Margin % |
| :--- | ---: | :---: | ---: | ---: | :---: |
| **Tier 1: Essential Tech AMC** | **₹18,000 / mo** | `4–5 hrs/mo` | ~₹6,500 *(dev time + ₹2.5K tool share)* | **₹11,500 / mo** | **63.9%** |
| **Tier 2: Growth & Festive Support** *(Rec.)* | **₹30,000 / mo** | `12–15 hrs/mo` | ~₹12,500 *(dev time + ₹3.0K tool share)* | **₹17,500 / mo** | **58.3%** |
| **Tier 3: Tech + Phase 2 Sprint** | **₹50,000 / mo** | `25–30 hrs/mo` | ~₹22,500 *(dev time + ₹3.5K tool share)* | **₹27,500 / mo** | **55.0%** |

---

## 7. Execution Risk Register & Key Defenses

| Risk | Consequence | Mitigation Built Into Plan |
| :--- | :--- | :--- |
| **1. COD Return-to-Origin (RTO) Bleed** | Gold-plated fashion buyers reject fake/impulse COD parcels, burning forward + reverse Shiprocket fees. | Offer a small prepaid UPI incentive (`₹50` or `5%` off), keep COD fee optional, and require `COD Verified` WhatsApp confirmation before AWB dispatch. |
| **2. Week-1 KYC Bottleneck** | Razorpay, Shiprocket, or WhatsApp BSP approvals stall Phase 3 testing. | Make KYC submission (`GSTIN`, `PAN`, `Cancelled Cheque`) a **Day-5 milestone gate** while devs build against sandbox keys. |
| **3. Offline Counter Stock Drift** | A piece sold in the physical shop is ordered online the same evening. | Enforce a 5-minute EOD `/admin` stock check or dedicated online stock buffer; keep 2-way ERP sync scoped in Phase 2 (`₹1.25L–₹2.0L`). |
| **4. Shopify Pushback from Client** | Client asks why we aren't using a ₹2,000/mo Shopify template. | Demo our live Next.js prototype, show 2-year recurring Shopify + Indian plugin costs vs. 100% IP ownership, and highlight sub-second mobile ad-landing speed. |

---

## 8. Ready-to-Send Email Template to Your Manager

> **Subject:** Proposal & Tech Plan of Action — Gold-Plated Jewellery Digital Transformation (90-Day Roadmap)
>
> Hi `[Manager Name]`,
>
> Thank you for sharing the 90-day digital transformation framework. After reviewing it closely—especially factoring in that the client sells **gold-plated jewellery** (rather than solid 22KT gold & diamond)—I've put together a technical Plan of Action, initial client quotation, and internal cost/tooling breakdown for our review.
>
> **Key Adjustments Recommended:**
> 1. **Domain Alignment (Gold-Plated vs. Solid Gold):** We should remove BIS 916 hallmark/HUID claims, live daily gold-rate pricing, `≥ ₹2L` PAN KYC, and Sequel vault logistics from the proposal. Instead, the storefront should emphasize **fixed MRP/offer pricing, variant sizing (bangles/finishes), honest plating & anti-tarnish care specs, bundle/combo AOV boosters, COD verification to control RTO, and Shiprocket/Delhivery shipping**.
> 2. **Tech Stack (Next.js + Tailwind + Vercel + Supabase):** Since both developers work in React/TypeScript and we already have a working Next.js prototype (`Gold Store Client`), building on **Next.js + Supabase + Vercel** avoids Shopify's learning-curve delay and recurring USD app fees while giving much faster mobile landing pages for Instagram/Meta ads.
> 3. **Fixed Timeline Sequencing:** Rather than launching paid ads on Day 56 before payment testing (Day 74) and Go-Live (Day 81), our plan launches the store cleanly on **Day 60**, then runs **Month-1 Live Ads + our 30-day warranty across Days 61–90**.
> 4. **Modular Commercials & Maintenance (3.0 FTE 90-Day Dedication):**
>    - **Core Tech Build (Module A):** `₹6,60,000` Excl. GST
>    - **Full 90-Day Modular Package (Tech + Optional Branding, 100-SKU Shoot, SEO/Month-1 Ads & Full-Time 90-Day PM):** `₹11,50,000` Excl. GST
>    - **Post-Launch Tech Maintenance (Day 91+):** Tiered AMC plans at `₹18,000`, `₹30,000`, or `₹50,000 / month` (with client-owned cloud hosting/APIs billed directly at actuals).
>
> I've attached two documents for your review:
> - **Internal Tech Budget & Margin Sheet** (`GOLD_PLATED_INTERNAL_TECH_BUDGET.md`) — 2-dev split, AI/Figma/Vercel staging tooling (`₹27,000` over 3 months), payroll sensitivity formula, and scope-trade options.
> - **Client-Facing Initial Quotation** (`gold-plated-client-quotation.pdf` / `GOLD_PLATED_CLIENT_QUOTATION.md`) — modular scope, 90-day roadmap, payment milestones, and hosting pass-through table.
>
> Let me know when we can walk through the payroll numbers and which optional modules (B–E) you'd like included before sending to the client.
>
> Best regards,  
> `[Your Name]`
