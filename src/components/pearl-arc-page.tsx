import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Play,
  Check,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Shield,
  Smile,
  Crown,
  Baby,
  Stethoscope,
  Activity,
  HeartPulse,
  Star,
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Plus,
} from "lucide-react";
import heroDentist from "@/assets/hero-dentist.jpg";
import aboutClinic from "@/assets/about-clinic.jpg";
import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";
import feature1 from "@/assets/feature-1.jpg";
import feature2 from "@/assets/feature-2.jpg";
import feature3 from "@/assets/feature-3.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import { useCountUp } from "@/hooks/use-count-up";

/* ---------------- shared atoms ---------------- */

function ToothMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M7 3c-2.5 0-4 2-4 5 0 2 .8 3.5 1.5 5.5C5.2 15.3 5.5 17 6 19c.4 1.5 1.2 2 2 2 1 0 1.3-1 1.7-3 .3-1.5.6-3 2.3-3s2 1.5 2.3 3c.4 2 .7 3 1.7 3 .8 0 1.6-.5 2-2 .5-2 .8-3.7 1.5-5.5C20.2 11.5 21 10 21 8c0-3-1.5-5-4-5-1.5 0-2.6.6-3.5 1.2C12.7 4.6 12.4 5 12 5s-.7-.4-1.5-.8C9.6 3.6 8.5 3 7 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 text-ocean">
      <span className="h-px w-8 bg-ocean" />
      <span className="text-xs font-medium tracking-[0.28em] uppercase font-body">
        {children}
      </span>
    </div>
  );
}

