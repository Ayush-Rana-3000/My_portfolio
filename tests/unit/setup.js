import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

// Load the HTML file and set up the DOM
const html = fs.readFileSync(path.resolve('./portfollioi/index.html'), 'utf-8');
const dom = new JSDOM(html, {
  url: 'http://localhost',
  pretendToBeVisual: true,
  resources: 'usable',
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.HTMLElement = dom.window.HTMLElement;
global.Element = dom.window.Element;
global.Node = dom.window.Node;
global.Event = dom.window.Event;
global.CustomEvent = dom.window.CustomEvent;
global.IntersectionObserver = dom.window.IntersectionObserver;
global.requestAnimationFrame = dom.window.requestAnimationFrame;
global.cancelAnimationFrame = dom.window.cancelAnimationFrame;

// Load the project data (data/projects.js)
// Extract the array and parse it directly for JSDOM compatibility.
const projectsDataContent = fs.readFileSync(path.resolve('./portfollioi/data/projects.js'), 'utf-8');
const assignIndex = projectsDataContent.indexOf('window.PORTFOLIO_PROJECTS = ');
if (assignIndex !== -1) {
  const arrayStart = projectsDataContent.indexOf('[', assignIndex);
  const arrayEnd = projectsDataContent.lastIndexOf(']');
  if (arrayStart !== -1 && arrayEnd !== -1) {
    const arrayStr = projectsDataContent.substring(arrayStart, arrayEnd + 1);
    dom.window.PORTFOLIO_PROJECTS = JSON.parse(arrayStr);
  }
}

// Load the experience data (data/experience.js)
const experienceDataContent = fs.readFileSync(path.resolve('./portfollioi/data/experience.js'), 'utf-8');
const expAssignIndex = experienceDataContent.indexOf('window.PORTFOLIO_EXPERIENCE = ');
if (expAssignIndex !== -1) {
  const expArrayStart = experienceDataContent.indexOf('[', expAssignIndex);
  const expArrayEnd = experienceDataContent.lastIndexOf(']');
  if (expArrayStart !== -1 && expArrayEnd !== -1) {
    const expArrayStr = experienceDataContent.substring(expArrayStart, expArrayEnd + 1);
    dom.window.PORTFOLIO_EXPERIENCE = JSON.parse(expArrayStr);
  }
}

// Load the script.js
const scriptContent = fs.readFileSync(path.resolve('./portfollioi/script.js'), 'utf-8');
const script = dom.window.document.createElement('script');
script.textContent = scriptContent;
dom.window.document.body.appendChild(script);