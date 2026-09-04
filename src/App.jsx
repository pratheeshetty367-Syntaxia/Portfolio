import { useState, useEffect, useRef } from "react";
import "./index.css";
import { FaWhatsapp } from "react-icons/fa";

// ─── PORTFOLIO DATA ────────────────────────────────────────────────────────────
// ✏️  Update these with your real info before deploying
const PORTFOLIO = {
  name: "Pratheeksha Shetty",
  shortTitle: "MCA Student · Java Developer · Full-Stack Developer",
  bio: "Motivated MCA student with a strong foundation in Java,Python, MERN stack and scalable web applications. Passionate about building inclusive, intelligent solutions that make a real difference in people's lives.",
  photo: "/photo.jpg",          // ← Put your photo as public/photo.jpg
  email: "pratheeshetty367@gmail.com",
  phone: "+91 8618221971",
  linkedin: "https://linkedin.com/in/pratheeksha-shetty-a1a89b37b",
  github: "https://github.com/pratheeshetty367-Syntaxia",
  resumePdf: "public/resume.pdf",      // ← Put your resume as public/resume.pdf

  skills: [
     { name: "MySQL", icon: "🗄️", level: 90 },
    { name: "Java", icon: "☕", level: 88 },
    { name: "Python", icon: "🐍", level: 85 },
    { name: "MongoDB", icon: "🍃", level: 80 },
    { name: "Git & GitHub", icon: "🔗", level: 75 },
    { name: "Spring Boot", icon: "🌿", level: 72 },
    { name: "ReactJS", icon: "⚛️", level: 60 },
    { name: "JavaScript", icon: "🟡", level: 50 },
    { name: "Node.js", icon: "🟢", level: 50 },
  ],

  tooling: [
    "React", "Node.js", "MongoDB", "Spring Boot",
    "Java", "Python", "MySQL",
    "Git", "VS Code", 
  ],

  education: [
    {
      degree: "Master of Computer Application (MCA)",
      institution: "NMAM Institute of Technology, Nitte",
      year: "2025 – Present",
      score: "CGPA: 8.39",
    },
    {
      degree: "B.Sc – Mathematics & Computer Science",
      institution: "Canara College, Mangalore",
      year: "2021 – 2024",
      score: "CGPA: 8.06",
    },
    {
      degree: "Pre-University (12th)-PCMC",
      institution: "Sharadha Vidyanikethana PU College",
      year: "2021",
      score: "86.5%",
    },
    {
      degree: "SSLC (10th)",
      institution: "Uchil Bovis School",
      year: "2019",
      score: "83.2%",
    },
  ],

  projects: [
    
    {
      title: "ACCESSNOVA",
      subtitle: "AI-Powered Assistive Platform",
      description:
        "An AI-powered accessibility platform combining Braille-to-text and voice translation, smart navigation, sign language translation, and an AI learning assistant. Designed to provide accessible communication, navigation, and learning support through a unified platform.",
      tech: ["MERN Stack", "OCR", "Web Speech API", "AI/ML"],
      github: "https://github.com/pratheeshetty367-Syntaxia",
      live: "",
      color: "#A855F7",
    },

   {
      title: "PLACEMENTIQ",
      subtitle: "AI Placement Preparation Platform",
      description:
        "An AI-powered placement preparation platform with ATS-based resume analysis, job description matching, personalized interview question generation, and AI mock interviews. Includes real-time feedback, performance analytics, secure authentication, and progress tracking to help students prepare for technical and HR interviews.",
      tech: ["Spring Boot", "ReactJS", "PostgreSQL", "OpenAI API", "JWT", "REST APIs"],
      github: "https://github.com/pratheeshetty367-Syntaxia",
      live: "",
      color: "#7C3AED",
    },
    {
  title: "FutureMe",
  subtitle: "Messages to Your Future Self",
  description:
    "A time-capsule web application that lets users write personal letters to their future selves and schedule when they can be opened. Features secure authentication, a personal letter dashboard, date-and-time-based locking with a live countdown, letter editing, and deletion confirmation.",
  tech: [
    "Java 21",
    "Spring Boot",
    "Spring Security",
    "Spring Data JPA",
    "Thymeleaf",
    "MySQL"
  ],
  github: "https://github.com/pratheeshetty367-Syntaxia/FutureMe",
  live: "https://futureme-5ns9.onrender.com/letters",
  color: "#A855F7",
},
{
      title: "EMERQ",
      subtitle: "Smart Emergency Triage System",
      description:
        "A full-stack emergency triage system with real-time patient monitoring, intelligent queue management, and REST API integration. Uses a priority-scoring algorithm based on patient vitals to categorize cases as Critical, High, Medium, or Low.",
      tech: ["ReactJS", "Django REST", "MongoDB"],
      github: "https://github.com/pratheeshetty367-Syntaxia",   // ← update
      live: "",          // ← add your live URL here, leave blank to hide button
      color: "#7C3AED",
      
    },
   
{
  title: "QUESTLY",
  subtitle: "Gamified Quest & Task Management App",
  description:
    "A game-inspired mobile productivity app that transforms everyday tasks into quests. Features task creation and editing, priority-based XP rewards, a leveling system, daily challenges, due dates, reminder notifications, and progress tracking. Built with React Native and Expo, with local data storage for offline use.",
  tech: [
    "React Native",
    "Expo",
    "JavaScript",
    "AsyncStorage",
    "Expo Notifications"
  ],
  github: "https://github.com/pratheeshetty367-Syntaxia/Questly",
  live: "https://expo.dev/accounts/pratheeksha2903/projects/SmartToDoApp/builds/386254e0-4fcc-4878-bc95-babccb77fe13",
  color: "#7C3AED",
},

  ],

  certifications: [
    { title: "Cloud Computing & Distributed Systems", icon: "☁️" },
    { title: "Microsoft Applied AI", icon: "🤖" },
    { title: "Diploma in Computer Applications (DCA)", icon: "🎓" },
    { title: "Salesforce AI associate badge"}
  ],

  achievements: [
    "🥇 1st place – Pick and Speak competition (strong communication & presentation skills)",
    "🏅 Best Participant – Mahindra Pride Classroom & Naandi Foundation",
  ],
};

