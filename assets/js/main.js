const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const playlistData = [
  {
    title: "ZegoCloud SDK Android",
    category: "Android",
    description: "Integrate ZegoCloud for real-time voice and video inside modern Android app flows.",
    duration: "1 video",
    url: "https://www.youtube.com/results?search_query=Code+With+FK+Zegocloud+SDK+Android",
  },
  {
    title: "Food Delivery · Android",
    category: "Android",
    description: "Build a production-ready delivery app covering cart flows, tracking, payments, and admin tooling.",
    duration: "30 videos",
    url: "https://www.youtube.com/results?search_query=Code+With+FK+Food+Delivery+Android",
  },
  {
    title: "Augmented Reality",
    category: "Emerging Tech",
    description: "Experiment with AR overlays and scene understanding using the latest Android libraries.",
    duration: "1 video",
    url: "https://www.youtube.com/results?search_query=Code+With+FK+Augmented+Reality",
  },
  {
    title: "Stream App · Android",
    category: "Android",
    description: "Ship a feature-rich streaming app with polished UI, navigation, and viewer engagement patterns.",
    duration: "1 video",
    url: "https://www.youtube.com/results?search_query=Code+With+FK+Stream+App+Android",
  },
  {
    title: "Weather App · CMP",
    category: "Compose Multiplatform",
    description: "Use Compose Multiplatform to deliver weather dashboards that run beautifully across devices.",
    duration: "3 videos",
    url: "https://www.youtube.com/results?search_query=Code+With+FK+Weather+App+CMP",
  },
  {
    title: "Expense Tracker · Android",
    category: "Android",
    description: "Track spending, visualize insights, and sync data—an Android finance app from scratch.",
    duration: "4 videos",
    url: "https://www.youtube.com/results?search_query=Code+With+FK+Expense+Tracker+Android",
  },
  {
    title: "eCommerce App · Android",
    category: "Android",
    description: "Design and code a commerce experience with product discovery, checkout, and order management.",
    duration: "11 videos",
    url: "https://www.youtube.com/results?search_query=Code+With+FK+eCommerce+App+Android",
  },
  {
    title: "Video Call App · Android",
    category: "Android",
    description: "Implement low-latency video calls, device handling, and intuitive UI for real-time communication.",
    duration: "1 video",
    url: "https://www.youtube.com/results?search_query=Code+With+FK+Video+Call+App+Android",
  },
  {
    title: "Chat App · Jetpack Compose",
    category: "Jetpack Compose",
    description: "Craft a delightful chat experience with Compose, clean architecture, and Firebase integrations.",
    duration: "5 videos",
    url: "https://www.youtube.com/results?search_query=Code+With+FK+Chat+App+Compose+Android",
  },
  {
    title: "News App · Android",
    category: "Android",
    description: "Consume APIs, implement caching, and present news content with Compose-driven storytelling.",
    duration: "5 videos",
    url: "https://www.youtube.com/results?search_query=Code+With+FK+News+App+Android",
  },
  {
    title: "Jetpack Compose Masterclass",
    category: "Jetpack Compose",
    description: "A deep-dive Compose series with 77+ sessions covering components, layouts, and animations.",
    duration: "77 videos",
    url: "https://www.youtube.com/results?search_query=Code+With+FK+Jetpack+Compose",
  },
  {
    title: "Compose Multiplatform",
    category: "Compose Multiplatform",
    description: "Explore shared UI, navigation, and tooling across Android, desktop, and web with CMP.",
    duration: "14 videos",
    url: "https://www.youtube.com/results?search_query=Code+With+FK+Compose+Multiplatform",
  },
  {
    title: "Android Development Essentials",
    category: "Android",
    description: "61-episode foundation series covering architecture patterns, tooling, and release workflows.",
    duration: "61 videos",
    url: "https://www.youtube.com/results?search_query=Code+With+FK+Android+Development",
  },
  {
    title: "Kotlin Basics",
    category: "Kotlin",
    description: "Level up your Kotlin fundamentals—syntax, flows, collections, and best practices for Android devs.",
    duration: "9 videos",
    url: "https://www.youtube.com/results?search_query=Code+With+FK+Kotlin+Basics",
  },
];

const playlistGrid = document.querySelector("[data-playlist-grid]");

