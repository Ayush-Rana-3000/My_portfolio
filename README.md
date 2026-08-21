# My Portfolio

A personal portfolio website for **Ayush Rana** — a Software Developer and Full Stack Developer. Built with vanilla HTML, CSS, and JavaScript, featuring a responsive design, smooth animations, and a comprehensive test suite.

## Features

- **Responsive Design** — Works across desktop, tablet, and mobile devices with a hamburger menu for smaller screens
- **Smooth Scrolling** — Navigation links scroll smoothly to each section
- **Scroll Animations** — Sections fade in as you scroll down using IntersectionObserver
- **Featured Project** — Prominent presentation of LumaWall with highlights, technologies, and GitHub link
- **Data-Driven Projects** — Project information maintained in `data/projects.js` for easy updates
- **Grouped Skills** — Skills organized into Frontend, Backend & Runtime, and Languages categories
- **Accessibility** — Focus-visible states, reduced-motion support, semantic HTML, proper link attributes

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **CSS Features:** Flexbox, Grid, CSS Transitions, Backdrop Filter, Google Fonts (Poppins)
- **Testing:** Vitest (unit), Playwright (end-to-end)

## Project Structure

```
My_portfolio/
├── portfollioi/              # Portfolio source files
│   ├── index.html            # Main HTML page
│   ├── styles.css            # All styles (responsive + animations + a11y)
│   ├── script.js             # Smooth scroll, mobile nav, scroll animations, project rendering
│   ├── data/
│   │   └── projects.js       # Structured project data (JSON-compatible)
│   ├── background1.png       # Background image
│   ├── resume.pdf            # Local resume copy
│   └── images/               # Skill icons, social icons, profile photos
├── tests/
│   ├── e2e/
│   │   └── portfolio.spec.js # Playwright E2E tests
│   └── unit/
│       ├── script.test.js    # Vitest unit tests
│       └── setup.js          # JSDOM test environment setup
├── package.json
├── playwright.config.js
├── vitest.config.js
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/Ayush-Rana-3000/My_portfolio.git

# Navigate to the project
cd My_portfolio

# Install dependencies
npm install
```

### Running Locally

Serve the portfolio using any static file server. For example:

```bash
npx serve portfollioi -p 3000
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

**Unit Tests (Vitest):**

```bash
npm test              # Run once
npm run test:watch    # Run in watch mode
```

**End-to-End Tests (Playwright):**

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run E2E tests
npm run test:e2e      # Headless
npm run test:e2e:ui   # With Playwright UI
```

**Run All Tests:**

```bash
npm run test:all
```

### What the Tests Cover

| Suite | Framework | Tests | Coverage |
|-------|-----------|-------|----------|
| Unit | Vitest | 13 | Smooth scrolling, mobile nav toggle, IntersectionObserver animations, DOM structure, project data validation |
| E2E | Playwright | 20 | Page load, featured project, project cards, skills groups, navigation, mobile responsiveness, accessibility, performance |

**E2E tests run across 5 browsers/devices:**
- Desktop Chrome, Firefox, WebKit (Safari)
- Mobile Chrome (Pixel 5), Mobile Safari (iPhone 12)

## Portfolio Sections

| Section | Description |
|---------|-------------|
| **Header** | Name, role, profile photo, brief intro, and call-to-action buttons (View Projects, Contact) |
| **Featured Project** | LumaWall — desktop live-wallpaper platform with Rust/React/Tauri 2 |
| **Projects** | Image Viewer, Customer Shopping Analysis, Titanic Analysis — each with tech tags and GitHub links |
| **Skills** | Grouped into Frontend (HTML, CSS, JS, React), Backend (Node.js), and Languages (Python, Java, C, C++) |
| **Academics** | B.Tech CSE, Higher Secondary, SEE |
| **Resume** | Download link (Google Drive) |
| **Contact** | Email, LinkedIn, GitHub |

## Projects

Project data is maintained in `portfollioi/data/projects.js`. To add or update a project, edit that file following the existing data shape:

```js
{
  "id": "project-slug",
  "title": "Project Name",
  "tagline": "One-sentence value proposition.",
  "description": "Short description of problem, approach, and contribution.",
  "technologies": ["Tech1", "Tech2"],
  "highlights": ["Key capability or outcome"],
  "githubUrl": "https://github.com/...",
  "demoUrl": null,  // or "https://..." if deployed
  "status": "public",  // or "featured"
  "imageAlt": "Description for accessibility"
}
```

### Featured Projects

| Project | Technologies | GitHub |
|---------|-------------|--------|
| **LumaWall** | Rust, TypeScript, React, Tauri 2, Zustand, WebGL | [GitHub](https://github.com/Ayush-Rana-3000/LumaWall) |
| **Image Viewer** | HTML, CSS, JavaScript, Firebase | [GitHub](https://github.com/Ayush-Rana-3000/Image-viewer) |
| **Customer Shopping Analysis** | Python, PostgreSQL, Power BI | [GitHub](https://github.com/Ayush-Rana-3000/customer_shopping_bheavior_analysis) |
| **Titanic Demographic Analysis** | Python, Pandas, NumPy, Matplotlib | — |

## Author

**Ayush Rana**
- [GitHub](https://github.com/Ayush-Rana-3000)
- [LinkedIn](https://linkedin.com/in/ayushrana)
- Email: ayushrana@example.com

## License

© 2025 Ayush Rana. All Rights Reserved.
