# 🍽️ Food Hut — Angular Chronicles Part 1

> A modern food delivery landing page built with **Angular 19**, showcasing standalone components, PWA capabilities, and performance best practices.

🌐 **[Live Demo](https://food-hut-angular-chronicles-1.netlify.app/)** · 📂 **[Repository](https://github.com/ricardo564/angular-chronicles-part-1)** · 🎨 **[Figma Design](https://www.figma.com/community/file/1103820487891554272)** · 🐛 **[Report Bug](https://github.com/ricardo564/angular-chronicles-part-1/issues)**

---

## 📸 About the Project

Food Hut is a **responsive food delivery landing page** that presents a restaurant's menu, special offers, and mobile app download section. The project was built as a hands-on exploration of the Angular ecosystem — comparing its patterns and conventions against Vue.js and React.

The page features decorative SVG elements, product cards with ratings, category-based menu filtering, a tracking consent modal, and full PWA support with offline capabilities.

### 🧩 Page Sections

| Section | Description |
|---------|-------------|
| 🏠 **Hero / Intro** | Main landing area with search input, decorative food images, and customer badges |
| 🔥 **Special Offers** | Curated daily deals with product cards and decorative SVG overlays |
| 🛡️ **About Us** | Service highlights grid (free delivery, healthy food, etc.) with illustrations |
| 🍔 **Menu** | Category-filtered product catalog with responsive grid/list layout |
| 📱 **App Download** | Mobile app promotion section with download shortcuts |
| 📋 **Footer** | Newsletter signup, navigation links, and social media |
| 🔐 **Privacy Policy** | Dedicated route for legal compliance |
| 🍪 **Tracking Consent** | GDPR-style cookie/tracking consent modal |

---

## ⚡ Key Features

- 🚀 **Angular 19** with standalone components architecture
- ⚡ **OnPush Change Detection** for optimized rendering
- 📱 **Progressive Web App (PWA)** — installable, offline-capable with service worker caching
- 🎨 **TailwindCSS** — utility-first responsive design, mobile-first approach
- 🔍 **SEO Optimized** — meta tags (Open Graph, Twitter Cards), sitemap, robots.txt
- 🎯 **`trackBy` in `*ngFor`** — optimized list rendering
- 🍪 **Consent-Based Analytics** — Google Tag Manager only loads after user consent
- 🖼️ **Font Loading Optimization** — preconnect + non-blocking Google Fonts
- 🗂️ **Path Aliases** — clean imports with `@/` prefix
- 📐 **Typed Architecture** — strict TypeScript with explicit interfaces

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── home/                    # 🏠 Home page (composes all sections)
│   ├── layouts/                 # 📐 Main layout wrapper
│   ├── privacy-policy/          # 🔐 Privacy policy page
│   ├── app-routing.module.ts    # 🛤️ Route definitions
│   ├── app.component.ts         # 🌱 Root component
│   └── selective-preloading-strategy.service.ts
├── blocks/
│   ├── sections/                # 📦 Page sections (intro, menu, offers, etc.)
│   └── downloadShortcut/        # ⬇️ App download shortcut block
├── components/                  # 🧩 Reusable UI components
│   ├── Button.component.ts
│   ├── ProductCard.component.ts
│   ├── ServiceGrid.component.ts
│   ├── Header.component.ts
│   ├── Modal.component.ts
│   ├── Image.component.ts
│   └── ... (15 components)
├── types/                       # 📝 TypeScript interfaces
│   ├── product.types.ts
│   ├── ServiceItem.types.ts
│   ├── navigation.types.ts
│   └── userPreview.types.ts
├── configs/                     # ⚙️ Environment configuration
├── constants/                   # 📋 App-wide constants
├── utils/                       # 🔧 Utility functions
├── assets/                      # 🖼️ Static assets (SVGs, icons, images)
├── index.html                   # 📄 Entry HTML with SEO meta tags
├── main.ts                      # 🚀 Bootstrap file
├── manifest.webmanifest         # 📱 PWA manifest
├── sitemap.xml                  # 🗺️ SEO sitemap
└── robots.txt                   # 🤖 SEO robots
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Angular 19** | Frontend framework (standalone components) |
| **TypeScript 5.6** | Static typing and type safety |
| **TailwindCSS 3** | Utility-first CSS framework |
| **RxJS 7.8** | Reactive programming |
| **Angular Service Worker** | PWA offline caching |
| **Karma + Jasmine** | Unit testing |

---

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** 18.x or higher
- **pnpm** 8.x or higher
- **Angular CLI** 19.x

### 🏃‍♂️ Installation

```bash
# Clone the repository
git clone https://github.com/ricardo564/angular-chronicles-part-1.git

# Navigate to project directory
cd angular-chronicles-part-1

# Install dependencies
pnpm install

# Start development server
pnpm start
```

The app will be available at `http://localhost:4200`

### 🏗️ Build

```bash
# Production build
pnpm run build

# Development build with watch
pnpm run watch
```

### 🧪 Testing

```bash
# Run unit tests
pnpm ng test
```

---

## 🎨 Design Credits

UI/UX inspired by [Food Hut](https://www.figma.com/community/file/1103820487891554272) by [Kamran Ali](https://www.figma.com/@KamranAlime), adapted and implemented with Angular and TailwindCSS.

---

## 🤝 Contributing

1. 🍴 Fork the project
2. 🌱 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. ✍️ Make your changes
4. 📝 Commit using [Gitmoji](https://gitmoji.dev/) (`git commit -m "✨ feat: Add amazing feature"`)
5. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
6. 🔄 Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

> **Note:** Visual design elements are based on work from [Figma Community](https://www.figma.com/community/file/1103820487891554272) and are subject to Figma Community's terms of use.

---

## 🌟 Connect

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ricardo-camilo-web/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ricardo564)

---

## 🛡️ Technologies

[![Angular](https://img.shields.io/badge/Angular-19-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![RxJS](https://img.shields.io/badge/RxJS-7.8-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)](https://rxjs.dev)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
