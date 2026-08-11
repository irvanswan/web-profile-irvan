"use client";

import { CSS } from "@dnd-kit/utilities";
import { DndContext, type DragEndEvent, useDraggable } from "@dnd-kit/core";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  BriefcaseBusiness, Check, ChevronRight, CircleUserRound, Code2, Download,
  ExternalLink, Folder, GraduationCap, Landmark, Languages, Mail, Maximize2,
  Menu, Minimize2, Minus, Moon, Phone, Sparkles, Sun, UserRound, X,
} from "lucide-react";
import DirectoryContent from "./contens/DirectoryContent";
import AboutContent from "./contens/AboutContent";
import ExperienceContent from "./contens/ExperienceContent";
import SectionHeading from "./SectionHeading";
import PortfolioContent from "./contens/PortofolioContent";
import EducationContent from "./contens/EducationContent";
import SkillsContent from "./contens/SkillsContent";

type WindowId = "about" | "portfolio" | "education" | "skills" | "contact" | "experience" | "directory";
type Position = { x: number; y: number };
type ThemeTransition = { target: "light" | "dark" } | null;

const navItems: { id: WindowId; icon: typeof UserRound; color: string; translation: string }[] = [
  { id: "about", icon: CircleUserRound, color: "blue", translation: "about" },
    { id: "experience", icon: Landmark, color: "coral", translation: "experience" },
  { id: "portfolio", icon: BriefcaseBusiness, color: "mint", translation: "portfolio" },
    { id: "skills", icon: Code2, color: "violet", translation: "skills" },
  { id: "education", icon: GraduationCap, color: "amber", translation: "education" },
  { id: "contact", icon: Mail, color: "pink", translation: "contact" },
  { id: "directory", icon: Folder, color: "cyan", translation: 'directory' },
];

const initialPositions: Record<WindowId, Position> = {
  about: { x: 340, y: 90 },
  portfolio: { x: 390, y: 112 },
  education: { x: 420, y: 128 },
  skills: { x: 450, y: 144 },
  contact: { x: 480, y: 160 },
  experience: { x: 490, y: 160 },
  directory: { x: 500, y: 160 }
};

function playClickSound() {
  const audioContext = new AudioContext();

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(320, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(
    140,
    audioContext.currentTime + 0.04
  );

  gain.gain.setValueAtTime(0.04, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.05
  );

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.05);
}

