# Matt Built - Custom Joinery Website

A professional single-page brochureware website for Matt Built, a bespoke joinery and custom cabinet/kitchen maker business. Built with vanilla HTML, CSS, and JavaScript - no dependencies, no build process, just modern, responsive design that showcases exceptional craftsmanship.

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Structure | HTML5 | - | Single-page semantic structure (540 lines) |
| Styling | CSS3 Custom Properties | - | Theming system with CSS variables (1022 lines) |
| Interactivity | Vanilla JavaScript (ES6+) | - | No build process, no dependencies (367 lines) |
| Fonts | Google Fonts | - | Inter (body), Caveat (display/handwritten) |
| Server | Python HTTP Server | 3.x+ | Local development server |

**Why No Build Process?**
- Static brochureware site with simple requirements
- Fast loading times without bundler overhead
- Easy maintenance and deployment (just upload files)
- Browser-native features (CSS Grid, Custom Properties, ES6+, Intersection Observer)

## Quick Start

```bash
# Prerequisites
# - Python 3.x (for local server)
# - Modern web browser (Chrome, Firefox, Edge, Safari)

# Development server (RECOMMENDED)
python -m http.server 8080
# Then open http://localhost:8080

# Alternative: Direct file access
# Works in Edge/Firefox, but Chrome blocks local file:// image loading
# Simply open index.html in browser
```

## Project Structure

```
mattbuilt/
├── index.html              # Single-page site structure (540 lines)
├── styles.css              # All styling with CSS variables (1022 lines)
├── script.js               # Vanilla JS interactions (367 lines)
├── CLAUDE.md              # Project documentation (this file)
├── Matt-Built.pdf         # Original design reference
├── .claude/               # Claude Code configuration
└── images/
    ├── logo.png           # Navigation logo (50px height)
    ├── logo-full.png      # Hero section logo
    ├── about-matt.jpg     # About section photo
    └── portfolio/         # Project photos (18 images)
        ├── kitchen-*.jpg
        ├── bathroom-*.jpg
        ├── cabinet-*.jpg
        ├── garden-*.jpg
        └── ...
```

## Architecture Overview

This is a **pure static website** with zero build process or external dependencies. All code runs directly in the browser without compilation, bundling, or npm packages.

### Single-Page Structure

The site is organized into semantic sections, each with an ID for smooth scrolling navigation:

1. **Hero** (`#home`) - Full-screen welcome with logo, tagline, and CTAs
2. **About** (`#about`) - Business introduction with feature highlights
3. **Services** (`#services`) - 6 service cards (kitchens, wardrobes, media units, offices, gardens, bathrooms)
4. **Portfolio** (`#portfolio`) - Filterable image gallery with 18+ projects
5. **Testimonials** (`#testimonials`) - Auto-scrolling carousel with 3 testimonials
6. **Contact** (`#contact`) - Form and contact details
7. **Footer** - Links and copyright

### CSS Architecture

All styling is in a single `styles.css` file organized by:
- CSS custom properties (`:root`) for colors, spacing, typography, shadows
- Reset and base styles
- Utility classes (`.container`, `.section`, `.btn`)
- Component styles (navbar, hero, services, portfolio, testimonials, contact, footer)
- Responsive styles with mobile-first breakpoints (480px, 768px, 1024px)
- Animation classes (fade-in, scroll animations)

### JavaScript Architecture

Vanilla JavaScript organized into initialization functions:
- `initNavigation()` - Mobile menu, scroll effects, active section highlighting
- `initScrollEffects()` - Smooth anchor link scrolling
- `initPortfolioFilter()` - Category filtering for portfolio items
- `initTestimonialSlider()` - Carousel with touch/swipe support, auto-play
- `initContactForm()` - Client-side validation and submission handling
- `initAnimations()` - Intersection Observer for scroll-triggered animations

All initialization happens on `DOMContentLoaded` event.

### Code Organization Principles

- **No globals**: All functions scoped within `DOMContentLoaded` or as named functions
- **Event delegation**: Attach listeners to parent elements where appropriate
- **Performance-first**: Intersection Observer for animations, passive event listeners
- **Cached selectors**: DOM elements queried once at init and stored in variables
- **Utility functions**: `debounce` and `throttle` utilities included (lines 344-366)

## Key Features

### 1. Responsive Navigation
- Fixed navbar with scroll effects (adds `.scrolled` class)
- Mobile hamburger menu (slide-in from right on small screens)
- Active section highlighting based on scroll position
- Smooth scroll to sections on link click

### 2. Portfolio Gallery
- Masonry-style grid layout (4 columns desktop, 3 tablet, 2 mobile, 1 very small)
- Category filtering: All, Kitchens, Storage, Cabinets, Bathrooms, Outdoor
- Portfolio items have `data-category` attributes for filtering
- Large items span 2 columns/rows with `.large` class
- Hover effects: image zoom + text overlay fade-in

### 3. Testimonial Carousel
- Auto-scrolling every 5 seconds
- Previous/Next buttons
- Dot indicators (clickable)
- Touch/swipe support for mobile
- Pause auto-play on hover
- Smooth CSS transitions using `transform: translateX()`

