// Navigation system for yuebo's playground
(function() {
    'use strict';
  
    // Configuration - update this when you add new days
    const DAYS = [
      { num: 1, name: 'Day 1', path: 'days/day_one/index.html' },
      { num: 2, name: 'Day 2', path: 'days/day_two/index.html' },
      { num: 3, name: 'Day 3', path: 'days/day_three/index.html' },
      { num: 4, name: 'Day 4', path: 'days/day_four/index.html' },
      { num: 5, name: 'Day 5', path: 'days/day_five/index.html' },
      { num: 6, name: 'Day 6', path: 'days/day_six/index.html' },
      { num: 7, name: 'Day 7', path: 'days/day_seven/index.html' },
      { num: 8, name: 'Day 8', path: 'days/day_eight/index.html' },
      { num: 9, name: 'Day 9', path: 'days/day_nine/index.html' }
    ];
  
    // Detect current page
    function getCurrentDay() {
      const path = window.location.pathname;
      const match = path.match(/day_(\w+)/);
      if (match) {
        const dayName = match[1];
        return DAYS.find(day => day.path.includes(`day_${dayName}`));
      }
      return null;
    }
  
    // Get relative path to root
    function getRootPath() {
      const path = window.location.pathname;
      const depth = (path.match(/\//g) || []).length - 1; // -1 for leading /
      if (depth <= 1) return './';
      return '../'.repeat(depth - 1);
    }
  
    // Create navigation HTML
    function createNav() {
      const currentDay = getCurrentDay();
      const rootPath = getRootPath();
      const currentIndex = currentDay ? DAYS.findIndex(d => d.num === currentDay.num) : -1;
      
      const prevDay = currentIndex > 0 ? DAYS[currentIndex - 1] : null;
      const nextDay = currentIndex >= 0 && currentIndex < DAYS.length - 1 ? DAYS[currentIndex + 1] : null;
  
      let navHTML = '<nav class="yuebo-nav" id="yuebo-nav">';
      
      // Home link
      navHTML += `<a href="${rootPath}index.html" class="nav-home">Home</a>`;
      
      // Previous/Next navigation
      if (prevDay || nextDay) {
        navHTML += '<div class="nav-adjacent">';
        if (prevDay) {
          navHTML += `<a href="${rootPath}${prevDay.path}" class="nav-prev">← ${prevDay.name}</a>`;
        }
        if (nextDay) {
          navHTML += `<a href="${rootPath}${nextDay.path}" class="nav-next">${nextDay.name} →</a>`;
        }
        navHTML += '</div>';
      }
      
      // All days menu (collapsible)
      navHTML += '<div class="nav-menu">';
      navHTML += '<button class="nav-toggle" aria-label="Toggle menu">☰</button>';
      navHTML += '<ul class="nav-days">';
      DAYS.forEach(day => {
        const isActive = currentDay && day.num === currentDay.num ? ' active' : '';
        navHTML += `<li><a href="${rootPath}${day.path}" class="nav-day${isActive}">${day.name}</a></li>`;
      });
      navHTML += '</ul>';
      navHTML += '</div>';
      
      navHTML += '</nav>';
      
      return navHTML;
    }
  
    // Inject navigation when DOM is ready
    function init() {
      // Create nav element
      const nav = document.createElement('div');
      nav.innerHTML = createNav();
      document.body.appendChild(nav.firstElementChild);
  
      // Toggle menu functionality
      const toggle = document.querySelector('.nav-toggle');
      const menu = document.querySelector('.nav-days');
      if (toggle && menu) {
        toggle.addEventListener('click', function() {
          menu.classList.toggle('open');
          toggle.classList.toggle('open');
        });
      }
  
      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (menu && !nav.contains(e.target) && menu.classList.contains('open')) {
          menu.classList.remove('open');
          if (toggle) toggle.classList.remove('open');
        }
      });
    }
  
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();