if (playlistGrid) {
  const createCard = (playlist) => {
    const card = document.createElement("article");
    card.className = "playlist-card";
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="playlist-glow"></div>
      <div class="playlist-meta">
        <span>${playlist.category}</span>
        <span>•</span>
        <span>${playlist.duration}</span>
      </div>
      <h3>${playlist.title}</h3>
      <p>${playlist.description}</p>
      <span class="playlist-action">Play on YouTube →</span>
    `;

    card.addEventListener("click", () => {
      window.open(playlist.url, "_blank", "noopener");
    });

    card.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        window.open(playlist.url, "_blank", "noopener");
      }
    });

    return card;
  };

  playlistData.forEach((playlist) => playlistGrid.appendChild(createCard(playlist)));
}

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("primary-nav");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    navLinks.dataset.collapsed = String(isExpanded);
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement && window.innerWidth < 960) {
      navToggle.setAttribute("aria-expanded", "false");
      navLinks.dataset.collapsed = "true";
    }
  });
}

const yearEl = document.querySelector("[data-current-year]");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const interactiveElements = document.querySelectorAll(".playlist-card, .workflow-step, .testimonial-card");

if (!prefersReducedMotion) {
  const applyTilt = (element) => {
    const strength = element.classList.contains("playlist-card") ? 12 : 8;
    const rect = element.getBoundingClientRect();

    const updateTilt = (event) => {
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -strength;
      const rotateY = ((x / rect.width) - 0.5) * strength;
      element.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const resetTilt = () => {
      element.style.transform = "";
    };

    element.addEventListener("pointermove", updateTilt);
    element.addEventListener("pointerleave", resetTilt);
  };

  interactiveElements.forEach((element) => applyTilt(element));
}

class CanvasBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.lastFrame = performance.now();

    this.handleResize();
    window.addEventListener("resize", () => this.handleResize());
    if (!prefersReducedMotion) {
      this.populate();
      requestAnimationFrame((timestamp) => this.render(timestamp));
    }
  }

  handleResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  populate() {
    const area = this.canvas.width * this.canvas.height;
    const count = Math.min(60, Math.floor(area / 20000));
    this.particles = new Array(count).fill(null).map(() => this.createParticle());
  }

  createParticle() {
    const size = Math.random() * 60 + 20;
    const speed = (Math.random() * 0.25 + 0.05) * (Math.random() > 0.5 ? 1 : -1);
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size,
      speedX: speed,
      speedY: (Math.random() * 0.25 + 0.05) * (Math.random() > 0.5 ? 1 : -1),
      rotation: Math.random() * Math.PI,
      rotationSpeed: (Math.random() - 0.5) * 0.002,
      opacity: Math.random() * 0.32 + 0.1,
    };
  }

  render(timestamp) {
    const delta = timestamp - this.lastFrame;
    this.lastFrame = timestamp;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      particle.x += particle.speedX * delta;
      particle.y += particle.speedY * delta;
      particle.rotation += particle.rotationSpeed * delta;

      if (particle.x > this.canvas.width + particle.size) particle.x = -particle.size;
      if (particle.x < -particle.size) particle.x = this.canvas.width + particle.size;
      if (particle.y > this.canvas.height + particle.size) particle.y = -particle.size;
      if (particle.y < -particle.size) particle.y = this.canvas.height + particle.size;

      this.drawParticle(particle);
    });

    requestAnimationFrame((time) => this.render(time));
  }

  drawParticle({ x, y, size, opacity, rotation }) {
    const gradient = this.ctx.createLinearGradient(-size / 2, -size / 2, size / 2, size / 2);
    gradient.addColorStop(0, `rgba(245, 166, 35, ${opacity})`);
    gradient.addColorStop(1, `rgba(17, 17, 19, ${opacity * 0.2})`);

    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(rotation);
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.roundRect(-size / 2, -size / 4, size, size / 2, size / 5);
    this.ctx.fill();
    this.ctx.restore();
  }
}

const canvas = document.querySelector(".hero-canvas");
if (canvas instanceof HTMLCanvasElement) {
  new CanvasBackground(canvas);
}

const observer =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.35 }
      )
    : null;

if (observer) {
  document.querySelectorAll(".section, .playlist-card, .workflow-step, .testimonial-card").forEach((element) => {
    observer.observe(element);
  });
}

document.body.classList.add("js-ready");