### 4. Contact Form
- Client-side validation (required fields, email format)
- Visual feedback with notification system
- Currently simulated submission (no backend)
- Fields: Name, Email, Phone, Project Type (dropdown), Message

### 5. Scroll Animations
- Intersection Observer API for performance
- Fade-in animations on service cards and contact items
- Bounce animation on scroll indicator
- Smooth scroll behavior on anchor links

## Brand Identity

### Colors (CSS Variables)

| Variable | Hex Value | Usage |
|----------|-----------|-------|
| `--color-primary-dark` | `#1a3a4a` | Dark teal - navbar, headings, backgrounds |
| `--color-primary` | `#1e4459` | Medium teal - gradients |
| `--color-primary-light` | `#2a5a73` | Light teal - gradients |
| `--color-gold` | `#c9a227` | Gold accent - section labels, highlights |
| `--color-gold-light` | `#d4b84a` | Light gold - hover states |
| `--color-cyan` | `#4ecdc4` | Cyan - buttons, gradients, accents |
| `--color-blue` | `#44a8b3` | Blue - buttons, gradients |

### Typography

- **Body font**: `Inter` - Clean, modern sans-serif for all body text and UI
- **Display font**: `Caveat` - Handwritten/script font for tagline "Built for you! Built to last!"
- Font weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Design Patterns

- **Spacing scale**: XS (0.25rem) to 4XL (6rem) using CSS variables
- **Border radius**: Small (0.25rem), Medium (0.5rem), Large (1rem), Full (9999px)
- **Shadows**: 4 levels (sm, md, lg, xl) using layered box-shadows
- **Transitions**: Fast (150ms), Base (300ms), Slow (500ms) with ease timing
- **Gradients**: Linear gradients from cyan to blue for CTAs, dark to light teal for backgrounds

## Development Guidelines

### HTML Patterns

- **Semantic elements**: `<nav>`, `<section>`, `<footer>` with meaningful IDs
- **Accessibility**: `aria-label` on buttons, `alt` text on images, semantic headings
- **SVG icons**: Inline SVGs for icons (no icon fonts or external libraries)
- **Image paths**: Relative paths with `./` prefix (e.g., `./images/logo.png`)

### CSS Conventions

- **CSS variables**: All design tokens in `:root`, referenced throughout
- **BEM-like naming**: `.component-element` pattern (e.g., `.nav-logo`, `.hero-content`)
- **Utility classes**: Reusable classes for layout (`.container`, `.section`)
- **Mobile-first**: Base styles for mobile, media queries for larger screens
- **Comments**: Section headers with `/* ===== Section Name ===== */`

### JavaScript Conventions

- **Function naming**: camelCase with descriptive verbs (`initNavigation`, `showNotification`, `handleSwipe`)
- **Variable naming**: camelCase (`currentIndex`, `touchStartX`, `autoPlayInterval`)
- **Constants**: Not currently used (could use SCREAMING_SNAKE_CASE if needed)
- **Event listeners**: Arrow functions for concise inline handlers
- **DOM caching**: Query elements once at init, store in variables
- **Comments**: Section headers with `// ===== Section Name =====`
- **Code organization**: Each feature gets its own init function

### File Naming

- **HTML/CSS/JS**: lowercase with hyphens (e.g., `styles.css`, `logo-full.png`)
- **Images**: lowercase with hyphens, descriptive (e.g., `media-cabinet-1.jpg`, `kitchen-2.jpg`)
- **Folders**: lowercase (e.g., `portfolio/`, `images/`)

## Portfolio Categories

Portfolio items use `data-category` attributes for filtering:

| Category | Item Count | Examples |
|----------|------------|----------|
| `kitchens` | 3 | Shaker kitchen, kitchen dresser, modern kitchen |
| `storage` | 3 | Fitted wardrobes, shelving units, workshop storage |
| `cabinets` | 5 | Media cabinets, sideboards, home office, commercial installs |
| `bathrooms` | 4 | Bathroom renovations, shower rooms, vanity units |
| `outdoor` | 3 | Garden buildings, garden offices |

**Adding new portfolio items:**
1. Add image to `images/portfolio/` (JPEG, optimized for web)
2. Add `.portfolio-item` div in `index.html` with appropriate `data-category`
3. Use `.large` class for featured items (spans 2x2 grid)
4. Include overlay with project title and description

## Browser Compatibility

- **Modern browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Required features**: CSS Grid, CSS Custom Properties, Intersection Observer API, Flexbox
- **Image loading**: Chrome requires local server due to CORS, Edge/Firefox work with `file://`

## Known Issues & TODOs

### Backend Integration
- **Contact form**: Currently simulated submission (script.js:234-240) - shows success message but doesn't send data
  - TODO: Integrate with backend API or form service (FormSpree, Netlify Forms, EmailJS)

### SEO & Meta
- Missing Open Graph tags for social media sharing
- Missing Twitter Card meta tags
- No favicon.ico or apple-touch-icon
- Could improve meta description