export default function PortfolioShell() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState<WindowId[]>([]);
  const [activeWindow, setActiveWindow] = useState<WindowId | null>(null);
  const [maximized, setMaximized] = useState<WindowId[]>([]);
  const [minimized, setMinimized] = useState<WindowId[]>([]);
  const [closing, setClosing] = useState<WindowId[]>([]);
  const [positions, setPositions] = useState(initialPositions);
  const [themeTransition, setThemeTransition] = useState<ThemeTransition>(null);
  const themeTimer = useRef<number | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("irvan-portfolio-theme");
    setIsDark(saved === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    window.localStorage.setItem("irvan-portfolio-theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => () => {
    if (themeTimer.current) window.clearTimeout(themeTimer.current);
  }, []);

  const changeTheme = (nextIsDark: boolean) => {
    if (nextIsDark === isDark || themeTransition) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setIsDark(nextIsDark);
      return;
    }

    setThemeTransition({ target: nextIsDark ? "dark" : "light" });
    themeTimer.current = window.setTimeout(() => setIsDark(nextIsDark), 330);
    window.setTimeout(() => setThemeTransition(null), 820);
  };

  const openWindow = (id: WindowId) => {
    playClickSound();
    setOpenWindows((current) => current.includes(id) ? current : [...current, id]);
    setMinimized((current) => current.filter((item) => item !== id));
    setClosing((current) => current.filter((item) => item !== id));
    setActiveWindow(id);
    setIsMenuOpen(false);
  };

  const removeWindow = (id: WindowId) => {
    setOpenWindows((current) => current.filter((item) => item !== id));
    setMaximized((current) => current.filter((item) => item !== id));
    setMinimized((current) => current.filter((item) => item !== id));
    setClosing((current) => current.filter((item) => item !== id));
    setActiveWindow((current) => current === id ? null : current);
  };

  const closeWindow = (id: WindowId) => {
    playClickSound();
    setClosing((current) => current.includes(id) ? current : [...current, id]);
    window.setTimeout(() => removeWindow(id), 300);
  };

  const minimizeWindow = (id: WindowId) => {
    playClickSound();
    setMinimized((current) => current.includes(id) ? current : [...current, id]);
    setActiveWindow((current) => current === id ? null : current);
  };

  const handleDragEnd = ({ active, delta }: DragEndEvent) => {
    const id = active.id.toString().replace("window-", "") as WindowId;
    setPositions((current) => ({
      ...current,
      [id]: { x: current[id].x + delta.x, y: current[id].y + delta.y },
    }));
  };

  const switchLocale = (nextLocale: string) => {
    if (nextLocale !== locale) router.push(`/${nextLocale}`);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <main className="portfolio-canvas flex min-h-[100dvh] items-center px-5 py-6 sm:px-8 lg:px-10">
        <header className="absolute right-5 top-5 z-30 flex items-center gap-2 sm:right-8 sm:top-7 lg:right-10">
          <div className="control-group" aria-label="Language selector">
            <Languages size={15} />
            {(["id", "en"] as const).map((item) => (
              <button key={item} type="button" onClick={() => switchLocale(item)} className={`control-button ${locale === item ? "is-selected" : ""}`}>
                {item.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="control-group" aria-label="Theme selector">
            <button type="button" aria-label="Use light theme" onClick={() => changeTheme(false)} className={`theme-button ${!isDark ? "is-selected" : ""}`}><Sun size={16} /></button>
            <button type="button" aria-label="Use dark theme" onClick={() => changeTheme(true)} className={`theme-button ${isDark ? "is-selected" : ""}`}><Moon size={16} /></button>
          </div>
        </header>

        <button type="button" className="mobile-menu-button" aria-label="Open navigation" onClick={() => setIsMenuOpen((value) => !value)}><Menu size={21} /></button>

        <aside className={`dock ${isMenuOpen ? "is-open" : ""}`}>
          <div className="dock-brand"><span>IJ</span><small>IRVAN JUNAIDI</small></div>
          <nav className="dock-nav" aria-label="Portfolio sections">
            {navItems.map((item) => {
              const Icon = item.icon;
              return <button key={item.id} type="button" onClick={() => openWindow(item.id)} className={`dock-item ${activeWindow === item.id ? "is-active" : ""}`}>
                <span className={`folder-icon ${item.color}`}><Icon size={22} strokeWidth={1.8} /></span>
                <span>{t(`nav.${item.translation}`)}</span>
                <ChevronRight className="dock-chevron" size={15} />
              </button>;
            })}
          </nav>
          <div className="dock-footer"><Sparkles size={14} /><span>v1.0 / {locale.toUpperCase()}</span></div>
        </aside>

        <section className="hero-content mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <div className="avatar-orbit">
            <div className="avatar">
              <img
                src="/assets/images/my-photo.jpeg"
                alt="profile"
              />
            </div>
            <span className="avatar-status">
              <Check size={10} strokeWidth={3} />
            </span>
          </div>
          <p className="hero-kicker">Jakarta · Indonesia</p>
          <h1>Irvan Junaidi</h1>
          <p className="hero-role">{t("hero.role")}</p>
          <p className="hero-summary">{t("hero.summary")}</p>
          <div className="hero-rule" />
          <p className="hero-hint"><span className="hint-dot" />{t("hero.hint")}</p>
        </section>
        {themeTransition && <div className={`theme-transition is-active to-${themeTransition.target}`} aria-hidden="true"><span className="theme-transition-core">{themeTransition.target === "dark" ? <Moon size={24} /> : <Sun size={24} />}</span></div>}
        {openWindows.map((id) => <PortfolioWindow key={id} id={id} t={t} position={positions[id]} isActive={activeWindow === id} isMaximized={maximized.includes(id)} isMinimized={minimized.includes(id)} isClosing={closing.includes(id)} onFocus={() => setActiveWindow(id)} onClose={() => closeWindow(id)} onMinimize={() => minimizeWindow(id)} onToggleMaximize={() => setMaximized((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])} />)}
      </main>
    </DndContext>
  );
}

function PortfolioWindow({ id, t, position, isActive, isMaximized, isMinimized, isClosing, onFocus, onClose, onMinimize, onToggleMaximize }: { id: WindowId; t: ReturnType<typeof useTranslations>; position: Position; isActive: boolean; isMaximized: boolean; isMinimized: boolean; isClosing: boolean; onFocus: () => void; onClose: () => void; onMinimize: () => void; onToggleMaximize: () => void }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: `window-${id}` });
  const title = t(`nav.${id}`);
  const style = isMaximized || isMinimized || isClosing ? undefined : { left: position.x, top: position.y, transform: CSS.Translate.toString(transform) };
  return <article ref={setNodeRef} style={style} onMouseDown={onFocus} className={`portfolio-window ${isMaximized ? "is-maximized" : ""} ${isMinimized ? "is-minimized" : ""} ${isClosing ? "is-closing" : ""} ${isActive ? "is-active" : ""}`}>
    <div className="window-bar" {...listeners} {...attributes} aria-label={t("window.drag")}>
      <div className="window-dots">
        <button type="button" aria-label={t("window.close")} onPointerDown={(event) => event.stopPropagation()} onClick={onClose}>
          <X size={12} />
        </button>
        <button type="button" className="window-minimize" aria-label={t("window.minimize")} onPointerDown={(event) => event.stopPropagation()} onClick={onMinimize}>
          <Minus size={12} />
        </button>
      </div>
      <div className="window-title">{title}</div>
      <button type="button" className="window-maximize" aria-label={isMaximized ? t("window.restore") : t("window.maximize")} onPointerDown={(event) => event.stopPropagation()} onClick={onToggleMaximize}>{isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}</button>
    </div>
    <div className="window-content window-scrollbar">{id === "about" && <AboutContent t={t} />}{id === "portfolio" && <PortfolioContent t={t} />}{id === "education" && <EducationContent t={t} />}{id === "skills" && <SkillsContent t={t} />}{id === "contact" && <ContactContent t={t} />}{id === 'experience' && <ExperienceContent t={t} />}{id === 'directory' && <DirectoryContent t={t} />}</div>
  </article>;
}

function ContactContent({ t }: { t: ReturnType<typeof useTranslations> }) { return <><SectionHeading eyebrow={t("contact.eyebrow")} title={t("contact.title")} /><p className="lead-copy">{t("contact.body")}</p><div className="contact-links"><a href="mailto:irvanjunaidi2@gmail.com"><Mail size={17} /><span>{t("contact.email")}</span><ExternalLink size={14} /></a><a href="https://www.linkedin.com/in/irvan-junaidi" target="_blank" rel="noreferrer"><ExternalLink size={17} /><span>{t("contact.linkedin")}</span><ExternalLink size={14} /></a><a href="https://github.com/irvanswan" target="_blank" rel="noreferrer"><Code2 size={17} /><span>{t("contact.github")}</span><ExternalLink size={14} /></a><div className="contact-phone"><Phone size={17} /><span>{t("contact.phone")}</span></div></div><a  href="/assets/documents/Irvan_Junaidi_ATS_Resume_Final.docx"
  download="Irvan_Junaidi_CV.docx" className="contact-footnote"><Download size={14} /> Resume data sourced from your ATS CV</a></>; }
