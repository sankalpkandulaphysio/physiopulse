# AGENT.md - PhysioPulse Website Guide

## Project Overview

**PhysioPulse** is a static website for a physiotherapy clinic in Hyderabad, India. The project is built with vanilla HTML, CSS, and JavaScript, focusing on accessibility, SEO optimization, and mobile responsiveness.

**Domain**: `physiopulse.in`
**Location**: Hyderabad, India
**Technology Stack**: HTML5, CSS3, JavaScript (ES6+)

## File Structure

```
├── src/                    # Source code
│   ├── pages/              # HTML pages
│   │   ├── index.html      # Homepage
│   │   ├── about.html      # About page
│   │   ├── services/       # Service pages
│   │   ├── conditions/     # Condition-specific pages
│   │   ├── locations/      # Location pages
│   │   └── blog/           # Blog content
│   ├── styles/
│   │   └── main.css        # Main stylesheet
│   └── js/
│       └── main.js         # Core JavaScript
├── docs/                   # Documentation
│   ├── batch_1/           # Design system & IA
│   ├── batch_2/           # Content sections
│   └── batch_3/           # Templates & workflows
├── images/                 # Media assets
├── templates/              # Starter templates
└── sitemap.xml            # SEO sitemap
```

## Design System

### Color Palette
- **Primary Blue**: `#00468C`
- **Accent Blue**: `#2F80ED`
- **Light Background**: `#F7F9FC`
- **Text Dark**: `#1F2933`
- **White**: `#ffffff`
- **Gray Light**: `#E4E7EB`
- **Gray Medium**: `#9AA5B1`

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Sans-serif, weight 700
- **Body**: Clean sans-serif, readable on mobile

### Font Scale
- **H1**: 48px desktop / 34px mobile
- **H2**: 36px / 28px
- **Body**: 16px / 15px

### Spacing
- **Section Padding**: 80px desktop / 48px mobile
- **Grid Gap**: 24px
- **Max Width**: 1200px

## Technical Architecture

### CSS Architecture
- CSS Custom Properties (variables) for consistent theming
- Mobile-first responsive design
- BEM naming convention for CSS classes
- Flexbox and CSS Grid for layouts

### JavaScript Features
- Hamburger menu toggle for mobile navigation
- Dropdown menu functionality
- Accessibility attributes (ARIA labels)
- DOMContentLoaded event handling

### HTML Structure
- Semantic HTML5 elements
- Proper heading hierarchy (H1-H6)
- Meta tags for SEO optimization
- Open Graph tags for social sharing

## Content Guidelines

### Brand Voice
- Professional but warm and human
- Clear, supportive, reassuring tone
- Avoid medical jargon unless explained
- No false claims or guarantees of cure

### Page Templates

#### Service Pages Structure
1. Hero section with service-specific headline
2. Service overview
3. Conditions treated
4. Treatment approach
5. Benefits & outcomes
6. Relevant testimonials
7. CTA banner

#### Content Requirements
- One primary keyword per service page
- Internal links to related conditions and blogs
- Focus on assessment and personalized care
- Explain services in simple language

## Development Workflow

### File Naming Conventions
- HTML files: lowercase with hyphens (`service-name.html`)
- CSS classes: BEM notation (`block__element--modifier`)
- JavaScript: camelCase for functions and variables

### Code Standards
- **Indentation**: 4 spaces
- **Quotes**: Double quotes for HTML, single for JavaScript
- **Line Length**: Max 80 characters for readability
- **Comments**: Descriptive comments for complex logic

### Template Usage
- Use [`templates/starter-template.html`](templates/starter-template.html) for new pages
- Follow the established header/footer structure
- Maintain consistent meta tag patterns

## SEO & Accessibility

### Meta Tags Required
- `description`: 150-160 characters
- `keywords`: Relevant, comma-separated
- `viewport`: Mobile-responsive
- `charset`: UTF-8

### Accessibility Features
- ARIA labels for interactive elements
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility

### Performance Optimization
- Optimized images in [`images/`](images/) directory
- Minified CSS and JavaScript
- Efficient DOM manipulation

## Navigation Structure

### Header Navigation
- Home
- Services (dropdown)
- Conditions (dropdown)
- Locations
- About
- Blog
- Book Now (CTA)

### Footer Navigation
- Quick links
- Contact details
- WhatsApp CTA
- Legal/disclaimer links

## Build & Deployment

### Current Setup
- Static HTML/CSS/JS files
- No build process or bundler
- Direct file deployment

### File Path Conventions
- Use relative paths for internal links
- CSS: `../styles/main.css`
- Images: `../../images/filename.jpg`
- JavaScript: `../js/main.js`

## Common Patterns

### Button Styles
```css
.btn-primary   /* Solid blue background */
.btn-secondary /* Outline style */
```

### Section Structure
```html
<section class="section-name">
    <div class="container">
        <!-- Content -->
    </div>
</section>
```

### Grid Layouts
```css
.grid-2-col    /* 2-column grid */
grid-3-col     /* 3-column grid */
```

## Testing Checklist

### Before Deployment
- [ ] All links work correctly
- [ ] Images load properly
- [ ] Mobile responsiveness tested
- [ ] SEO meta tags verified
- [ ] Accessibility features tested
- [ ] Cross-browser compatibility

## Troubleshooting

### Common Issues
- **Path errors**: Check relative path structure
- **CSS not loading**: Verify file paths and cache
- **JavaScript errors**: Check browser console
- **Mobile layout issues**: Test responsive breakpoints

### Debugging Tools
- Browser Developer Tools
- Mobile device testing
- SEO analysis tools
- Accessibility validators

## Resources

### Documentation
- [`docs/batch_1/`](docs/batch_1/) - Design system and IA
- [`docs/batch_2/`](docs/batch_2/) - Content sections
- [`docs/batch_3/`](docs/batch_3/) - Templates and workflows

### Templates
- [`templates/starter-template.html`](templates/starter-template.html) - Page template
- [`templates/starter-template.css`](templates/starter-template.css) - CSS template
- [`templates/starter-template.js`](templates/starter-template.js) - JS template

### Key Files
- [`src/styles/main.css`](src/styles/main.css) - Main stylesheet
- [`src/js/main.js`](src/js/main.js) - Core JavaScript
- [`src/pages/index.html`](src/pages/index.html) - Homepage reference

---

*Last Updated: 2026-02-19*
*Maintainer: AI Agent*
