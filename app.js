/**
 * Shafin Shahriar Akhond — v2 Portfolio JS
 * Nav, cursor glow, scroll progress, back-to-top, fade-in fallback,
 * Skill Playground (category switching + modal), Blog (search + filter),
 * Active nav highlighting
 */

(function () {
  'use strict';

  /* ===== Lucide Icons ===== */
  function initIcons() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
  initIcons();

  /* ===== Helpers ===== */
  const $ = (s, p) => (p || document).querySelector(s);
  const $$ = (s, p) => [...(p || document).querySelectorAll(s)];

  /* ===== Mobile Nav Toggle ===== */
  const navToggle = $('.nav__toggle');
  const navLinks = $('.nav__links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    $$('a', navLinks).forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ===== Scroll-Aware Nav ===== */
  const nav = $('.nav');
  let lastScrollY = 0;
  let scrollTicking = false;

  function updateNav() {
    const y = window.scrollY;
    if (y > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    if (y > lastScrollY && y > 120) {
      nav.classList.add('nav--hidden');
    } else {
      nav.classList.remove('nav--hidden');
    }
    lastScrollY = y;
    scrollTicking = false;
  }

  /* ===== Scroll Progress ===== */
  const scrollProg = $('.scroll-prog');

  function updateScrollProgress() {
    const top = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollProg) scrollProg.style.width = (h > 0 ? (top / h) * 100 : 0) + '%';
  }

  /* ===== Back to Top ===== */
  const btt = $('.btt');

  function updateBTT() {
    if (btt) {
      btt.classList.toggle('visible', window.scrollY > 500);
    }
  }

  if (btt) {
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ===== Active Nav Highlighting ===== */
  const sections = $$('section[id]');
  const navAnchors = $$('.nav__links a[href^="#"]');

  function highlightNav() {
    const scrollY = window.scrollY + 200;
    let currentId = '';
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop) currentId = sec.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    });
  }

  /* ===== Combined Scroll Handler ===== */
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateNav();
        updateScrollProgress();
        updateBTT();
        highlightNav();
      });
      scrollTicking = true;
    }
  }, { passive: true });

  /* ===== Cursor Glow (desktop) ===== */
  const glow = $('.cursor-glow');
  if (glow && window.matchMedia('(hover:hover)').matches) {
    let mx = 0, my = 0, gx = 0, gy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    (function tick() {
      gx += (mx - gx) * 0.07;
      gy += (my - gy) * 0.07;
      glow.style.left = gx + 'px';
      glow.style.top = gy + 'px';
      requestAnimationFrame(tick);
    })();
  }

  /* ===== Smooth Scroll Anchors ===== */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = $(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ===== Fade-In Fallback ===== */
  if (!CSS.supports('animation-timeline', 'scroll()')) {
    const fadeEls = $$('.fi');
    if ('IntersectionObserver' in window && fadeEls.length) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      fadeEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        obs.observe(el);
      });
    }
  }

  /* ===== SKILL PLAYGROUND — Category Switching ===== */
  const catBtns = $$('.skill-pg__cat');
  const panels = $$('.skill-pg__panel');

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;
      catBtns.forEach(b => b.classList.toggle('active', b === btn));
      panels.forEach(p => {
        const isTarget = p.id === 'panel-' + cat;
        p.classList.toggle('active', isTarget);
      });
      // Re-init any new lucide icons inside newly-active panel
      initIcons();
    });
  });

  /* ===== SKILL MODAL — Content Data ===== */
  const skillData = {
    // Marketing
    'campaign-strategy': {
      title: 'Campaign Strategy',
      sections: [
        { heading: 'What I Do', text: 'Plan and execute end-to-end marketing campaigns — from creative briefing to on-ground activation. At Nestlé, I managed the MAGGI Hot & Spicy Blast campaign and supported the MAGGI Fried Chicken Noodles launch.' },
        { heading: 'Real Application', text: 'Coordinated with creative agencies, aligned brand messaging across channels, developed timelines, and tracked campaign KPIs throughout the activation cycle.' },
        { heading: 'Tools & Frameworks', tags: ['Campaign Planning', 'Agency Coordination', 'Media Briefing', 'Performance Tracking', 'Cross-Functional Alignment'] }
      ]
    },
    'consumer-insights': {
      title: 'Consumer Insights',
      sections: [
        { heading: 'What I Do', text: 'Extract actionable insights from consumer behavior data and market research. At Remark HB, I conducted consumer insight research and compiled structured feedback reports.' },
        { heading: 'Real Application', text: 'Developed consumer feedback frameworks, analyzed purchase patterns, and translated raw data into strategic recommendations for the marketing team.' },
        { heading: 'Tools & Frameworks', tags: ['Consumer Research', 'Feedback Analysis', 'Survey Design', 'Behavioral Insights', 'Market Trends'] }
      ]
    },
    'brand-positioning': {
      title: 'Brand Positioning',
      sections: [
        { heading: 'What I Do', text: 'Develop brand identity frameworks and competitive positioning strategies. At Nestlé, I contributed to brand health tracking and positioning analysis for MAGGI.' },
        { heading: 'Real Application', text: 'Analyzed competitive landscape, tracked brand perception across regions, and supported positioning adjustments based on market share and consumer sentiment data.' },
        { heading: 'Tools & Frameworks', tags: ['Brand Equity', 'Competitive Analysis', 'Perceptual Mapping', 'Brand Health', 'Market Share Analysis'] }
      ]
    },
    'market-analysis': {
      title: 'Market Analysis',
      sections: [
        { heading: 'What I Do', text: 'Identify market trends, opportunities, and competitive gaps through structured research and data analysis.' },
        { heading: 'Real Application', text: 'At Remark HB, I executed market analysis to identify emerging trends and supported data-driven marketing planning. At Startup Bangladesh, I researched the startup ecosystem landscape.' },
        { heading: 'Tools & Frameworks', tags: ['Trend Analysis', 'Competitive Intelligence', 'Market Sizing', 'SWOT', 'Industry Research'] }
      ]
    },

    // Excel
    'data-cleaning': {
      title: 'Data Cleaning',
      sections: [
        { heading: 'What I Do', text: 'Prepare and structure raw data for reliable analysis — removing duplicates, handling missing values, standardizing formats, and validating data integrity.' },
        { heading: 'Real Application', text: 'At Nestlé, I cleaned and structured sales data from multiple regional sources to create unified datasets for brand health dashboards.' },
        { heading: 'Tools & Frameworks', tags: ['Data Validation', 'Text-to-Columns', 'TRIM/CLEAN Functions', 'Conditional Formatting', 'Power Query'] }
      ]
    },
    'pivot-tables': {
      title: 'Pivot Tables',
      sections: [
        { heading: 'What I Do', text: 'Build dynamic pivot analyses that summarize complex datasets into actionable views — slicing data by region, product, time period, and performance metrics.' },
        { heading: 'Real Application', text: 'Created pivot-based reports at Nestlé to track MAGGI campaign performance across regions, enabling the brand team to quickly identify top and underperforming areas.' },
        { heading: 'Tools & Frameworks', tags: ['Pivot Tables', 'Slicers', 'Calculated Fields', 'Data Grouping', 'Cross-Tabulation'] }
      ]
    },
    'excel-dashboards': {
      title: 'Excel Dashboards',
      sections: [
        { heading: 'What I Do', text: 'Build interactive visual dashboards in Excel to monitor KPIs, sales trends, and campaign performance — making data accessible for non-technical stakeholders.' },
        { heading: 'Real Application', text: 'Built Excel-based trackers and dashboards at Nestlé that the MAGGI brand team used for weekly performance reviews and quarterly business reporting.' },
        { heading: 'Tools & Frameworks', tags: ['Dashboard Design', 'Chart Selection', 'Conditional Formatting', 'Data Validation', 'Dynamic Ranges'] }
      ]
    },
    'financial-analysis': {
      title: 'Financial Analysis',
      sections: [
        { heading: 'What I Do', text: 'Model and track financial KPIs, budgets, and performance metrics using structured Excel workflows.' },
        { heading: 'Real Application', text: 'Applied financial analysis skills during BBA coursework and leadership of BUP Finance Society — managing event budgets, sponsorship tracking, and cost analysis for Capitalizer.' },
        { heading: 'Tools & Frameworks', tags: ['Budget Modeling', 'KPI Dashboards', 'Variance Analysis', 'Financial Forecasting', 'Cost Tracking'] }
      ]
    },

    // Power BI
    'dashboard-design': {
      title: 'Dashboard Design',
      sections: [
        { heading: 'What I Do', text: 'Design intuitive, insight-rich visual dashboards that connect data to decisions — prioritizing clarity, hierarchy, and actionable metrics.' },
        { heading: 'Real Application', text: 'Applied dashboard design principles from Excel experience and ongoing Power BI training to create stakeholder-ready reporting views.' },
        { heading: 'Tools & Frameworks', tags: ['Layout Design', 'Visual Hierarchy', 'KPI Cards', 'Drill-Through', 'Mobile-Optimized Views'] }
      ]
    },
    'data-viz': {
      title: 'Data Visualization',
      sections: [
        { heading: 'What I Do', text: 'Translate complex data into clear visual stories using the right chart types, color encoding, and annotation to guide the viewer\'s understanding.' },
        { heading: 'Real Application', text: 'Applied data visualization principles across Excel dashboards at Nestlé and BUP Finance Society reporting, selecting appropriate chart types for different data stories.' },
        { heading: 'Tools & Frameworks', tags: ['Chart Selection', 'Color Theory', 'Data Storytelling', 'Annotation', 'Interactive Filters'] }
      ]
    },
    'biz-reporting': {
      title: 'Business Reporting',
      sections: [
        { heading: 'What I Do', text: 'Build structured reports that connect operational data to strategic business decisions — automated where possible, always stakeholder-focused.' },
        { heading: 'Real Application', text: 'At Startup Bangladesh, supported the 2023 Annual Report by gathering data from 50+ startup CEOs and structuring it into a comprehensive ecosystem report.' },
        { heading: 'Tools & Frameworks', tags: ['Report Templates', 'Automated Refresh', 'Stakeholder Alignment', 'Executive Summary', 'Data Governance'] }
      ]
    },
    'kpi-tracking': {
      title: 'KPI Tracking',
      sections: [
        { heading: 'What I Do', text: 'Monitor key performance indicators in real-time — setting up tracking systems that surface trends, anomalies, and opportunities for action.' },
        { heading: 'Real Application', text: 'At Nestlé, built KPI tracking dashboards monitoring campaign performance, sales trends, and brand health metrics across key regions.' },
        { heading: 'Tools & Frameworks', tags: ['KPI Definition', 'Threshold Alerts', 'Trend Analysis', 'Benchmarking', 'Performance Review'] }
      ]
    },

    // Analytics
    'data-analysis': {
      title: 'Data Analysis',
      sections: [
        { heading: 'What I Do', text: 'Analyze datasets to find patterns, trends, and anomalies — turning raw numbers into business understanding through structured analytical approaches.' },
        { heading: 'Real Application', text: 'At Nestlé, analyzed sales and market share data across regions to generate strategic insights for the MAGGI brand team.' },
        { heading: 'Tools & Frameworks', tags: ['Exploratory Analysis', 'Statistical Methods', 'Pattern Recognition', 'Segmentation', 'Excel & Python'] }
      ]
    },
    'problem-solving': {
      title: 'Problem Solving',
      sections: [
        { heading: 'What I Do', text: 'Apply structured approaches to business challenges — breaking complex problems into components, gathering evidence, and building actionable solutions.' },
        { heading: 'Real Application', text: 'Led problem-solving across BUP Finance Society operations — from securing sponsorships under tight deadlines to managing cross-functional teams for Capitalizer.' },
        { heading: 'Tools & Frameworks', tags: ['First Principles', 'Root Cause Analysis', 'Framework Thinking', 'Hypothesis Testing', 'Decision Trees'] }
      ]
    },
    'strategic-insights': {
      title: 'Strategic Insights',
      sections: [
        { heading: 'What I Do', text: 'Turn data into actionable business recommendations — connecting analytical findings to strategic decisions that drive measurable outcomes.' },
        { heading: 'Real Application', text: 'Transformed raw brand health and sales data at Nestlé into strategic insights that informed regional marketing decisions and campaign optimization.' },
        { heading: 'Tools & Frameworks', tags: ['Insight Synthesis', 'Strategic Frameworks', 'Data-Driven Decisions', 'Stakeholder Communication', 'Action Planning'] }
      ]
    },
    'decision-support': {
      title: 'Decision Support',
      sections: [
        { heading: 'What I Do', text: 'Provide analytical frameworks that help leadership make informed decisions — structuring information to reduce ambiguity and highlight trade-offs.' },
        { heading: 'Real Application', text: 'Supported decision-making at Startup Bangladesh by coordinating research and documentation for the investment team, helping evaluate startup funding proposals.' },
        { heading: 'Tools & Frameworks', tags: ['Decision Matrices', 'Cost-Benefit Analysis', 'Risk Assessment', 'Scenario Planning', 'Stakeholder Mapping'] }
      ]
    }
  };

  /* ===== SKILL MODAL — Open / Close / Render ===== */
  const modal = $('#skillModal');
  const modalTitle = $('#modalTitle');
  const modalContent = $('#modalContent');
  const modalClose = $('.skill-modal__close');
  const modalBg = $('.skill-modal__bg');

  function openSkillModal(skillKey) {
    const data = skillData[skillKey];
    if (!data || !modal) return;

    modalTitle.textContent = data.title;
    modalContent.innerHTML = data.sections.map(sec => {
      if (sec.tags) {
        return `<div class="skill-modal__section">
          <div class="skill-modal__section-title">${sec.heading}</div>
          <div class="skill-modal__tags">${sec.tags.map(t => `<span class="skill-modal__tag">${t}</span>`).join('')}</div>
        </div>`;
      }
      return `<div class="skill-modal__section">
        <div class="skill-modal__section-title">${sec.heading}</div>
        <p>${sec.text}</p>
      </div>`;
    }).join('');

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeSkillModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeSkillModal);
  if (modalBg) modalBg.addEventListener('click', closeSkillModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSkillModal(); });

  // Delegate click on skill items
  $$('.skill-pg__item').forEach(item => {
    item.addEventListener('click', () => {
      openSkillModal(item.dataset.skill);
    });
  });

  /* ===== BLOG — Category Filtering ===== */
  const blogFilters = $$('.blog__filter');
  const blogCards = $$('.blog__card');
  const blogFeatured = $('.blog__featured');
  const blogSearch = $('#blogSearch');

  function filterBlog() {
    const activeFilter = $('.blog__filter.active');
    const filterVal = activeFilter ? activeFilter.dataset.filter : 'all';
    const query = blogSearch ? blogSearch.value.toLowerCase().trim() : '';

    // Filter cards
    blogCards.forEach(card => {
      const cat = card.dataset.category || '';
      const text = card.textContent.toLowerCase();
      const matchesCat = filterVal === 'all' || cat === filterVal;
      const matchesSearch = !query || text.includes(query);
      card.style.display = (matchesCat && matchesSearch) ? '' : 'none';
    });

    // Filter featured article
    if (blogFeatured) {
      const featCat = blogFeatured.dataset.category || '';
      const featText = blogFeatured.textContent.toLowerCase();
      const matchesCat = filterVal === 'all' || featCat === filterVal;
      const matchesSearch = !query || featText.includes(query);
      blogFeatured.style.display = (matchesCat && matchesSearch) ? '' : 'none';
    }
  }

  blogFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      blogFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterBlog();
    });
  });

  if (blogSearch) {
    let debounce;
    blogSearch.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(filterBlog, 200);
    });
  }

  /* ===== Initial State ===== */
  updateNav();
  updateScrollProgress();
  updateBTT();
  highlightNav();

})();
