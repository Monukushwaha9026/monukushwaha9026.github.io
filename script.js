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

    // Always start immediately from the top on desktop and mobile
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
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

  // 4. Dynamic Sticky Title Offset for Mobile
  function updateStickyOffset() {
    if (window.innerWidth <= 960) {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        document.documentElement.style.setProperty('--mobile-sidebar-height', `${sidebar.offsetHeight}px`);
      }
    } else {
      document.documentElement.style.setProperty('--mobile-sidebar-height', '0px');
    }
  }

  updateStickyOffset();
  window.addEventListener('resize', updateStickyOffset);
});
