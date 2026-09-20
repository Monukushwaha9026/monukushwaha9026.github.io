/**
 * Minimal Portfolio Interaction Scripts
 * Left Sidebar Navigation & Dynamic Tab Switching
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const yearSpan = document.getElementById('yearSpan');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Tab Navigation
  const navItems = document.querySelectorAll('.nav-item');
  const tabPanes = document.querySelectorAll('.tab-pane');

  function activateTab(tabId) {
    // Update nav buttons
    navItems.forEach(item => {
      if (item.dataset.tab === tabId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update tab panes
    tabPanes.forEach(pane => {
      if (pane.id === `section-${tabId}`) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // Update window hash without jump
    history.replaceState(null, null, `#${tabId}`);

    // Scroll to top of content area on mobile
    if (window.innerWidth <= 960) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Bind click on sidebar nav items
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabId = item.dataset.tab;
      activateTab(tabId);
    });
  });

  // Global helper for in-page links (e.g., "View All Projects →")
  window.switchTab = function(tabId) {
    activateTab(tabId);
  };

  // 3. Handle Initial Hash on Load
  const initialHash = window.location.hash.replace('#', '');
  const validTabs = ['profile', 'projects', 'skills', 'learning'];
  if (initialHash && validTabs.includes(initialHash)) {
    activateTab(initialHash);
  }
});
