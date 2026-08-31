# Organic Flavouring Website

A modern, premium‑styled web application showcasing organic flavouring products.

## ✨ Features
- Clean, glass‑morphism UI with smooth micro‑animations
- Responsive design for desktop and mobile
- Product catalogue with dynamic filtering
- Shopping cart powered by React Context API
- Transparent information page (ingredients, sourcing)

## 🛠️ Tech Stack
- **Frontend**: React, TypeScript, Vite (or Next.js if you prefer a framework)
- **Styling**: Vanilla CSS with custom design tokens (HSL palettes, Google Fonts – *Inter*)
- **State Management**: React Context (`CartContext`)
- **Data**: Local TS modules (`products.ts`, `transparency.ts`)

## 🚀 Getting Started
1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/organic-flavouring-website.git
   cd organic-flavouring-website
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the dev server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` (default Vite port) in your browser.

## 📦 Build for Production
```bash
npm run build
# Preview the production build
npm run preview
```

## 📄 Project Structure
```
src/
├─ pages/          # Route components (Home, About, Contact)
├─ data/           # Static product & transparency data
├─ context/        # React Context providers (Cart)
├─ assets/         # Images, fonts, icons
└─ index.html
```

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes and push to your fork
4. Open a Pull Request describing the change

All contributions follow the existing design system – keep the visual style premium and consistent.

## 📜 License
All rights reserved. This project is the exclusive property of **Sarmad Nadeem**. Unauthorized use, copying, or cloning of this website is strictly prohibited.
---
