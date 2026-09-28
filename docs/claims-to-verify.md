# Claims & Business Facts Registry — Organic Flavouring

This registry documents every strong marketing claim, certification assertion, and product fact in the codebase.
Each claim cites its file location, current code representation, required verification evidence, and action item for the business owner.

---

## 1. Statutory Standards & Accreditations

| Claim | Source File & Line | Evidence Required from Owner | Status in Code |
|---|---|---|---|
| **Pakistan Halal Standard PS:3733-2022 (R) / OIC-SMIIC 1:2019** | `src/data/products.ts` (line 54) & `src/pages/Certifications.tsx` | Official Halal Certificate issued by an accredited Halal Certification body recognized in Pakistan (e.g. SANHA, Halal Research Council, PNAC accredited body). Must confirm certificate number, scope, and validity dates. | Placeholder `[CONFIRM: Halal certificate number]`, verification pending banner rendered. |
| **ISO 9001:2015 Quality Management System** | `src/data/products.ts` (line 64) & `src/pages/Certifications.tsx` | ISO 9001:2015 Registration Certificate from an accredited registrar for spice packaging, handling, and distribution at Lahore facility. | Placeholder `[CONFIRM: ISO certificate number]`, verification pending banner rendered. |
| **"Hygienically packed in ISO 9001 certified facility"** | `src/pages/About.tsx` & `src/pages/Certifications.tsx` | Site inspection or audit report confirming packaging SOPs and sanitary hygiene adherence at Kahna Nau, Lahore facility. | Tracked for owner confirmation. |

---

## 2. Product Authenticity & Laboratory Claims

| Claim | Source File & Line | Evidence Required from Owner | Status in Code |
|---|---|---|---|
| **"0% Sudan I–IV Synthetic Red Dyes"** | `src/pages/Transparency.tsx` (line 150) | Third-party accredited laboratory test report (HPLC screening) on red chilli powder verifying undetectable Sudan I, II, III, IV and Para Red dye levels. | Displayed with batch lookup; owner must supply actual lab report PDF. |
| **"0% Synthetic Additives / Preservatives"** | `src/data/products.ts` & `src/pages/Home.tsx` | Supplier certificate of analysis (COA) or lab confirmation of zero added chemical additives, flow agents, or fillers. | Preserved with batch transparency context. |
| **"100% Pure & Unadulterated Spices"** | Multiple pages (Header, Home, Shop) | Lab testing (ash content, acid-insoluble ash, moisture) compliant with Punjab Food Authority (PFA) / PSQCA spice standards. | Preserved. |
| **"Natural ASTA Color: 120+"** | `src/pages/Transparency.tsx` (line 132) | ASTA 20.1 spectrophotometric laboratory test report measuring extractable color value on Dandi-Cut chilli batches. | Active parameter in batch inspector. |
| **"Moisture Retention: 9.2%"** | `src/pages/Transparency.tsx` (line 144) | Lab oven-drying moisture determination report ensuring moisture is safely below 11% to prevent aflatoxin/mold. | Active parameter in batch inspector. |

---

## 3. Agronomy, Sourcing & Terroir

| Claim | Source File & Line | Evidence Required from Owner | Status in Code |
|---|---|---|---|
| **"Single-Origin Belts"** | `src/data/products.ts` (terroirRegions) | Procurement invoices from specific agricultural mandi/farms (e.g. Kunri/Mirpurkhas for Dandi-Cut Chilli, Kasur for Turmeric). | Products mapped to specific Pakistani sourcing regions. |
| **"Sun-Dried & Stone-Milled"** | `src/pages/Home.tsx` & `src/pages/ProductDetail.tsx` | Confirmation of milling equipment (traditional slow stone chakkis / temperature-monitored pulverizers) to substantiate that heat did not degrade volatile oils. | Preserved as core brand narrative. |

---

## 4. Business History & Operating Model

| Claim | Source File & Line | Evidence Required from Owner | Status in Code |
|---|---|---|---|
| **Founding Year: "Since 2022"** | `src/data/products.ts` (`officialInfo.founded = "2022"`), `index.html` | Business registration / NTN certificate from FBR or partnership deed confirming 2022 inception. (Fixed legacy "Since 1994" typo in `index.html`). | Standardized to 2022 across 100% of pages. |
| **Dispatched Nationwide from Lahore** | `src/pages/Checkout.tsx`, `src/config/store.ts` | Active courier account agreement (e.g. Trax, Leopard, Call Courier, PostEx, TCS) based out of Lahore. | Active in checkout and shipping notices. |
| **Customer Reviews** | `src/data/reviews.ts` | Genuine customer order references and written feedback before publishing social proof. | Unverified reviews migrated to `OWNER_TODO.md`; reviews array ships empty with graceful placeholder until confirmed. |