// ─── HOOK: Intersection Observer for scroll animations ────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Home", "About", "Skills", "Education", "Projects", "Contact"];

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__logo">
        <span className="logo-letter">P</span>
        <span className="logo-text">Pratheeksha</span>
      </div>

      <ul className={`navbar__links ${open ? "navbar__links--open" : ""}`}>
        {links.map((l) => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="nav-link"
            >
              {l}
            </a>
          </li>
        ))}
        <li>
          <a href={PORTFOLIO.resumePdf} download className="nav-cta">
            Resume ↓
          </a>
        </li>
      </ul>

      <button
        className={`hamburger ${open ? "hamburger--open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [typedText, setTypedText] = useState("");
  const titles = [
    "Full-Stack Developer",
    "Java Enthusiast",
    "MERN Stack Builder",
    "IoT Explorer",
  ];
  const [tIdx, setTIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = titles[tIdx];
    let timeout;
    if (!deleting && typedText.length < current.length) {
      timeout = setTimeout(() => setTypedText(current.slice(0, typedText.length + 1)), 80);
    } else if (!deleting && typedText.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && typedText.length > 0) {
      timeout = setTimeout(() => setTypedText(typedText.slice(0, -1)), 45);
    } else if (deleting && typedText.length === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setTIdx((i) => (i + 1) % titles.length);
      }, 0);
    }
    return () => clearTimeout(timeout);
  }, [typedText, deleting, tIdx]);

  return (
    <section id="home" className="hero">
      {/* Animated background grid */}
      <div className="hero-grid" />
      {/* Floating orbs */}
      <div className="orb orb--1" />
      <div className="orb orb--2" />
      <div className="orb orb--3" />

      <div className="hero__content">
        <div className="hero__text animate-slide-up">
          <div className="hero__greeting">
            <span className="greeting-badge">✌️ Hi There! I'm</span>
          </div>
          <h1 className="hero__name">{PORTFOLIO.name}</h1>
          <div className="hero__typed">
            <span className="typed-prefix">A </span>
            <span className="typed-word">{typedText}</span>
            <span className="typed-cursor">|</span>
          </div>
          <p className="hero__bio">{PORTFOLIO.bio}</p>

          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">View My Work →</a>
            <a href="#contact" className="btn btn--outline">Contact Me</a>
          </div>

          <div className="hero__socials">
            <a href={PORTFOLIO.github} target="_blank" rel="noreferrer" className="social-pill">GitHub</a>
            <a href={PORTFOLIO.linkedin} target="_blank" rel="noreferrer" className="social-pill">LinkedIn</a>
            <a href={`mailto:${PORTFOLIO.email}`} className="social-pill">Email</a>
          </div>
        </div>

        <div className="hero__photo-wrap animate-float">
          <div className="photo-ring" />
          <div className="photo-ring photo-ring--2" />
          <img
            src={PORTFOLIO.photo}
            alt={PORTFOLIO.name}
            className="hero__photo"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          {/* Fallback avatar if photo not found */}
          <div className="photo-fallback" style={{ display: "none" }}>
            {PORTFOLIO.name[0]}
          </div>
          <div className="photo-badge photo-badge--tl">&lt;/&gt;</div>
          <div className="photo-badge photo-badge--br">MCA</div>
        </div>
      </div>

      <a href="#about" className="scroll-hint">
        <div className="scroll-dot" />
        <span>Scroll</span>
      </a>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  const [ref, inView] = useInView();
  return (
    <section id="about" className="section about">
      <div ref={ref} className={`container fade-in ${inView ? "fade-in--visible" : ""}`}>
        <h2 className="section-title">About <span className="accent">Me</span></h2>
        <div className="about__grid">
          <div className="about__text">
            <p>
              I'm <strong className="accent">Pratheeksha Shetty</strong>, a driven MCA student at
              NMAM Institute of Technology, Nitte with a deep passion for building software that
              matters. From intelligent triage systems to accessible learning platforms, I love
              turning complex problems into elegant solutions.
            </p>
            <p>
              My journey spans <strong className="accent">Java</strong> backend development,
              <strong className="accent"> MERN stack</strong> web apps, and
              <strong className="accent"> IoT</strong> projects. I believe technology should be
              inclusive, efficient, and human-centered.
            </p>
            <div className="about__stats">
              {[
                { num: "8.2", label: "Current SGPA" },
                { num: "2+", label: "Projects Built" },
                { num: "3+", label: "Certifications" },
                { num: "4", label: "Languages Known" },
              ].map((s) => (
                <div className="stat-card" key={s.label}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="about__tags">
            <h3>Languages I speak</h3>
            {["English", "Hindi", "Kannada", "Tulu"].map((l) => (
              <span key={l} className="lang-tag">{l}</span>
            ))}
            <h3 style={{ marginTop: "1.5rem" }}>Soft Skills</h3>
            {["Communication", "Problem-Solving", "Teamwork", "Leadership", "Adaptability", "Creativity"].map((s) => (
              <span key={s} className="skill-tag">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────
function Skills() {
  const [ref, inView] = useInView();
  return (
    <section id="skills" className="section skills">
      <div ref={ref} className={`container fade-in ${inView ? "fade-in--visible" : ""}`}>
        <h2 className="section-title"><span className="accent">Tech</span> Stack</h2>

        {/* Skill bars */}
        <div className="skill-bars">
          {PORTFOLIO.skills.map((s, i) => (
            <div key={s.name} className="skill-bar" style={{ animationDelay: `${i * 0.07}s` }}>
              <div className="skill-bar__header">
                <span>{s.icon} {s.name}</span>
                <span className="skill-bar__pct">{s.level}%</span>
              </div>
              <div className="skill-bar__track">
                <div
                  className="skill-bar__fill"
                  style={{
                    width: inView ? `${s.level}%` : "0%",
                    transitionDelay: `${i * 0.07 + 0.3}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tooling grid */}
        <h3 className="sub-section-title" style={{ marginTop: "3rem" }}>Tooling</h3>
        <div className="tooling-grid">
          {PORTFOLIO.tooling.map((t) => (
            <div key={t} className="tool-chip">{t}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EDUCATION ────────────────────────────────────────────────────────────────
function Education() {
  const [ref, inView] = useInView();
  return (
    <section id="education" className="section education">
      <div ref={ref} className={`container fade-in ${inView ? "fade-in--visible" : ""}`}>
        <h2 className="section-title"><span className="accent">Education</span></h2>
        <div className="timeline">
          {PORTFOLIO.education.map((e, i) => (
            <div key={i} className="timeline__item" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="timeline__dot" />
              <div className="timeline__card">
                <div className="timeline__year">{e.year}</div>
                <h3 className="timeline__degree">{e.degree}</h3>
                <p className="timeline__institution">{e.institution}</p>
                <span className="timeline__score">{e.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function Projects() {
  const [ref, inView] = useInView();
  return (
    <section id="projects" className="section projects">
      <div ref={ref} className={`container fade-in ${inView ? "fade-in--visible" : ""}`}>
        <h2 className="section-title">My <span className="accent">Projects</span></h2>
        <p className="section-sub">Things I've built with passion ✨</p>
        <div className="projects-grid">
          {PORTFOLIO.projects.map((p, i) => (
            <div key={i} className="project-card" style={{ "--card-color": p.color }}>
              <div className="project-card__glow" />
              <div className="project-card__body">
                <div className="project-card__header">
                  <h3 className="project-card__title">{p.title}</h3>
                  <p className="project-card__subtitle">{p.subtitle}</p>
                </div>
                <p className="project-card__desc">{p.description}</p>
                <div className="project-card__tech">
                  {p.tech.map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
                <div className="project-card__links">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="project-link project-link--github">
                      GitHub ↗
                    </a>
                  )}
                  
                  {p.live && (
                    <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link project-link--live"
                    >
                    {p.title === "QUESTLY"
                    ? "📱 View App Build ↗"
                    : `✨ ${p.title} Live Demo ↗`}
                    </a>
                  )}

                  {!p.live && (
                    <span className="project-link project-link--soon">Live Demo coming soon</span>
                  )}
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CERTIFICATIONS & ACHIEVEMENTS ───────────────────────────────────────────
function Extras() {
  const [ref, inView] = useInView();
  return (
    <section className="section extras">
      <div ref={ref} className={`container fade-in ${inView ? "fade-in--visible" : ""}`}>
        <div className="extras__grid">
          <div>
            <h2 className="section-title"><span className="accent">Certifications</span></h2>
            <div className="cert-list">
              {PORTFOLIO.certifications.map((c, i) => (
                <div key={i} className="cert-card">
                  <span className="cert-icon">{c.icon}</span>
                  <span>{c.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="section-title"><span className="accent">Achievements</span></h2>
            <div className="achievement-list">
              {PORTFOLIO.achievements.map((a, i) => (
                <div key={i} className="achievement-card">{a}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, inView] = useInView();
  return (
    <section id="contact" className="section contact">
      <div ref={ref} className={`container fade-in ${inView ? "fade-in--visible" : ""}`}>
        <h2 className="section-title">Connect <span className="accent">With Me</span></h2>
        <p className="section-sub">There's no glory in playing small. Be different!</p>

        <div className="contact-grid">
          <a
          href="mailto:pratheeshetty367@gmail.com"
          className="contact-card"
          style={{ pointerEvents: "auto", zIndex: 999 }}
          >
          <span className="contact-card__icon">✉️</span>

          <span className="contact-card__label">
          Email
          </span>

          <span className="contact-card__value">
              pratheeshetty367@gmail.com
          </span>
          </a>
          <a href={PORTFOLIO.linkedin} target="_blank" rel="noreferrer" className="contact-card">
            <span className="contact-card__icon">💼</span>
            <span className="contact-card__label">LinkedIn</span>
            <span className="contact-card__value">Connect with me</span>
          </a>
          <a href={PORTFOLIO.github} target="_blank" rel="noreferrer" className="contact-card">
            <span className="contact-card__icon">🔗</span>
            <span className="contact-card__label">GitHub</span>
            <span className="contact-card__value">View my code</span>
          </a>
          <a href={`tel:${PORTFOLIO.phone}`} className="contact-card">
            <span className="contact-card__icon">📱</span>
            <span className="contact-card__label">Phone</span>
            <span className="contact-card__value">{PORTFOLIO.phone}</span>
          </a>
          <a
            href="https://wa.me/918618221971"
            target="_blank"
            rel="noreferrer"
            className="contact-card"
          >
          <span className="contact-card__icon">
          <FaWhatsapp />
          </span>
          <span className="contact-card__label">WhatsApp</span>
          <span className="contact-card__value">Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 <span className="accent">Pratheeksha Shetty</span>. Built with React 💜</p>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Projects />
      <Extras />
      <Contact />
      <Footer />
    </>
  );
}