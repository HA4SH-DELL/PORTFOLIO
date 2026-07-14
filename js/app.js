/**
 * Harsh — Personal Portfolio Interactive Engine
 * B.Tech III Year • Full-Stack & Backend Engineer
 */

document.addEventListener('DOMContentLoaded', () => {
  // Splash Screen Logic
  createSplashParticles();
  
  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.classList.add('hidden');
      // Remove it from DOM completely after fade out to avoid blocking clicks
      setTimeout(() => splash.remove(), 1000);
    }
  }, 3000);

  initScrollFollowingRoadmap();
  initLiveBackendCLI();
  initMagneticButtons();
  initBackgroundSpotlight();
  initInteractiveProfileCard();
  initHeaderScroll();
  initScrollReveal();
  initProjectFilter();
  initCaseStudyModal();
  initContactActions();
  
  // Premium Animations
  initCardGlowTracking();
  initAdvancedMagneticNodes();
  initCinematicTextReveal();
  initParallaxDepthScrolling();
});

/* =========================================================================
   1. Interactive Background Cursor Torch / Spotlight
   ========================================================================= */
function initBackgroundSpotlight() {
  if (window.innerWidth < 768) return; // Disable on mobile to fix lag

  const spotlight = document.getElementById('ambient-spotlight');
  if (!spotlight) return;

  let spotX = window.innerWidth / 2;
  let spotY = window.innerHeight / 2;
  let targetX = spotX;
  let targetY = spotY;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  const animateSpot = () => {
    spotX += (targetX - spotX) * 0.12;
    spotY += (targetY - spotY) * 0.12;
    spotlight.style.transform = `translate3d(${spotX}px, ${spotY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animateSpot);
  };
  requestAnimationFrame(animateSpot);
}

/* =========================================================================
   1. Interactive 3D Magnetic Profile Card
   ========================================================================= */
function initInteractiveProfileCard() {
  const card = document.getElementById('interactive-profile-card');
  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

/* =========================================================================
   2. Header Navigation & Active Links
   ========================================================================= */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Add frosted glass background when not at top
    if (currentScrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide header on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 150) {
      header.classList.add('header-hidden');
    } else if (currentScrollY < lastScrollY) {
      header.classList.remove('header-hidden');
    }

    lastScrollY = currentScrollY;
  });
}

/* =========================================================================
   3. Staggered Scroll Reveal Animations
   ========================================================================= */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach((el) => observer.observe(el));
}

/* =========================================================================
   4. Project Category Filtering
   ========================================================================= */
function initProjectFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* =========================================================================
   5. Case Study Modal Drawer
   ========================================================================= */
const caseStudies = {
  'minima-sneakers': {
    title: 'MINIMA Premium Footwear',
    subtitle: 'A sleek, modern e-commerce platform for premium sneakers featuring dynamic cart state, responsive product galleries, and a high-performance frontend.',
    img: 'assets/images/minima-cover.png',
    metrics: [
      { num: 'Live URL', label: 'DEPLOYMENT' },
      { num: 'React & Vite', label: 'FRONTEND STACK' },
      { num: 'TailwindCSS', label: 'STYLING' }
    ],
    problem: 'Needed a hyper-fast, beautiful e-commerce interface to showcase premium sneaker drops with high-res imagery without sacrificing load times.',
    solution: 'Engineered a modern React front-end optimized with Vite build tools, leveraging TailwindCSS for fluid responsive design and a custom cart state management system. View live: <a href="https://ha4sh-dell.github.io/SNEAKER-BRAND/" target="_blank" style="color:var(--accent-gold);text-decoration:underline;">https://ha4sh-dell.github.io/SNEAKER-BRAND/</a>'
  },
  'ajwa-restaurant': {
    title: 'AJWA Restaurant Web Experience',
    subtitle: 'A visually stunning, fully responsive dining platform featuring elegant menus, booking integration, and high-end aesthetics.',
    img: 'assets/images/ajwa-cover.png',
    metrics: [
      { num: 'Responsive', label: 'DESIGN' },
      { num: 'Interactive', label: 'UI/UX' },
      { num: 'Live URL', label: 'DEPLOYED' }
    ],
    problem: 'The restaurant required a premium digital presence that matched their real-world aesthetic, while ensuring mobile responsiveness for on-the-go diners.',
    solution: 'Engineered a highly polished frontend using modern HTML5/CSS3 and JavaScript, focusing on smooth scroll animations, aesthetic layout, and fast load times. View live: <a href="https://ha4sh-dell.github.io/AJWA-RESTAURANT/" target="_blank" style="color:var(--accent-gold);text-decoration:underline;">https://ha4sh-dell.github.io/AJWA-RESTAURANT/</a>'
  },
  'flowlist-app': {
    title: 'FlowList Productivity App',
    subtitle: 'A seamless, state-driven productivity application designed to manage workflows, tasks, and schedules with blazing fast performance.',
    img: 'assets/images/flowlist-cover.png',
    metrics: [
      { num: 'React', label: 'FRAMEWORK' },
      { num: 'Pages', label: 'CLOUDFLARE' },
      { num: 'Stateful', label: 'DATA FLOW' }
    ],
    problem: 'Users needed a friction-free, instantaneous task management application that could run smoothly directly from the browser.',
    solution: 'Built a robust single-page application using React.js with precise state management, deployed securely and rapidly via Cloudflare Pages. Launch App: <a href="https://flowlist-at6.pages.dev" target="_blank" style="color:var(--accent-gold);text-decoration:underline;">https://flowlist-at6.pages.dev</a>'
  }
};

function initCaseStudyModal() {
  const modal = document.getElementById('case-study-modal');
  const closeBtn = document.getElementById('close-modal-btn');
  const cards = document.querySelectorAll('.project-card');

  if (!modal || !closeBtn) return;

  const openModal = (id) => {
    const data = caseStudies[id];
    if (!data) return;

    document.getElementById('drawer-img').src = data.img;
    document.getElementById('drawer-title').textContent = data.title;
    document.getElementById('drawer-subtitle').textContent = data.subtitle;
    document.getElementById('drawer-problem').textContent = data.problem;
    document.getElementById('drawer-solution').textContent = data.solution;

    const metricsContainer = document.getElementById('drawer-metrics');
    metricsContainer.innerHTML = data.metrics.map(m => `
      <div class="drawer-metric-card">
        <div style="font-family: var(--font-serif); font-size: 1.8rem; font-weight: 700; color: var(--text-primary);">${m.num}</div>
        <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-secondary);">${m.label}</div>
      </div>
    `).join('');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-project-id');
      openModal(id);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

/* =========================================================================
   6. Contact Actions & Toast Notification
   ========================================================================= */
function showToast(message = 'Action completed successfully!') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast) return;

  toastMsg.textContent = message;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 3500);
}

function initContactActions() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('email-text');

  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailText.textContent.trim());
      showToast('Copied email to clipboard!');
    });
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Message sent! Harsh Solanki will get back to you soon.');
      form.reset();
    });
  }
}

/* =========================================================================
   7. Ambient Interactive Floating Particles & Constellation Mesh
   ========================================================================= */
function initAmbientParticles() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let mouse = { x: -1000, y: -1000 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  const numParticles = Math.min(Math.floor((width * height) / 15000), 55);
  const particles = [];
  const normalPalette = ['rgba(255, 255, 255, 0.8)', 'rgba(184, 151, 72, 0.85)'];

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2.2 + 1.2,
      color: normalPalette[i % normalPalette.length]
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Mouse interactive drift
      let dx = mouse.x - p.x;
      let dy = mouse.y - p.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150 && dist > 0) {
        p.x -= (dx / dist) * 1.0;
        p.y -= (dy / dist) * 1.0;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();

      // Constellation lines
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
        if (d < 140) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${(1 - d / 140) * 0.28})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* =========================================================================
   8. Live Interactive Backend CLI Terminal Emulator
   ========================================================================= */
function initLiveBackendCLI() {
  const outputBox = document.getElementById('cli-log-output');
  const buttons = document.querySelectorAll('.cli-cmd-btn');
  if (!outputBox) return;

  const appendLog = (time, tagClass, tagText, message) => {
    const line = document.createElement('div');
    line.className = 'cli-line';
    line.innerHTML = `
      <span class="cli-time">[${time}]</span>
      <span class="${tagClass}">${tagText}</span>
      <span>${message}</span>
    `;
    outputBox.appendChild(line);
    outputBox.scrollTop = outputBox.scrollHeight;
  };

  const bootSequence = [
    { delay: 150, time: '0.002s', tag: 'cli-tag-gold', tagText: 'BOOT', msg: '⚡ Booting Harsh Solanki Backend Engine v3.4...' },
    { delay: 450, time: '0.014s', tag: 'cli-tag-ok', tagText: 'OK', msg: 'Connected to PostgreSQL Distributed Cluster (Primary + 2 Replicas)' },
    { delay: 850, time: '0.021s', tag: 'cli-tag-ok', tagText: 'OK', msg: 'Initialized Redis Distributed Lock & Read-Through Cache [Throughput: 45,000 QPS]' },
    { delay: 1250, time: '0.029s', tag: 'cli-tag-info', tagText: 'INFO', msg: 'gRPC Microservices Gateway Listening on :50051 & HTTPS :443' },
    { delay: 1650, time: '0.033s', tag: 'cli-tag-ok', tagText: 'READY', msg: '● ALL BACKEND SERVICES ONLINE — P99 Latency: 8.4ms | 100% SLA' }
  ];

  bootSequence.forEach((step) => {
    setTimeout(() => {
      appendLog(step.time, step.tag, step.tagText, step.msg);
    }, step.delay);
  });

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      const stamp = (Math.random() * 0.05 + 0.01).toFixed(3) + 's';

      if (cmd === 'clear') {
        outputBox.innerHTML = '';
        appendLog('0.000s', 'cli-tag-info', 'SYS', 'Logs cleared. Terminal ready.');
        return;
      }

      if (cmd === 'status') {
        appendLog(stamp, 'cli-tag-ok', 'STATUS', 'Harsh Solanki Daemon: HEALTHY | Uptime: 99.99% | Active Workers: 16 | Memory: 312MB');
      } else if (cmd === 'benchmark') {
        appendLog(stamp, 'cli-tag-gold', 'BENCH', 'Running API Load Test: 10,000 req/s completed in 220ms. Latency P99 = 8.4ms.');
      } else if (cmd === 'stack') {
        appendLog(stamp, 'cli-tag-info', 'CLUSTER', 'Nodes: [Node.js Engine (v20), Golang Service Mesh (v1.22), PostgreSQL v16, Redis v7.2]');
      }
    });
  });
}

/* =========================================================================
   9. Magnetic Button Hover Physics
   ========================================================================= */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn, .cli-cmd-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* =========================================================================
   10. Interactive Neon Zig-Zag Scroll-Following Engineering Roadmap
   ========================================================================= */
function initScrollFollowingRoadmap() {
  const container = document.getElementById('roadmap-container');
  const neonPath = document.getElementById('zigzag-neon-path');
  const headOrb = document.getElementById('roadmap-zigzag-head');
  const milestones = document.querySelectorAll('.roadmap-milestone');
  if (!container || !neonPath || !milestones.length) return;

  const totalLength = neonPath ? neonPath.getTotalLength() : 0;
  if (neonPath) {
    neonPath.style.strokeDasharray = `${totalLength} ${totalLength}`;
    neonPath.style.strokeDashoffset = totalLength;
  }

  let targetProgress = 0;
  let currentProgress = 0;
  let isAnimating = false;

  const renderLoop = () => {
    currentProgress += (targetProgress - currentProgress) * 0.08;

    if (Math.abs(targetProgress - currentProgress) < 0.001) {
      currentProgress = targetProgress;
      isAnimating = false;
    } else {
      requestAnimationFrame(renderLoop);
    }

    const mobileLineFill = document.getElementById('mobile-roadmap-line-fill');
    if (mobileLineFill && window.innerWidth <= 900) {
      mobileLineFill.style.height = `${currentProgress * 100}%`;
    }

    if (neonPath && window.innerWidth > 900) {
      const drawLength = totalLength * currentProgress;
      neonPath.style.strokeDashoffset = totalLength - drawLength;
    }

    milestones.forEach((item) => {
      const node = item.querySelector('.milestone-node');
      if (!node) return;
      const nodeRect = node.getBoundingClientRect();
      if (nodeRect.top < window.innerHeight * 0.72) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  };

  const updateZigZagOnScroll = () => {
    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // The line tip will be drawn exactly at the bottom of the viewport as you scroll
    // viewportHeight - rect.top gives the number of pixels the container has scrolled into view
    // We divide by rect.height to get the exact percentage
    let progress = (viewportHeight - rect.top) / rect.height;
    
    targetProgress = Math.max(0, Math.min(1, progress));

    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(renderLoop);
    }
  };

  window.addEventListener('scroll', updateZigZagOnScroll, { passive: true });
  window.addEventListener('resize', updateZigZagOnScroll);
  setTimeout(updateZigZagOnScroll, 120);
}

/* =========================================================================
   10. Premium Animation: Magnetic Glow-Tracking Cards
   ========================================================================= */
function initCardGlowTracking() {
  const cards = document.querySelectorAll('.milestone-card, .project-card, .contact-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* =========================================================================
   11. Premium Animation: Cinematic Split-Text Reveal
   ========================================================================= */
function initCinematicTextReveal() {
  const textElements = document.querySelectorAll('.hero-title, .section-title');
  
  textElements.forEach(el => {
    // Basic word splitting
    const text = el.innerText;
    el.innerHTML = '';
    const words = text.split(' ');
    
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.overflow = 'hidden';
      wordSpan.style.verticalAlign = 'top';
      wordSpan.style.marginRight = '0.3em'; // Space between words
      
      const innerSpan = document.createElement('span');
      innerSpan.innerText = word;
      innerSpan.style.display = 'inline-block';
      innerSpan.style.transform = 'translateY(100%)';
      innerSpan.style.transition = `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${wordIndex * 0.1}s`;
      
      wordSpan.appendChild(innerSpan);
      el.appendChild(wordSpan);
      
      // Trigger animation after slight delay to ensure render
      setTimeout(() => {
        innerSpan.style.transform = 'translateY(0)';
      }, 100);
    });
  });
}

/* =========================================================================
   12. Premium Animation: 3D Parallax Depth Scrolling
   ========================================================================= */
function initParallaxDepthScrolling() {
  const orbs = document.querySelectorAll('.ambient-orb');
  const roadmapSvg = document.querySelector('.roadmap-zigzag-container svg');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Move background orbs at different speeds
    orbs.forEach((orb, index) => {
      const speed = (index + 1) * -0.15;
      orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
    
    // Subtly parallax the roadmap base line
    if (roadmapSvg) {
      roadmapSvg.style.transform = `translateY(${scrollY * -0.05}px)`;
    }
  }, { passive: true });
}

/* =========================================================================
   13. Premium Animation: Advanced Magnetic Pull Nodes
   ========================================================================= */
function initAdvancedMagneticNodes() {
  if (window.innerWidth < 768) return; // Disable on mobile to fix lag
  
  const magneticElements = document.querySelectorAll('.milestone-node, .magnetic-btn');
  
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      // Calculate distance from center of element
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      // Pull element towards cursor (max pull is 20px)
      const pullX = distanceX * 0.3;
      const pullY = distanceY * 0.3;
      
      el.style.transform = `translate(${pullX}px, ${pullY}px) scale(1.1)`;
      el.style.transition = 'transform 0.1s ease-out';
    });
    
    el.addEventListener('mouseleave', () => {
      // Snap back to original position
      el.style.transform = '';
      el.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; // springy bounce
    });
  });
}

/* =========================================================================
   14. Splash Screen Particles
   ========================================================================= */
function createSplashParticles() {
  const container = document.querySelector('.splash-shapes');
  if (!container) return;

  const characters = ['+', 'x', '// SYS', '{ }', '< />', '0x1A4', 'null'];
  const particleCount = window.innerWidth < 768 ? 10 : 40;
  
  for (let i = 0; i < particleCount; i++) {
    const el = document.createElement('div');
    el.classList.add('splash-shape');
    
    const type = Math.floor(Math.random() * 3);
    
    if (type === 0) {
      const size = Math.random() * 80 + 10;
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.border = '1px solid #e4e4e7';
      el.style.borderRadius = '50%';
      if (Math.random() > 0.5) el.style.borderStyle = 'dashed';
    } else if (type === 1) {
      el.textContent = characters[Math.floor(Math.random() * characters.length)];
      el.style.fontFamily = 'var(--font-mono)';
      el.style.color = '#a1a1aa';
      el.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
      el.style.letterSpacing = '2px';
    } else {
      el.style.width = (Math.random() * 150 + 30) + 'px';
      el.style.height = '1px';
      el.style.background = '#e4e4e7';
      el.style.transform = `rotate(${Math.random() * 180}deg)`;
    }

    el.style.top = (Math.random() * 120 - 10) + '%';
    el.style.left = (Math.random() * 120 - 10) + '%';
    
    const delay = Math.random() * 1.5;
    const duration = Math.random() * 4 + 3;
    
    el.style.animation = `floatShape ${duration}s ease-in-out infinite alternate, fadeShapeIn 1.5s forwards`;
    el.style.animationDelay = `${delay}s, ${delay}s`;
    
    container.appendChild(el);
  }
}
