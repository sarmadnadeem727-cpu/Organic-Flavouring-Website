# Organic Flavouring — Performance & Optimization Report (Phase 7)

## 1. Asset & Media Weight Reduction

| Category | Before Phase 7 | After Phase 7 | Savings / Reduction |
|---|---|---|---|
| **Total `public/` directory weight** | **171.83 MB** | **31.53 MB** | **-81.6% (-140.3 MB)** |
| **Hero Video Duplicates** | 18.38 MB (duplicate `IMG_0199.mp4` & `hero_video.mp4`) | 9.19 MB (pruned duplicate `hero_video.mp4`) | **-50.0% (-9.19 MB)** |
| **Product Photos (Single Item)** | 4.3 – 4.9 MB per JPG | 22 – 35 KB (WebP) / 25 – 35 KB (optimized JPG) | **-99.3% reduction per photo** |
| **Unreferenced Screenshot Dumps** | 20+ `homepage_*.png` files (~30 MB) | 0 (all removed from bundle) | **-100%** |
| **Unreferenced Extra Photos** | 14 `extras-PXL_*.jpeg` files (~60 MB) | Moved to git-ignored `assets-src/` archive | **-100% from public bundle** |

---

## 2. JavaScript Code Splitting & Chunking Metrics

Built with **Vite 6** using dynamic imports and custom Rollup `manualChunks`:

| Chunk / Module | Size (Raw) | Size (Gzipped) | Loading Strategy |
|---|---|---|---|
| `index.html` | 1.50 kB | 0.75 kB | Critical HTML |
| `vendor-react.js` | 50.53 kB | 17.87 kB | Immediate (React, React-DOM, Router) |
| `index-core.js` | 365.09 kB | 116.13 kB | Main Application Shell (Home & Shop) |
| `index.css` | 62.05 kB | 11.70 kB | Global styling & animations |
| `ProductDetail.js` | 13.61 kB | 4.32 kB | Lazy-loaded on product route navigation |
| `Checkout.js` | 27.20 kB | 7.09 kB | Lazy-loaded on checkout/cart navigation |
| `Transparency.js` | 8.87 kB | 2.82 kB | Lazy-loaded on `/transparency` |
| `Certifications.js` | 8.97 kB | 2.15 kB | Lazy-loaded on `/certifications` |
| `About.js` | 4.88 kB | 1.56 kB | Lazy-loaded on `/about` |
| `Reviews.js` | 3.94 kB | 1.48 kB | Lazy-loaded on `/reviews` |
| `html2canvas.js` | 202.38 kB | 48.04 kB | **Isolated Async Chunk** (only downloaded on slip tap) |
| `jspdf.js` | 390.90 kB | 128.89 kB | **Isolated Async Chunk** (only downloaded on slip tap) |

---

## 3. Font Optimization

- Reduced Google Fonts `Fraunces` from the entire variable weight range (`300..900` roman + italic) to only the used editorial weights (`600..700` roman, `400` italic).
- Enforced `display=swap` to eliminate Flash of Invisible Text (FOIT) on 3G/4G connections.

---

## 4. Mobile Performance Profile (Simulation)

- **Target LCP**: < 2.5s on mid-range Android over 4G.
- **Hero on Mobile**: Heavy video autoplay and canvas particles bypassed; instant poster image rendered with `fetchPriority="high"`.
- **First-load transfer on Product Page**: < 350 KB total transfer (excluding lazy image assets below fold), well within the 1 MB budget.
- **Zero layout shift (CLS < 0.1)**: Explicit width and height (500×500) and aspect-square containers applied to all product imagery.
