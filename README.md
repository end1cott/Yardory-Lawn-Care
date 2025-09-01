# MowJet - Next.js Lawn Care Website

A complete, production-ready lawn care website built with Next.js 15, TypeScript, Tailwind CSS, and custom shadcn-style UI components.

## Features

- 🌐 **Bilingual Support** - English/Russian with cookie-based language switching
- 📱 **Responsive Design** - Mobile-first approach with modern UI
- 🎨 **Custom UI Components** - shadcn-style components without external dependencies
- 📝 **Lead Generation** - Interactive quote calculator with form validation
- 🖼️ **Before/After Gallery** - Interactive slider for showcasing work
- ⭐ **Customer Reviews** - Testimonials section
- ❓ **FAQ Section** - Expandable questions and answers
- 🗺️ **Service Area** - Coverage information
- 🔍 **SEO Optimized** - Sitemap, robots.txt, and structured data
- 📧 **API Integration Ready** - Lead submission endpoint for integrations

## Pages

- `/` - Homepage with all sections
- `/quote` - Interactive quote calculator and lead form
- `/area` - Service area information
- `/privacy` - Privacy policy
- `/terms` - Terms of service

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom shadcn-style components
- **Icons**: Lucide React
- **Validation**: Zod
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
lawncare/
├── app/                    # Next.js App Router pages
│   ├── (legal)/           # Legal pages (privacy, terms)
│   ├── api/               # API routes
│   ├── area/              # Service area page
│   ├── quote/             # Quote calculator page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── robots.ts          # SEO robots.txt
│   └── sitemap.ts         # SEO sitemap
├── components/            # React components
│   ├── sections/          # Page sections (hero, services, etc.)
│   ├── shared/            # Shared components (header, footer, etc.)
│   └── ui/                # Base UI components
├── lib/                   # Utility functions
├── locales/               # Translation files
└── public/                # Static assets
    └── gallery/           # Before/after images
```

## Customization

### Colors
Update the brand colors in `tailwind.config.ts`:
```ts
colors: {
  brand: {
    DEFAULT: 'hsl(142, 50%, 35%)',  // Primary green
    hover: 'hsl(142, 50%, 30%)',    // Darker green for hover
  }
}
```

### Content
- **Translations**: Edit `locales/en.ts` and `locales/ru.ts`
- **Services**: Update the services array in `components/sections/services.tsx`
- **Pricing**: Modify the plans in `components/sections/plans.tsx`
- **Reviews**: Update the reviews data in `components/sections/reviews.tsx`
- **FAQ**: Edit the questions in `components/sections/faq.tsx`

### Images
Replace placeholder images in `public/`:
- `hero-image.png` - Hero section background (≥1920×1080px, 16:9)
- `logo.svg` - Brand logo (32×32px)
- `og-image.jpg` - Open Graph image (1200×630px)
- `gallery/before1.svg`, `gallery/after1.svg` - Before/after gallery pair 1
- `gallery/before2.svg`, `gallery/after2.svg` - Before/after gallery pair 2
- `favicon.ico` - Browser favicon (32×32px)
- `apple-touch-icon.png` - iOS app icon (180×180px)

**Image Guidelines:**
- Use high-quality photos for hero and gallery images
- Before/after images should be the same size and aspect ratio
- Logo should be simple and recognizable at small sizes
- All images will show helpful fallbacks if not found

## API Integration

The `/api/lead` endpoint is ready for integration with:
- Google Sheets (via Apps Script)
- Telegram Bot
- Email services
- CRM systems

Example lead data structure:
```json
{
  "name": "John Doe",
  "phone": "+1234567890",
      "email": "info@mowjet.com",
  "address": "123 Main St",
  "city": "Philadelphia",
  "zip": "19111",
  "lot": "0.25",
  "freq": "bi-weekly",
  "services": ["mow", "edge"],
  "notes": "Gate code: 1234"
}
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
```bash
npm run build
npm start
```

## SEO Features

- ✅ Meta tags and Open Graph
- ✅ Structured data (Schema.org)
- ✅ Sitemap generation
- ✅ Robots.txt
- ✅ Semantic HTML
- ✅ Fast loading with Next.js optimizations

## Performance

- ⚡ Next.js 15 with App Router
- 🎯 Optimized images with Next.js Image component
- 📦 Tree-shaking and code splitting
- 🎨 CSS-in-JS with Tailwind
- 🔄 Automatic static optimization

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - feel free to use this project for your lawn care business!

## Support

For questions or issues, please open a GitHub issue or contact the development team.
