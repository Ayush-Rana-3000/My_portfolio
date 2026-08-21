import { test, expect } from '@playwright/test';

test.describe('Portfolio Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle('Ayush Rana | Software Developer');
  });

  test('should have meta description', async ({ page }) => {
    const meta = page.locator('meta[name="description"]');
    await expect(meta).toHaveAttribute('content', /.+/);
  });

  test('should have visible header with name and role', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();

    const name = page.locator('header h1');
    await expect(name).toHaveText('Ayush Rana');

    const role = page.locator('.header-text p');
    await expect(role).toContainText('Software Developer');
  });

  test('should have hero call-to-action buttons', async ({ page }) => {
    const heroActions = page.locator('.hero-actions');
    await expect(heroActions).toBeVisible();

    const viewProjects = page.locator('.hero-btn:has-text("View Projects")');
    await expect(viewProjects).toBeVisible();
    await expect(viewProjects).toHaveAttribute('href', '#projects');

    const contactMe = page.locator('.hero-btn--outline:has-text("Contact Me")');
    await expect(contactMe).toBeVisible();
    await expect(contactMe).toHaveAttribute('href', '#contact');
  });

  test('should have profile image', async ({ page }) => {
    const profileImg = page.locator('.profile-img');
    await expect(profileImg).toBeVisible();
    await expect(profileImg).toHaveAttribute('src', /images\/profile1\.jpg/);
  });

  test('should have navigation with all sections', async ({ page }) => {
    const navLinks = page.locator('nav ul li a');
    await expect(navLinks).toHaveCount(5);

    const expectedLinks = ['Projects', 'Experience', 'Skills', 'Academics', 'Contact'];
    for (const text of expectedLinks) {
      await expect(navLinks.filter({ hasText: text })).toBeVisible();
    }
  });

  test('should navigate to sections on nav link click', async ({ page }) => {
    await page.click('nav ul li a:has-text("Projects")');
    await expect(page.locator('#projects')).toBeInViewport();

    await page.click('nav ul li a:has-text("Experience")');
    await expect(page.locator('#experience')).toBeInViewport();

    await page.click('nav ul li a:has-text("Skills")');
    await expect(page.locator('#skills')).toBeInViewport();

    await page.click('nav ul li a:has-text("Academics")');
    await expect(page.locator('#academics')).toBeInViewport();

    await page.click('nav ul li a:has-text("Contact")');
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('should display featured project section', async ({ page }) => {
    const featuredSection = page.locator('#featured');
    await expect(featuredSection).toBeVisible();

    const featuredCard = page.locator('.featured-card');
    await expect(featuredCard).toBeVisible();

    const badge = page.locator('.featured-badge');
    await expect(badge).toHaveText('Featured Project');

    const title = page.locator('.featured-title');
    await expect(title).toHaveText('LumaWall');

    const tagline = page.locator('.featured-tagline');
    await expect(tagline).toContainText('live-wallpaper');
  });

  test('should display featured project with highlights and tech tags', async ({ page }) => {
    const highlights = page.locator('.featured-highlights li');
    const count = await highlights.count();
    expect(count).toBeGreaterThan(0);

    const techTags = page.locator('.featured-card .tech-tag');
    const tagCount = await techTags.count();
    expect(tagCount).toBeGreaterThan(0);

    // Should have GitHub link
    const githubLink = page.locator('.featured-link--github');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', /github\.com/);
    await expect(githubLink).toHaveAttribute('target', '_blank');
  });

  test('should display featured project image', async ({ page }) => {
    const featuredImg = page.locator('.featured-image');
    await expect(featuredImg).toBeVisible();
    await expect(featuredImg).toHaveAttribute('src', /lumawall/);
  });

  test('should display featured project gallery strip', async ({ page }) => {
    const galleryStrip = page.locator('.gallery-strip');
    await expect(galleryStrip).toBeVisible();

    const thumbs = page.locator('.gallery-thumb');
    const thumbCount = await thumbs.count();
    expect(thumbCount).toBeGreaterThan(0);
  });

  test('should display projects section with project cards', async ({ page }) => {
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeVisible();

    const cards = page.locator('.project-card');
    await expect(cards).toHaveCount(3); // Image Viewer, Customer Shopping, Titanic

    // Check first project (Image Viewer)
    const firstCard = cards.first();
    await expect(firstCard.locator('.project-title')).toHaveText('Image Viewer');
    await expect(firstCard.locator('.project-tagline')).toContainText('image management');

    // All cards should have tech tags
    const allTags = page.locator('.project-card .tech-tag');
    const totalTags = await allTags.count();
    expect(totalTags).toBeGreaterThan(0);
  });

  test('should display project card images where available', async ({ page }) => {
    // Shopping Analysis should have an image
    const shoppingCard = page.locator('.project-card:has-text("Customer Shopping")');
    const shoppingImg = shoppingCard.locator('.project-card-image img');
    await expect(shoppingImg).toBeVisible();
    await expect(shoppingImg).toHaveAttribute('src', /power-bi-dashboard/);
  });

  test('should display experience section with Unisys', async ({ page }) => {
    const experienceSection = page.locator('#experience');
    await expect(experienceSection).toBeVisible();

    const expCard = page.locator('.experience-card');
    await expect(expCard).toBeVisible();

    const role = page.locator('.experience-role');
    await expect(role).toHaveText('Software Developer');

    const company = page.locator('.experience-company');
    await expect(company).toHaveText('Unisys');
  });

  test('should display experience highlights and technologies', async ({ page }) => {
    const highlights = page.locator('.experience-highlights li');
    const count = await highlights.count();
    expect(count).toBeGreaterThan(0);

    const techTags = page.locator('.experience-card .tech-tag');
    const tagCount = await techTags.count();
    expect(tagCount).toBeGreaterThan(0);
  });

  test('should display experience screenshots', async ({ page }) => {
    const expImages = page.locator('.experience-image-item');
    const count = await expImages.count();
    expect(count).toBe(4);
  });

  test('should display skills grouped by category', async ({ page }) => {
    const skillsSection = page.locator('#skills');
    await expect(skillsSection).toBeVisible();

    // Should have 5 skill groups
    const groups = page.locator('.skill-group');
    await expect(groups).toHaveCount(5);

    // Check group titles
    const groupTitles = page.locator('.skill-group-title');
    await expect(groupTitles.nth(0)).toHaveText('Frontend & UI');
    await expect(groupTitles.nth(1)).toHaveText('Backend & APIs');
    await expect(groupTitles.nth(2)).toHaveText('Desktop & Systems');
    await expect(groupTitles.nth(3)).toHaveText('Data & Analytics');
    await expect(groupTitles.nth(4)).toHaveText('Dev Tools & Platforms');
  });

  test('should display academics section', async ({ page }) => {
    const academicsSection = page.locator('#academics');
    await expect(academicsSection).toBeVisible();

    await expect(academicsSection.locator('h2')).toHaveText('Academics');
    await expect(academicsSection.locator('p').first()).toContainText('B.Tech in Computer Science Engineering');
    await expect(academicsSection.locator('p').nth(1)).toContainText('Higher Secondary');
    await expect(academicsSection.locator('p').nth(2)).toContainText('Class X');
  });

  test('should display resume section with download link', async ({ page }) => {
    const resumeSection = page.locator('#resume');
    await expect(resumeSection).toBeVisible();

    const downloadBtn = page.locator('.btn[download]');
    await expect(downloadBtn).toBeVisible();
    await expect(downloadBtn).toHaveAttribute('href', /drive\.google\.com/);
  });

  test('should display contact section with aligned buttons', async ({ page }) => {
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();

    const emailLink = page.locator('#contact a:has-text("Email Me")');
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', 'mailto:ayushrana@example.com');
    await expect(emailLink).toHaveAttribute('target', '_blank');

    const linkedinLink = page.locator('#contact a:has-text("Connect on LinkedIn")');
    await expect(linkedinLink).toBeVisible();
    await expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/ayushrana');
    await expect(linkedinLink).toHaveAttribute('target', '_blank');

    const githubLink = page.locator('#contact a:has-text("View GitHub")');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/Ayush-Rana-3000');
    await expect(githubLink).toHaveAttribute('target', '_blank');
  });

  test('should have contact buttons with consistent sizing', async ({ page }) => {
    const buttons = page.locator('#contact a');
    const count = await buttons.count();
    expect(count).toBe(3);

    // All buttons should have min-height for consistent sizing
    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      const minHeight = await btn.evaluate(el => getComputedStyle(el).minHeight);
      expect(parseInt(minHeight)).toBeGreaterThanOrEqual(48);
    }
  });

  test('should have footer with copyright', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.locator('p')).toContainText('Ayush Rana');
    await expect(footer.locator('p')).toContainText('All Rights Reserved');
  });

  test('should have smooth scroll behavior', async ({ page }) => {
    await page.click('nav ul li a:has-text("Contact")');
    await page.waitForTimeout(5000);
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();
  });
});

