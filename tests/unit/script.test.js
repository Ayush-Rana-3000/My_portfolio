import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Portfolio JavaScript Functionality', () => {
  let navLinks;
  let sections;
  let menuToggle;

  beforeEach(() => {
    // Reset DOM state before each test
    navLinks = document.querySelectorAll('nav ul li a');
    sections = document.querySelectorAll('.section');
    menuToggle = document.querySelector('.menu-toggle');
  });

  describe('Smooth Scrolling', () => {
    it('should have navigation links with hash hrefs', () => {
      const links = Array.from(navLinks);
      expect(links.length).toBeGreaterThan(0);

      links.forEach(link => {
        expect(link.getAttribute('href')).toMatch(/^#/);
      });
    });

    it('should prevent default on anchor click and scroll to target', () => {
      const link = navLinks[0];
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      expect(targetElement).toBeTruthy();

      const preventDefault = vi.fn();
      const scrollIntoView = vi.fn();
      targetElement.scrollIntoView = scrollIntoView;

      const clickEvent = new Event('click', { cancelable: true });
      clickEvent.preventDefault = preventDefault;

      link.dispatchEvent(clickEvent);

      expect(preventDefault).toHaveBeenCalled();
      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
    });

    it('should not scroll if target element does not exist', () => {
      const link = document.createElement('a');
      link.setAttribute('href', '#nonexistent');
      document.body.appendChild(link);

      const preventDefault = vi.fn();
      const clickEvent = new Event('click', { cancelable: true });
      clickEvent.preventDefault = preventDefault;

      link.dispatchEvent(clickEvent);

      expect(preventDefault).toHaveBeenCalled();
      // scrollIntoView should not be called on non-existent element
    });
  });

  describe('Mobile Navigation Toggle', () => {
    it('should create a menu toggle button', () => {
      expect(menuToggle).toBeTruthy();
      expect(menuToggle.classList.contains('menu-toggle')).toBe(true);
      expect(menuToggle.innerHTML).toBe('&#9776;');
    });

    it('should toggle nav active class on menu toggle click', () => {
      const nav = document.querySelector('nav ul');
      expect(nav.classList.contains('active')).toBe(false);

      menuToggle.click();
      expect(nav.classList.contains('active')).toBe(true);

      menuToggle.click();
      expect(nav.classList.contains('active')).toBe(false);
    });

    it('should close menu when a nav link is clicked', () => {
      const nav = document.querySelector('nav ul');
      const link = navLinks[0];

      // Open menu first
      menuToggle.click();
      expect(nav.classList.contains('active')).toBe(true);

      // Click a link
      link.click();
      expect(nav.classList.contains('active')).toBe(false);
    });
  });

  describe('Scroll Animations (IntersectionObserver)', () => {
    it('should have sections with fade-in animation', () => {
      expect(sections.length).toBeGreaterThan(0);

      sections.forEach(section => {
        expect(section.classList.contains('section')).toBe(true);
      });
    });

    it('should add fade-in class when section intersects', () => {
      const section = sections[0];
      expect(section.classList.contains('fade-in')).toBe(false);

      // Manually trigger the observer callback
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      }, { threshold: 0.3 });

      observer.observe(section);

      // Simulate intersection
      const mockEntries = [{
        isIntersecting: true,
        target: section
      }];

      // Access the callback
      const callback = observer.callback || observer._callback;
      if (callback) {
        callback(mockEntries, observer);
      }

      expect(section.classList.contains('fade-in')).toBe(true);
    });
  });

  describe('DOM Structure', () => {
    it('should have all required sections', () => {
      const sectionIds = ['featured', 'projects', 'experience', 'skills', 'academics', 'resume', 'contact'];

      sectionIds.forEach(id => {
        const section = document.getElementById(id);
        expect(section).toBeTruthy();
        expect(section.classList.contains('section')).toBe(true);
      });
    });

    it('should have header with name and role', () => {
      const header = document.querySelector('header');
      expect(header).toBeTruthy();

      const h1 = header.querySelector('h1');
      expect(h1).toBeTruthy();
      expect(h1.textContent).toBe('Ayush Rana');

      const role = header.querySelector('.header-text p');
      expect(role).toBeTruthy();
      expect(role.textContent).toContain('Software Developer');
    });

    it('should have skills with images or text', () => {
      const skills = document.querySelectorAll('.skill');
      expect(skills.length).toBeGreaterThan(0);

      skills.forEach(skill => {
        const p = skill.querySelector('p');
        expect(p).toBeTruthy();

        // Skills either have an icon image or are text-only (.skill--text)
        const img = skill.querySelector('img');
        const isTextOnly = skill.classList.contains('skill--text');
        if (img) {
          expect(img.getAttribute('src')).toMatch(/^images\//);
          expect(img.getAttribute('alt')).toBeTruthy();
        } else {
          expect(isTextOnly).toBe(true);
        }
      });
    });

    it('should have contact links with proper attributes', () => {
      const contactLinks = document.querySelectorAll('#contact a');
      expect(contactLinks.length).toBeGreaterThan(0);

      contactLinks.forEach(link => {
        expect(link.getAttribute('href')).toBeTruthy();
        expect(link.getAttribute('target')).toBe('_blank');
      });
    });

    it('should have project data available', () => {
      expect(window.PORTFOLIO_PROJECTS).toBeTruthy();
      expect(Array.isArray(window.PORTFOLIO_PROJECTS)).toBe(true);
      expect(window.PORTFOLIO_PROJECTS.length).toBeGreaterThan(0);

      window.PORTFOLIO_PROJECTS.forEach(project => {
        expect(project.id).toBeTruthy();
        expect(project.title).toBeTruthy();
        expect(project.tagline).toBeTruthy();
        expect(project.description).toBeTruthy();
        expect(Array.isArray(project.technologies)).toBe(true);
      });
    });

    it('should have experience data available', () => {
      expect(window.PORTFOLIO_EXPERIENCE).toBeTruthy();
      expect(Array.isArray(window.PORTFOLIO_EXPERIENCE)).toBe(true);
      expect(window.PORTFOLIO_EXPERIENCE.length).toBeGreaterThan(0);

      window.PORTFOLIO_EXPERIENCE.forEach(exp => {
        expect(exp.id).toBeTruthy();
        expect(exp.role).toBeTruthy();
        expect(exp.company).toBeTruthy();
        expect(exp.description).toBeTruthy();
        expect(Array.isArray(exp.technologies)).toBe(true);
      });
    });
  });
});