function MagneticButton({
  children,
  variant = "primary",
  className = "",
  href,
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  href?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(Math.max(-10, Math.min(10, mx * 0.25)));
    y.set(Math.max(-8, Math.min(8, my * 0.25)));
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium font-body transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "bg-ocean text-navy hover:bg-sky hover:text-navy"
      : variant === "outline"
        ? "border border-navy/20 text-navy hover:border-navy hover:bg-navy hover:text-cream"
        : "text-navy hover:text-ocean";

  return (
    <motion.a
      ref={ref}
      href={href ?? "#"}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.a>
  );
}

/* ---------------- navbar ---------------- */

function Navbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["rgba(250,251,252,0)", "rgba(250,251,252,0.95)"]);
  const blur = useTransform(scrollY, [0, 120], [0, 14]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const textColor = "#0B1F3A";
  const [open, setOpen] = useState(false);
  const links = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Services", "#services"],
    ["Team", "#team"],
    ["Blog", "#blog"],
    ["Contact", "#contact"],
  ];

  return (
    <motion.nav
      style={{ backgroundColor: bg, backdropFilter: filter }}
      className="fixed inset-x-0 top-0 z-50 border-b border-navy/5"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <motion.a href="#home" style={{ color: textColor }} className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ocean text-navy">
            <ToothMark className="h-5 w-5" />
          </span>
          <span className="font-display text-xl tracking-tight">PearlArc</span>
        </motion.a>

        <motion.ul
          style={{ color: textColor }}
          className="hidden items-center gap-9 text-sm font-body md:flex"
        >
          {links.map(([label, href]) => (
            <li key={label}>
              <a
                href={href}
                className="group relative inline-block py-1 transition-opacity hover:opacity-100"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-ocean transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </motion.ul>

        <div className="hidden md:block">
          <MagneticButton
            variant="outline"
            href="#contact"
            className="border-ocean bg-ocean text-navy hover:bg-sky hover:border-sky"
          >
            Book Appointment <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
        </div>

        <motion.button
          style={{ color: textColor }}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>
      </div>
    </motion.nav>
  );
}

/* ---------------- video/story modal ---------------- */

function StoryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/80 p-6 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-cream p-4"
      >
        <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-navy/10 p-2 text-navy hover:bg-navy hover:text-cream transition-colors">
          <X className="h-5 w-5" />
        </button>
        <div className="aspect-video w-full bg-navy flex items-center justify-center text-cream font-display text-2xl">
          <Play className="h-16 w-16 fill-cream" />
          <span className="ml-4">Clinic Story Video</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------------- hero ---------------- */

const headlineWords = ["Crafting", "Beautiful", "Smiles", "with"];

function HeroSection({ onWatchStory }: { onWatchStory: () => void }) {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden gradient-hero pt-32 pb-20 lg:pt-40 lg:pb-32"
    >
      <motion.div
        className="pointer-events-none absolute -top-32 -left-40 h-[520px] w-[520px] rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, var(--ocean), transparent 60%)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-40 top-20 h-[460px] w-[460px] rounded-full opacity-50"
        style={{ background: "radial-gradient(circle, var(--sky), transparent 60%)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.2fr_1fr] lg:px-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <SectionLabel>PearlArc Dental Studio</SectionLabel>
          </motion.div>

          <h1 className="font-display text-[clamp(2.6rem,6vw,5.4rem)] leading-[1.02] tracking-tight text-navy text-balance">
            <motion.span
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.12 } } }}
              className="block"
            >
              {headlineWords.map((w) => (
                <motion.span
                  key={w}
                  variants={{
                    hidden: { y: "100%", opacity: 0 },
                    show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="mr-3 inline-block overflow-hidden align-bottom"
                >
                  <span className="inline-block">{w}</span>
                </motion.span>
              ))}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="block font-italic-serif text-ocean"
            >
              Advanced Dentistry.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-muted-ink lg:text-lg"
          >
            A boutique dental studio where precision medicine meets quiet luxury. From routine
            care to full-mouth restorations  - every smile, considered.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton variant="primary" href="#contact">
              Book Appointment <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <button
              onClick={onWatchStory}
              className="group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium font-body transition-colors duration-300 text-navy hover:text-ocean"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-navy/15">
                <Play className="h-3.5 w-3.5 fill-navy text-navy" />
              </span>
              Watch our story
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute -inset-3 -z-10 rounded-[2rem] border border-ocean/40" />
            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-[2rem] bg-ocean/25" />
            <img
              src={heroDentist}
              alt="PearlArc lead dentist"
              width={960}
              height={1216}
              className="h-[560px] w-full rounded-[2rem] object-cover glow-ocean"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- reveal helper ---------------- */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- about ---------------- */

function AboutSection() {
  const items = [
    "Modern, calming clinic environment",
    "Board-certified specialists on staff",
    "Digital scans and same-day crowns",
    "Transparent pricing & easy payment plans",
  ];

  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] border border-ocean/40" />
            <img
              src={aboutClinic}
              alt="Inside the PearlArc clinic"
              loading="lazy"
              width={1024}
              height={1024}
              className="relative h-[520px] w-full rounded-[1.8rem] object-cover"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionLabel>About Us</SectionLabel>
            <h2 className="mt-5 font-display text-4xl leading-tight text-navy lg:text-5xl text-balance">
              Focused on <span className="font-italic-serif text-ocean">personalized</span> dental
              care for every patient.
            </h2>
            <p className="mt-6 max-w-xl text-muted-ink">
              We blend the precision of contemporary dentistry with the calm of a spa. Our team
              spends time understanding your goals before we touch a single tooth because lasting
              outcomes start with a careful plan.
            </p>
          </Reveal>

          <ul className="mt-8 space-y-3">
            {items.map((t, i) => (
              <Reveal key={t} delay={0.1 + i * 0.08}>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-ocean/25 text-ocean">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-navy">{t}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-4">
              <MagneticButton variant="primary" href="#contact">Contact us</MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- services ---------------- */

const services = [
  { icon: Shield, name: "Preventive Dentistry", desc: "Cleanings, sealants and exams that catch issues early. Preventive dentistry focuses on proactive measures to maintain optimal oral health." },
  { icon: Baby, name: "Pediatric Care", desc: "A gentle introduction to dentistry for our youngest patients. Pediatric care is designed to make children feel safe and comfortable." },
  { icon: Sparkles, name: "Teeth Whitening", desc: "Brighten safely with our in-clinic whitening protocol. Professional whitening ensures safe, effective results for a radiant smile." },
  { icon: Crown, name: "Dental Crowns", desc: "Same-day ceramic crowns milled in our digital lab. Crowns restore teeth to their natural shape and function." },
  { icon: Smile, name: "Orthodontics", desc: "Invisible aligners and modern braces for every age. Aligning your teeth improves both aesthetics and functional bite." },
  { icon: Activity, name: "Root Canal Therapy", desc: "Comfortable endodontic care that saves natural teeth. Root canal therapy removes infection to preserve your smile." },
  { icon: Stethoscope, name: "Dental Implants", desc: "Permanent tooth replacement with titanium implants. Implants offer a durable, long-term solution for missing teeth." },
  { icon: HeartPulse, name: "Cosmetic Dentistry", desc: "Veneers, bonding and smile makeovers, art-directed. Cosmetic treatments enhance the beauty of your smile." },
];

function ServiceCard({
    icon: Icon,
    name,
    desc,
  }: {
    icon: typeof Shield;
    name: string;
    desc: string;
  }) {
    return (
      <div
        className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-navy/5 bg-cream p-6 transition-all duration-500 hover:shadow-soft min-h-[300px]"
      >
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky text-navy transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-ocean/30">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="mt-5 font-display text-xl text-navy">{name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-ink">
            {desc}
          </p>
        </div>
      </div>
    );
  }

  function ServicesSection() {
    return (
      <section id="services" className="relative bg-sky/40 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="max-w-2xl">
              <SectionLabel>Our Services</SectionLabel>
              <h2 className="mt-5 font-display text-4xl leading-tight text-navy lg:text-5xl text-balance">
                A full spectrum of{" "}
                <span className="font-italic-serif text-ocean">professional</span> dental care.
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.06}>
                <ServiceCard {...s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }
/* ---------------- metrics ---------------- */

function Metric({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const value = useCountUp(target, 1800, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl bg-cream p-10 text-center"
    >
      <div className="font-display text-6xl text-navy lg:text-7xl">
        {value}
        {suffix}
      </div>
      <div className="mt-3 text-sm uppercase tracking-widest text-muted-ink">{label}</div>
    </motion.div>
  );
}

function MetricsSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-center font-display text-4xl leading-tight text-navy lg:text-5xl text-balance">
            Measuring our success with{" "}
            <span className="font-italic-serif text-ocean">key metrics.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 rounded-[2rem] bg-gradient-to-br from-sky to-ocean/30 p-4 lg:grid-cols-3">
          <Metric target={95} suffix="%" label="Patient satisfaction" />
          <Metric target={10000} suffix="+" label="Happy clients" />
          <Metric target={300} suffix="+" label="Team members" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- why us ---------------- */

const features = [
  {
    img: feature1,
    tag: "Expert Team",
    title: "Experienced dental professionals",
    desc: "A roster of specialists with decades of combined practice, continuously trained.",
    details: "Our team consists of world-class specialists who have trained at top-tier institutions. We prioritize continuous education to ensure we bring the latest techniques and care standards to our patients. From complex oral surgeries to gentle pediatric care, our experts are here to guide you through every step of your dental journey.",
  },
  {
    img: feature2,
    tag: "Technology",
    title: "Advanced technology used",
    desc: "Digital scanning, 3D imaging and same-day milling for precise, comfortable care.",
    details: "We invest in the future of dentistry. Our clinic is equipped with the latest digital scanners, 3D cone-beam imaging, and CEREC same-day crown technology. This means no more messy impressions, faster diagnosis, and most treatments completed in a single visit. Precision and comfort are at the heart of everything we do.",
  },
  {
    img: feature3,
    tag: "Care",
    title: "Personalized patient care",
    desc: "Every plan is built around your goals, schedule and comfort, never a template.",
    details: "Your smile is as unique as your fingerprint. That's why we don't believe in one-size-fits-all treatments. We take the time to listen to your concerns, understand your goals, and design a customized plan that fits your lifestyle. Whether you're looking for a complete smile makeover or routine maintenance, we provide care that is truly tailored to you.",
  },
];

function WhyUsSection() {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => setSelected(null);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <section id="why-us" className="relative bg-sky/30 py-24 text-navy lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <AnimatePresence mode="wait">
          {selected === null ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Reveal>
                <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                  <div>
                    <SectionLabel>Why us</SectionLabel>
                    <h2 className="mt-5 font-display text-4xl leading-tight lg:text-5xl text-balance">
                      Reasons our patients choose us{" "}
                      <span className="font-italic-serif text-ocean">every time.</span>
                    </h2>
                  </div>
                  <div className="lg:border-l lg:border-navy/10 lg:pl-10">
                    <p className="text-muted-ink leading-relaxed">
                      "Walking in feels like a quiet hotel. Walking out, I just had the best dental visit of
                      my life." - a recent guest review, lightly edited for length.
                    </p>
                  </div>
                </div>
              </Reveal>

              <div className="mt-16 grid gap-6 md:grid-cols-3">
                {features.map((f, i) => (
                  <Reveal key={f.title} delay={i * 0.08}>
                    <div className="group relative flex flex-col h-full overflow-hidden rounded-3xl bg-cream shadow-soft">
                      <div className="overflow-hidden">
                        <img
                          src={f.img}
                          alt={f.title}
                          loading="lazy"
                          className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-col flex-1 p-8">
                        <div>
                          <span className="inline-block rounded-full bg-ocean/20 px-3 py-1 text-xs uppercase tracking-widest text-ocean">
                            {f.tag}
                          </span>
                          <h3 className="mt-4 font-display text-2xl text-navy line-clamp-2 min-h-[4rem]">
                            {f.title}
                          </h3>
                          <p className="mt-2 text-sm text-muted-ink line-clamp-3">
                            {f.desc}
                          </p>
                        </div>
                        <div className="mt-auto pt-8">
                          <button
                            onClick={() => setSelected(i)}
                            className="inline-flex items-center gap-2 text-sm font-medium text-ocean hover:text-navy transition-colors"
                          >
                            View details <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-[2.5rem] bg-cream p-8 lg:p-16 shadow-soft"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-8 top-8 rounded-full bg-navy/5 p-3 text-navy hover:bg-navy hover:text-cream transition-colors z-10"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div className="relative aspect-square overflow-hidden rounded-3xl">
                  <img
                    src={features[selected].img}
                    alt={features[selected].title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <span className="inline-block rounded-full bg-ocean/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-ocean">
                    {features[selected].tag}
                  </span>
                  <h2 className="mt-6 font-display text-4xl text-navy lg:text-5xl">
                    {features[selected].title}
                  </h2>
                  <p className="mt-8 text-lg leading-relaxed text-muted-ink">
                    {features[selected].details}
                  </p>
                  <div className="mt-12">
                    <MagneticButton variant="primary" href="#contact">
                      Book appointment <ArrowUpRight className="h-4 w-4" />
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------------- testimonials ---------------- */

const testimonials = [
  {
    img: testimonial1,
    name: "Emily Johnson",
    role: "Whitening · Hygiene",
    quote:
      "The team is so welcoming. I genuinely look forward to my visits now. They explained every step before treatment, and my smile has never looked better.",
  },
  {
    img: testimonial2,
    name: "Marcus Chen",
    role: "Cosmetic veneers",
    quote:
      "Best whitening and veneer results I've ever had. Down to the lighting and music, this place feels less like a clinic and more like a five-star spa.",
  },
  {
    img: testimonial3,
    name: "Sarah Williams",
    role: "Family · Pediatric",
    quote:
      "My kids actually look forward to dental visits now. The pediatric team turned what used to be a struggle into something we all enjoy.",
  },
];

function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);
  const t = testimonials[index];

  return (
    <section className="relative bg-cream py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:px-10">
        <div className="relative h-[480px] overflow-hidden rounded-[2rem]">
          <AnimatePresence mode="wait">
            <motion.img
              key={t.img}
              src={t.img}
              alt={t.name}
              loading="lazy"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        </div>

        <div>
          <SectionLabel>Client Testimonials</SectionLabel>
          <h2 className="mt-5 font-display text-4xl leading-tight text-navy lg:text-5xl text-balance">
            What our patients <span className="font-italic-serif text-ocean">say.</span>
          </h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <p className="font-display text-2xl leading-snug text-navy lg:text-3xl text-balance">
                "{t.quote}"
              </p>
              <div className="mt-8 flex items-center gap-4">
                <img
                  src={t.img}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <div className="font-medium text-navy">{t.name}</div>
                  <div className="text-sm text-muted-ink">{t.role}</div>
                </div>
                <div className="ml-auto flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 * i, type: "spring", stiffness: 200 }}
                    >
                      <Star className="h-4 w-4 fill-ocean text-ocean" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------------- team ---------------- */

const team = [
  { img: doctor1, name: "Dr. Michael Roberts", role: "Orthodontist" },
  { img: doctor2, name: "Dr. David Hernandez", role: "Endodontist" },
  { img: doctor3, name: "Dr. Emily Johnson", role: "Oral & Maxillofacial Surgeon" },
];

function TeamSection() {
  return (
    <section id="team" className="relative bg-sky/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-2xl font-display text-4xl leading-tight text-navy lg:text-5xl text-balance">
              Meet our dedicated{" "}
              <span className="font-italic-serif text-ocean">dental professionals.</span>
            </h2>
            <MagneticButton variant="primary" href="#contact">
              Book appointment <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <div className="group relative overflow-hidden rounded-3xl bg-cream p-6 transition-shadow hover:shadow-soft">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 scale-90 rounded-full bg-ocean/30 transition-transform duration-500 group-hover:scale-100" />
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    className="relative h-full w-full object-cover"
                  />
                </div>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <h3 className="font-display text-2xl text-navy transition-colors group-hover:text-ocean">
                      {m.name}
                    </h3>
                    <p className="text-sm text-muted-ink">{m.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- pricing ---------------- */

const plans = [
  {
    name: "Standard Plan",
    monthly: 49,
    visit: 129,
    features: [
      "Everything in Basic Plan",
      "2 additional cleanings per year",
      "Fluoride treatments",
      "Basic periodontal therapy",
      "15% discount on major procedures",
    ],
    popular: false,
  },
  {
    name: "Premium Plan",
    monthly: 89,
    visit: 199,
    features: [
      "All Standard Plan features",
      "Whitening session included",
      "Emergency care priority",
      "Annual X-rays included",
      "25% discount on major procedures",
    ],
    popular: true,
  },
];

function PricingSection() {
  const [monthly, setMonthly] = useState(false);
  return (
    <section id="pricing" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="text-center">
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-tight text-navy lg:text-5xl text-balance">
              Personalized dental plans for{" "}
              <span className="font-italic-serif text-ocean">every budget.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div
                className={`relative overflow-hidden rounded-3xl p-10 transition-shadow hover:shadow-soft ${
                  p.popular ? "bg-ocean/20 border-2 border-ocean text-navy" : "bg-cream border border-navy/10"
                }`}
              >
                {p.popular && (
                  <span className="absolute right-6 top-6 rounded-full bg-ocean px-3 py-1 text-xs uppercase tracking-widest text-navy">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-2xl">{p.name}</h3>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-6xl">${monthly ? p.monthly : p.visit}</span>
                  <span className="text-muted-ink">
                    {monthly ? "/month" : "/per visit"}
                  </span>
                </div>
                <ul className="mt-8 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-ocean/25 text-ocean"
                      >
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-navy">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm text-cream hover:bg-ocean hover:text-navy transition-colors"
                >
                  Book consultation <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- faq ---------------- */

const faqs = [
  ["What should I expect during my first exam?", "We start with a calm chat about your goals and history, then perform a comprehensive exam: digital X-rays, intra-oral scan and an oral cancer screening. You leave with a clear plan and pricing, no surprises."],
  ["How often should I visit the dentist?", "Most patients benefit from a hygiene visit every six months. We'll personalize that cadence based on your gum health, history and lifestyle."],
  ["What is teeth whitening and is it safe?", "Yes. Our in-clinic whitening uses medical-grade peroxide gels under controlled conditions. Most patients see 4–8 shades of improvement in a single session."],
  ["Do you accept dental insurance plans?", "We accept most major PPO plans and will file claims on your behalf. Bring your insurance card to your first visit and we'll handle the rest."],
  ["Can I pay for treatments in installments?", "Absolutely. We partner with CareCredit and offer in-house monthly plans so cost never gets in the way of the care you need."],
  ["How long does a dental implant procedure take?", "From placement to final crown, most cases take 3-6 months most of which is healing. Same-day temporary teeth keep you smiling throughout."],
];

function FAQItem({ q, a, open, onClick }: { q: string; a: string; open: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-navy/10">
      <button
        onClick={onClick}
        className="group flex w-full items-start justify-between gap-6 py-6 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-xl text-navy lg:text-2xl">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ocean/20 text-ocean"
        >
          <Plus className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-12 text-muted-ink">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative bg-sky/40 py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <Reveal>
          <div className="text-center">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mx-auto mt-5 font-display text-4xl leading-tight text-navy lg:text-5xl text-balance">
              Frequently asked questions about{" "}
              <span className="font-italic-serif text-ocean">our services.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-14">
          {faqs.map(([q, a], i) => (
            <Reveal key={q} delay={i * 0.04}>
              <FAQItem q={q} a={a} open={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- blog ---------------- */

const posts = [
  {
    img: blog1,
    date: "July 7, 2024",
    category: "Hygiene",
    title: "The importance of daily flossing for whole-body health",
    excerpt: "Why those two minutes matter more than you think and a simple routine that sticks.",
    content: "Flossing is often the most neglected part of oral hygiene, yet it's one of the most critical. Plaque that builds up between teeth cannot be reached by a toothbrush alone. This buildup leads to gingivitis, which, if left untreated, can develop into periodontitis. Recent studies have also linked gum disease to broader systemic issues like heart disease and diabetes. A simple two-minute flossing routine every night can significantly lower your risk of these complications and keep your smile bright and healthy.",
  },
  {
    img: blog2,
    date: "July 6, 2024",
    category: "Treatments",
    title: "When root canal therapy is actually necessary",
    excerpt: "Modern endodontics is faster and gentler than it used to be. Here's how to know it's time.",
    content: "The term 'root canal' often strikes fear into patients, but modern endodontics is a virtually painless procedure designed to save your natural tooth. A root canal becomes necessary when the pulp inside your tooth becomes infected or inflamed due to deep decay, repeated dental procedures, or a crack. Symptoms include persistent pain, sensitivity to heat or cold, and swelling. By removing the infected pulp and sealing the tooth, we can eliminate pain and prevent the need for an extraction. It's a routine procedure that preserves your natural smile.",
  },
  {
    img: blog3,
    date: "July 6, 2024",
    category: "Family",
    title: "Dental care tips for young children that actually work",
    excerpt: "Small habits, big payoffs, a pediatric dentist's playbook for happy little smiles.",
    content: "Setting the foundation for a lifetime of healthy smiles starts early. The key to pediatric dentistry is making the experience positive and engaging. We recommend starting dental visits as soon as the first tooth appears. At home, turn brushing into a game or use a timer with a fun song. Avoid sugary snacks and drinks, especially before bed. By making oral hygiene a normal and fun part of the daily routine, you help your child avoid the 'dental anxiety' that many adults face and ensure their permanent teeth have a healthy start.",
  },
];

function BlogSection() {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => setSelected(null);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <section id="blog" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <AnimatePresence mode="wait">
          {selected === null ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Reveal>
                <h2 className="max-w-2xl font-display text-4xl leading-tight text-navy lg:text-5xl text-balance">
                  Explore our latest <span className="font-italic-serif text-ocean">articles.</span>
                </h2>
              </Reveal>

              <div className="mt-14 grid gap-8 md:grid-cols-3">
                {posts.map((p, i) => (
                  <Reveal key={p.title} delay={i * 0.08}>
                    <article className="group flex flex-col">
                      <div className="overflow-hidden rounded-3xl">
                        <img
                          src={p.img}
                          alt={p.title}
                          loading="lazy"
                          className="aspect-[16/11] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="mt-6 flex items-center gap-3 text-xs">
                        <span className="text-muted-ink">{p.date}</span>
                        <span className="rounded-full bg-ocean/20 px-3 py-1 uppercase tracking-widest text-ocean">
                          {p.category}
                        </span>
                      </div>
                      <h3 className="mt-4 line-clamp-2 font-display text-2xl text-navy">{p.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-ink">{p.excerpt}</p>
                      <button
                        onClick={() => setSelected(i)}
                        className="mt-5 inline-flex items-center gap-2 text-sm text-navy font-medium hover:text-ocean transition-colors"
                      >
                        View details
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </article>
                  </Reveal>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-[2.5rem] bg-cream p-8 lg:p-16 shadow-soft"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-8 top-8 rounded-full bg-navy/5 p-3 text-navy hover:bg-navy hover:text-cream transition-colors z-10"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div className="relative aspect-video overflow-hidden rounded-3xl">
                  <img
                    src={posts[selected].img}
                    alt={posts[selected].title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-muted-ink">{posts[selected].date}</span>
                    <span className="rounded-full bg-ocean/20 px-3 py-1 uppercase tracking-widest text-ocean">
                      {posts[selected].category}
                    </span>
                  </div>
                  <h2 className="mt-6 font-display text-4xl text-navy lg:text-5xl">
                    {posts[selected].title}
                  </h2>
                  <p className="mt-8 text-lg leading-relaxed text-muted-ink">
                    {posts[selected].content}
                  </p>
                  <div className="mt-12">
                    <MagneticButton variant="primary" href="#contact">
                      Contact author <ArrowRight className="h-4 w-4" />
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------------- cta banner ---------------- */

function CTASection() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-ocean/10 to-sky/40 p-8 text-navy lg:p-16">
          <motion.div
            className="absolute -left-20 -top-20 h-80 w-80 bg-ocean/20"
            style={{ animation: "blob 14s ease-in-out infinite" }}
          />
          <motion.div
            className="absolute -right-32 bottom-0 h-96 w-96 bg-sky/20"
            style={{ animation: "blob 18s ease-in-out infinite reverse" }}
          />

          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionLabel>Book Appointment</SectionLabel>
              <h2 className="mt-5 font-display text-4xl leading-tight lg:text-6xl text-balance">
                Ready for your <span className="font-italic-serif text-ocean">new smile?</span>
              </h2>
              <p className="mt-6 max-w-lg text-muted-ink">
                Fill out the form to request your complimentary consultation. Our team will contact
                you within 24 hours to confirm your time.
              </p>
              
              <div className="mt-12 space-y-6">
                {[
                  { label: "Email", value: "hello@oceanarc.dental" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="text-xs uppercase tracking-widest text-ocean font-medium">
                      {item.label}
                    </div>
                    <div className="mt-1 text-lg font-display">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-cream/50 p-6 shadow-soft backdrop-blur-sm lg:p-10">
              <form className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-navy/70 ml-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      className="w-full rounded-2xl border border-navy/10 bg-cream/50 px-5 py-3.5 text-navy outline-none transition-all focus:border-ocean focus:ring-2 focus:ring-ocean/10"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-navy/70 ml-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      className="w-full rounded-2xl border border-navy/10 bg-cream/50 px-5 py-3.5 text-navy outline-none transition-all focus:border-ocean focus:ring-2 focus:ring-ocean/10"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-navy/70 ml-1">Service</label>
                  <select className="w-full rounded-2xl border border-navy/10 bg-cream/50 px-5 py-3.5 text-navy outline-none transition-all focus:border-ocean focus:ring-2 focus:ring-ocean/10 appearance-none">
                    <option>General Consultation</option>
                    <option>Teeth Whitening</option>
                    <option>Dental Implants</option>
                    <option>Orthodontics</option>
                    <option>Cosmetic Dentistry</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-navy/70 ml-1">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your goals..."
                    className="w-full rounded-2xl border border-navy/10 bg-cream/50 px-5 py-3.5 text-navy outline-none transition-all focus:border-ocean focus:ring-2 focus:ring-ocean/10"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-navy py-4 text-sm font-medium text-cream transition-all hover:bg-ocean hover:text-navy"
                >
                  Send Request <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- footer ---------------- */

function Footer() {
  return (
    <footer className="relative bg-cream border-t border-navy/10 text-navy">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <a href="#home" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ocean text-navy">
                <ToothMark className="h-5 w-5" />
              </span>
              <span className="font-display text-2xl">PearlArc</span>
            </a>
            <p className="mt-6 max-w-xs text-sm text-muted-ink">
              A boutique dental studio where precision medicine meets quiet luxury every smile,
              considered.
            </p>
          </div>

          {[
            ["Main", ["Home", "About", "Contact", "Blog"]],
            ["Services", ["Preventive", "Whitening", "Implants", "Orthodontics"]],
            ["Visit us", ["hello@oceanarc.dental"]],
          ].map(([title, items]) => (
            <div key={title as string}>
              <h4 className="font-display text-lg text-ocean">{title}</h4>
              <ul className="mt-5 space-y-3 text-sm text-muted-ink">
                {(items as string[]).map((it) => (
                  <li key={it}>
                    <a href="#" className="transition-colors hover:text-navy hover:font-medium">
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-end gap-4 border-t border-navy/10 pt-8 text-xs text-muted-ink">
          <a 
            href="https://axistechgroup.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-ocean transition-colors"
          >
            Powered by AxisTechGroup
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- page ---------------- */

export default function PearlArcPage() {
  const [showStory, setShowStory] = useState(false);

  return (
    <main className="min-h-screen bg-cream text-navy">
      <StoryModal open={showStory} onClose={() => setShowStory(false)} />
      <Navbar />
      <HeroSection onWatchStory={() => setShowStory(true)} />
      <AboutSection />
      <ServicesSection />
      <MetricsSection />
      <WhyUsSection />
      <TestimonialsSection />
      <TeamSection />
      <PricingSection />
      <FAQSection />
      <BlogSection />
      <CTASection />
      <Footer />
    </main>
  );
}
