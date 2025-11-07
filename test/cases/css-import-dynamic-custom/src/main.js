import mobileHref from './mobile.css?rawurl';
import desktopHref from './desktop.css?rawurl';

/**
 * Your custom dynamic CSS loader.
 *
 * @param {string} href
 */
function loadCss(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

let isMobile = false;
let isDesktop = true;

if (isMobile) {
  loadCss(mobileHref);
}

if (isDesktop) {
  loadCss(desktopHref);
}

console.log('main', { isMobile, isDesktop });