test.describe('Gallery Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open gallery modal when thumbnail is clicked', async ({ page }) => {
    const thumb = page.locator('.gallery-thumb').first();
    await thumb.click();

    const modal = page.locator('.gallery-modal-overlay.active');
    await expect(modal).toBeVisible();

    const img = page.locator('.gallery-modal-img');
    await expect(img).toBeVisible();
    const src = await img.getAttribute('src');
    expect(src).toBeTruthy();
  });

  test('should close gallery modal with Escape key', async ({ page }) => {
    const thumb = page.locator('.gallery-thumb').first();
    await thumb.click();

    const modal = page.locator('.gallery-modal-overlay.active');
    await expect(modal).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  test('should close gallery modal with close button', async ({ page }) => {
    const thumb = page.locator('.gallery-thumb').first();
    await thumb.click();

    const closeBtn = page.locator('.gallery-modal-close');
    await closeBtn.click();

    const modal = page.locator('.gallery-modal-overlay.active');
    await expect(modal).not.toBeVisible();
  });

  test('should navigate gallery with arrow buttons', async ({ page }) => {
    const thumbs = page.locator('.gallery-thumb');
    const thumbCount = await thumbs.count();
    if (thumbCount < 2) return;

    await thumbs.first().click();

    const nextBtn = page.locator('.gallery-modal-next');
    await nextBtn.click();

    const img = page.locator('.gallery-modal-img');
    const src1 = await img.getAttribute('src');
    await nextBtn.click();
    const src2 = await img.getAttribute('src');
    expect(src1).not.toBe(src2);
  });
});