### Images
- No lazy loading implemented (could add `loading="lazy"` to img tags)
- Images are not optimized (large file sizes, no WebP format)
- No responsive images (srcset) for different screen sizes
- Missing alt text on some decorative SVG icons

### Accessibility
- Could add skip-to-content link for keyboard navigation
- Keyboard focus styles could be more prominent
- ARIA live region for notification system would improve screen reader support
- Some color contrast ratios could be improved

### Performance
- Consider adding preload hints for hero logo image
- Could implement lazy loading for portfolio images below fold
- No service worker for offline support or caching

### Content
- Social media links are placeholders (`href="#"`)
- Phone number is placeholder ("Call for details")
- No analytics or tracking (intentional for privacy)

## Deployment

This site can be deployed to any static hosting service:

- **GitHub Pages**: Push to repo, enable Pages in settings
- **Netlify**: Drag-and-drop the project folder
- **Vercel**: Connect repo or drag-and-drop
- **Traditional hosting**: Upload all files via FTP

**Pre-deployment checklist:**
- [ ] Replace placeholder social links in footer (index.html:464-475)
- [ ] Add actual phone number in contact section (index.html:446)
- [ ] Implement backend for contact form or integrate with form service
- [ ] Optimize images (compress JPEGs, convert to WebP if needed)
- [ ] Add favicon and touch icons
- [ ] Update copyright year in footer
- [ ] Test on mobile devices

## Environment Variables

None required - this is a static site with no backend or API calls.

## Contact Details

From the website:
- **Email**: Matt@MattBuilt.co.uk
- **Location**: Serving the local area
- **Services**: Custom joinery, kitchens, cabinets, wardrobes, bathrooms, garden buildings

## Technical Implementation Details

### Navigation Active State (script.js:51-70)
Uses scroll position + section offsets to highlight current nav link:
```javascript
// Checks if scrollY is within section bounds
if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
    correspondingLink.classList.add('active');
}
```

### Portfolio Filtering (script.js:90-116)
Simple show/hide with data attributes:
```javascript
// Each item has data-category="kitchens|storage|cabinets|bathrooms|outdoor"
if (filter === 'all' || category === filter) {
    item.classList.remove('hidden');
} else {
    item.classList.add('hidden');
}
```

### Testimonial Carousel (script.js:118-200)
- Uses CSS `transform: translateX()` for sliding animation
- Auto-advance every 5 seconds with `setInterval`
- Touch events: compares `touchstart` vs `touchend` X positions (50px threshold)
- Dots dynamically generated based on number of testimonial cards

### Contact Form Validation (script.js:202-242)
- Required field check: `if (!data.name || !data.email || !data.message)`
- Email regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Notification system: Toast-style popups with inline styles (script.js:244-309)
  - **Unique approach**: Dynamically injects `<style>` tag with keyframes (no CSS file needed)
  - Success (green) vs error (red) color variants
  - Auto-dismiss after 5 seconds with slide-out animation
  - Manual close button with inline event handler

### Scroll Animations (script.js:311-339)
- Intersection Observer monitors `.service-card` and `.contact-item` elements
- **Note**: Portfolio items are NOT animated to avoid opacity/visibility conflicts
- Sets opacity/transform on intersection, then unobserves

## Browser Compatibility Notes

**Chrome Image Loading Issue:**
Chrome blocks `file://` protocol images due to CORS security policy. This is why Python server is required for development. Edge and Firefox are more permissive with local files.

**Required Browser Features:**
- CSS Grid & Flexbox (2017+)
- CSS Custom Properties (2016+)
- Intersection Observer API (2017+)
- Touch Events API (2013+)
- ES6+ JavaScript (2015+)

## Performance Benchmarks

**Unoptimized State (Current):**
- Total page size: ~2.1 MB (mostly images)
- HTML: 30 KB
- CSS: 20 KB
- JS: 11 KB
- Portfolio images: 18 images averaging 100-120 KB each

**Optimization Opportunities:**
- Convert images to WebP (50-80% size reduction)
- Implement lazy loading for below-fold images
- Minify CSS/JS for production (save ~30-40%)
- Add preload hints for critical assets

## Additional Resources

- **Original design reference**: `Matt-Built.pdf` in project root
- **Logo files**: `images/logo.png` (nav, 50px height), `images/logo-full.png` (hero)
- **About photo**: `images/about-matt.jpg` (92 KB)
- **Portfolio photos**: `images/portfolio/*.jpg` (18 images, 60-265 KB each)


## Skill Usage Guide

When working on tasks involving these technologies, invoke the corresponding skill:

| Skill | Invoke When |
|-------|-------------|
| html | Structures semantic single-page layout with sections, navigation, and forms |
| css | Manages CSS custom properties, responsive design, and component styling |
| javascript | Handles DOM interactions, carousel logic, form validation, and scroll animations |
| frontend-design | Applies CSS variable theming, responsive grid layouts, and scroll-triggered animations |