test.describe('Navigation Hitbox', () => {
  test('should have nav links filling entire button area', async ({ page }) => {
    await page.goto('/');

    const navItems = page.locator('nav ul li');
    const count = await navItems.count();

    for (let i = 0; i < count; i++) {
      const li = navItems.nth(i);
      const anchor = li.locator('a');

      const liBox = await li.boundingBox();
      const anchorBox = await anchor.boundingBox();

      expect(liBox).toBeTruthy();
      expect(anchorBox).toBeTruthy();

      // Anchor should fill the li (allow 2px tolerance for border-radius)
      expect(Math.abs(anchorBox.width - liBox.width)).toBeLessThan(4);
      expect(Math.abs(anchorBox.height - liBox.height)).toBeLessThan(4);
    }
  });
});

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show hamburger menu on mobile', async ({ page }) => {
    const menuToggle = page.locator('.menu-toggle');
    await expect(menuToggle).toBeVisible();
    await expect(menuToggle).toHaveText('☰');
  });

  test('should toggle mobile menu on hamburger click', async ({ page }) => {
    const nav = page.locator('nav ul');
    const menuToggle = page.locator('.menu-toggle');

    await expect(nav).not.toBeVisible();

    await menuToggle.click();
    await expect(nav).toBeVisible();

    await menuToggle.click();
    await expect(nav).not.toBeVisible();
  });

  test('should close mobile menu when nav link is clicked', async ({ page }) => {
    const nav = page.locator('nav ul');
    const menuToggle = page.locator('.menu-toggle');

    await menuToggle.click();
    await expect(nav).toBeVisible();

    await page.click('nav ul li a:has-text("Projects")');
    await expect(nav).not.toBeVisible();
  });

  test('should navigate to sections on mobile', async ({ page }) => {
    const menuToggle = page.locator('.menu-toggle');

    await menuToggle.click();
    await page.click('nav ul li a:has-text("Skills")');

    await expect(page.locator('#skills')).toBeInViewport();
  });
});

test.describe('Responsive Design', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 720 },
  ];

  for (const viewport of viewports) {
    test(`should render correctly on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');

      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewport.width + 20);

      const sections = page.locator('.section');
      await expect(sections.first()).toBeVisible();
    });
  }
});

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    // h2: Featured Project, Projects, Experience, Skills, Academics, Resume, Contact = 7
    const h2s = page.locator('h2');
    await expect(h2s).toHaveCount(7);

    // h3: featured title + 3 project titles + experience role + 5 skill group titles = 10
    const h3s = page.locator('h3');
    const h3Count = await h3s.count();
    expect(h3Count).toBeGreaterThanOrEqual(5);
  });

  test('should have alt text for all images', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('alt');
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt.length).toBeGreaterThan(0);
    }
  });

  test('should have proper link attributes for external links', async ({ page }) => {
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();

    for (let i = 0; i < count; i++) {
      const link = externalLinks.nth(i);
      await expect(link).toHaveAttribute('rel', /noopener|noreferrer/);
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    // Hero CTAs are focusable before nav links in DOM order
    await page.keyboard.press('Tab');
    const heroBtn = page.locator('.hero-btn').first();
    await expect(heroBtn).toBeFocused();

    // Tab through second hero CTA and all 5 nav links
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
    }

    // Last nav link should be focused
    await expect(page.locator('nav ul li a').last()).toBeFocused();

    // Should be able to activate links with Enter
    await page.keyboard.press('Enter');
  });

  test('should have accessible gallery modal', async ({ page }) => {
    const thumb = page.locator('.gallery-thumb').first();
    await thumb.click();

    const modal = page.locator('.gallery-modal-overlay');
    await expect(modal).toHaveAttribute('role', 'dialog');
    await expect(modal).toHaveAttribute('aria-label', 'Screenshot viewer');

    const closeBtn = page.locator('.gallery-modal-close');
    await expect(closeBtn).toHaveAttribute('aria-label', /Close/);
  });
});

test.describe('Performance', () => {
  test('should load within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(5000);
  });

  test('should have optimized images', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const loading = await img.getAttribute('loading');
      if (i > 0) {
        expect(loading).toBe('lazy');
      }
    }
  });
});
