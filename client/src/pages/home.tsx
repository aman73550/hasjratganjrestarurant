import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Star, ChevronDown, Menu, X, Utensils, Users, Car, Mic2, Music2, Sparkles, ArrowRight, Quote, Instagram, Facebook, Clock, Mail, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";

const NAV_LINKS = [
  { label: "Banquet", href: "#banquet" },
  { label: "Cuisine", href: "#cuisine" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const VENUE_GALLERY = [
  { src: "/images/gallery-hall-1.png", title: "Grand Banquet Hall", desc: "600+ seat capacity with signature wall-lit LED panels" },
  { src: "/images/gallery-hall-2.png", title: "Fine Dining Lounge", desc: "Intimate dining area with warm golden ambiance" },
  { src: "/images/gallery-hall-3.png", title: "Wedding Stage", desc: "Exquisite wedding mandap with floral decor" },
  { src: "/images/gallery-hall-4.png", title: "Bridal Suite", desc: "Ultra-modern bridal dressing room" },
  { src: "/images/gallery-hall-5.png", title: "Grand Entrance", desc: "Majestic corridor with golden wall lighting" },
  { src: "/images/gallery-hall-6.png", title: "Terrace Lounge", desc: "Open-air event space with fairy lights" },
];

const FOOD_GALLERY = [
  { src: "/images/food-galawat.png", title: "Mutton Galawat Kebab", desc: "Silver leaf garnished, melt-in-mouth perfection" },
  { src: "/images/food-biryani.png", title: "Awadhi Dum Biryani", desc: "Slow-cooked in a traditional copper handi" },
  { src: "/images/food-angara.png", title: "Angara Seekh Kebab", desc: "Live charcoal roasted with aromatic spices" },
  { src: "/images/food-thali.png", title: "Royal Thali Platter", desc: "A grand spread of North Indian favorites" },
  { src: "/images/food-tandoori.png", title: "Tandoori Chicken Tikka", desc: "Charred and succulent, served on banana leaf" },
  { src: "/images/food-desserts.png", title: "Heritage Desserts", desc: "Gulab jamun, rasmalai & kulfi selection" },
];

const REVIEWS = [
  {
    id: 1,
    name: "Priya Sharma",
    event: "Wedding Reception",
    rating: 5,
    text: "The wall-lit ambiance at Hazratgunj was absolutely breathtaking. Our guests were in awe from the moment they walked in. The Galawat Kebabs were divine and the staff service was impeccable.",
    date: "February 2026",
  },
  {
    id: 2,
    name: "Rahul Agarwal",
    event: "Corporate Dinner",
    rating: 5,
    text: "Gorakhpur has never seen anything like this! The boutique banquet experience is truly world-class. The lighting system eliminates the need for any external decoration — it IS the decor.",
    date: "January 2026",
  },
  {
    id: 3,
    name: "Sunita Mishra",
    event: "Anniversary Celebration",
    rating: 5,
    text: "From the Raaz-e-Kalimirch Biryani to the Angara Kebabs, every dish was a masterpiece. The bridal suite is ultra-modern and the team handled every detail with perfection.",
    date: "December 2025",
  },
  {
    id: 4,
    name: "Amit Singh",
    event: "Birthday Gala",
    rating: 5,
    text: "Booked for my father's 60th birthday. The underground parking made it so convenient for all 400+ guests. The sound and DJ system was top-of-the-line. Will always recommend Hazratgunj!",
    date: "November 2025",
  },
];

const DISHES = [
  {
    name: "Raaz-e-Kalimirch Biryani",
    desc: "Long-grain basmati slow-cooked with black pepper, whole spices, and aged saffron — a royal dum preparation.",
    tag: "Chef's Signature",
    icon: "🍚",
  },
  {
    name: "Mutton Galawat Kebab",
    desc: "Silken minced mutton patties with 50 spices, hand-crafted by our master kebab chef — melts at first bite.",
    tag: "Heritage Recipe",
    icon: "🔥",
  },
  {
    name: "Angara Kebab",
    desc: "Skewered lamb slow-roasted over live coals with an aromatic marinade, finished with a coal-smoke infusion.",
    tag: "Live Charcoal",
    icon: "✨",
  },
];

const AMENITIES = [
  { icon: Utensils, title: "Professional Catering & Decor", desc: "In-house culinary team with dedicated event decorators for a seamless experience." },
  { icon: Sparkles, title: "Ultra-Modern Bridal Suites", desc: "Luxuriously appointed bridal dressing rooms with vanity, lounge, and premium furnishings." },
  { icon: Music2, title: "Premium Sound & DJ Systems", desc: "State-of-the-art Bose sound and DJ consoles that deliver concert-quality audio." },
  { icon: Car, title: "Underground Parking", desc: "Ample covered parking for 200+ vehicles directly below the banquet hall." },
  { icon: Mic2, title: "AV & Projection Systems", desc: "4K LED walls and professional AV setups for presentations and entertainment." },
  { icon: MapPin, title: "Prime Airport Road Location", desc: "Easily accessible from all parts of Gorakhpur on the prestigious Airport Road." },
];

function useScrolled(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-nav py-3" : "bg-transparent py-5"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.a
            href="#"
            className="flex flex-col leading-none"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            <span className="font-serif font-bold text-xl text-white tracking-wide">Hazratgunj</span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-sans">Restaurant & Banquet</span>
          </motion.a>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-sm tracking-wider text-white/80 uppercase font-sans transition-colors duration-200 cursor-pointer"
                style={{ letterSpacing: "0.1em" }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                onMouseEnter={e => (e.currentTarget.style.color = "#D4AF37")}
                onMouseLeave={e => (e.currentTarget.style.color = "")}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="tel:+919076923170"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button
                className="gold-gradient-bg text-black font-semibold text-sm tracking-wider px-6 border-0"
                data-testid="button-book-nav"
              >
                Book Now
              </Button>
            </motion.a>
          </nav>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setOpen(true)}
            data-testid="button-mobile-menu"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col"
            style={{ background: "rgba(5,3,1,0.97)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center p-6">
              <span className="font-serif font-bold text-xl text-white tracking-wide">Hazratgunj</span>
              <button className="text-white p-2" onClick={() => setOpen(false)} data-testid="button-close-menu">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="text-2xl font-serif text-white/90 tracking-wide cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </motion.a>
              ))}
              <a href="tel:+919076923170" className="mt-4">
                <Button className="gold-gradient-bg text-black font-bold text-lg px-10 py-6 border-0" data-testid="button-mobile-book">
                  Book Your Event
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function GoldenParticles() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(212,175,55,0.8) 0%, rgba(212,175,55,0) 70%)`,
            boxShadow: `0 0 ${p.size * 3}px rgba(212,175,55,0.4)`,
          }}
          animate={{
            y: [0, -60, -120],
            x: [0, Math.random() > 0.5 ? 15 : -15, 0],
            opacity: [0, 0.9, 0],
            scale: [0.5, 1, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden" id="hero">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img
          src="/images/hero-banquet.png"
          alt="Hazratgunj Banquet Hall Interior"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.85) saturate(1.15)" }}
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, rgba(3,2,1,0.7) 0%, rgba(3,2,1,0.25) 35%, rgba(3,2,1,0.15) 50%, rgba(3,2,1,0.4) 75%, rgba(3,2,1,0.9) 100%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center 40%, transparent 0%, rgba(3,2,1,0.5) 70%)"
        }} />
      </motion.div>

      <GoldenParticles />

      <motion.div className="relative z-10 text-center px-5 md:px-6 max-w-5xl mx-auto pt-20 pb-20 md:pt-0 md:pb-0" style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-4 md:mb-6"
        >
          <span className="inline-flex items-center gap-1.5 md:gap-2 text-[9px] md:text-xs tracking-[0.25em] md:tracking-[0.4em] uppercase text-gold font-sans px-4 md:px-5 py-2 md:py-2.5 rounded-full"
            style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.25)", backdropFilter: "blur(8px)" }}>
            <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3" />
            Gorakhpur's Premier Boutique Banquet
            <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3" />
          </span>
        </motion.div>

        <motion.h1
          className="font-serif text-white mb-3 md:mb-6 leading-[1.1]"
          style={{ fontSize: "clamp(1.9rem, 6vw, 5rem)", textShadow: "0 4px 60px rgba(0,0,0,0.6), 0 0 120px rgba(212,175,55,0.1)" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          The Pinnacle of
          <br />
          <motion.span
            className="gold-shimmer inline-block"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Purvanchal's
          </motion.span>{" "}
          <motion.span
            className="inline-block italic"
            style={{ fontWeight: 400 }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Elegance
          </motion.span>
        </motion.h1>

        <motion.div
          className="flex items-center justify-center gap-4 mb-3 md:mb-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <div className="h-px flex-1 max-w-[50px] md:max-w-[100px]" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5))" }} />
          <Star className="w-3 h-3 text-gold fill-gold" />
          <div className="h-px flex-1 max-w-[50px] md:max-w-[100px]" style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.5), transparent)" }} />
        </motion.div>

        <motion.p
          className="text-white/70 text-sm md:text-lg max-w-xl mx-auto mb-6 md:mb-10 font-sans font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Experience Gorakhpur's first wall-lit boutique banquet hall —
          <span className="text-white/90"> a symphony of Awadhi tradition</span> and ultra-modern luxury.
        </motion.p>

        <motion.div
          className="flex flex-row items-center justify-center gap-3 mb-6 md:mb-14"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <a href="tel:+919076923170">
            <Button
              className="gold-gradient-bg text-black font-bold text-xs md:text-base px-5 md:px-8 border-0 tracking-wider"
              data-testid="button-book-event"
            >
              Book Your Event <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 ml-1.5 md:ml-2" />
            </Button>
          </a>
          <a
            href="#cuisine"
            onClick={(e) => { e.preventDefault(); document.querySelector("#cuisine")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            <Button
              variant="outline"
              className="border-white/30 text-white font-semibold text-xs md:text-base px-5 md:px-8 tracking-wider"
              style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
              data-testid="button-view-menu"
            >
              View Menu
            </Button>
          </a>
        </motion.div>

        <motion.div
          className="inline-flex items-center gap-4 sm:gap-6 md:gap-8 px-5 md:px-10 py-3 md:py-5 rounded-full"
          style={{ background: "rgba(6,4,2,0.5)", border: "1px solid rgba(212,175,55,0.15)", backdropFilter: "blur(16px)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <div className="text-center">
            <div className="font-serif text-xl md:text-3xl font-bold text-gold leading-none">
              <AnimatedCounter target={600} suffix="+" />
            </div>
            <div className="text-[8px] md:text-[10px] tracking-[0.12em] md:tracking-[0.2em] uppercase mt-1 font-sans text-white/50">Guests</div>
          </div>
          <div className="w-px h-7 md:h-10" style={{ background: "rgba(212,175,55,0.2)" }} />
          <div className="text-center">
            <div className="font-serif text-xl md:text-3xl font-bold text-gold leading-none flex items-center justify-center gap-0.5">
              <AnimatedCounter target={49} />
              <span className="text-sm md:text-lg">/5</span>
            </div>
            <div className="text-[8px] md:text-[10px] tracking-[0.12em] md:tracking-[0.2em] uppercase mt-1 font-sans text-white/50">Rating</div>
          </div>
          <div className="w-px h-7 md:h-10" style={{ background: "rgba(212,175,55,0.2)" }} />
          <div className="text-center">
            <div className="font-serif text-xl md:text-3xl font-bold text-gold leading-none">
              <AnimatedCounter target={500} suffix="+" />
            </div>
            <div className="text-[8px] md:text-[10px] tracking-[0.12em] md:tracking-[0.2em] uppercase mt-1 font-sans text-white/50">Events</div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-16 lg:bottom-8 left-1/2 -translate-x-1/2 text-white/30 flex-col items-center gap-1 z-10 hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase font-sans">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
            <motion.div
              className="w-1 h-1.5 rounded-full bg-gold"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function BanquetSection() {
  const features = [
    { num: "600+", label: "Guest Capacity", desc: "Grand venue accommodating intimate gatherings to large royal celebrations." },
    { num: "P1", label: "Underground Parking", desc: "Dedicated underground parking for 200+ vehicles — a first in the region." },
    { num: "360°", label: "Wall-Lit Interiors", desc: "Stunning LED wall-lighting transforms the space — no external decor required." },
  ];

  return (
    <section id="banquet" className="relative py-28 overflow-hidden" style={{ background: "#0A0804" }}>
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs tracking-[0.4em] uppercase text-gold font-sans">The Experience</span>
          <h2 className="font-serif text-white mt-3 mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            A Canvas of Light & Luxury
          </h2>
          <div className="section-divider" />
          <p className="text-white/60 max-w-2xl mx-auto mt-6 font-sans leading-relaxed">
            Hazratgunj Banquet Hall redefines celebration spaces in Purvanchal. Our award-winning wall-lit interior creates an atmosphere so magical, the walls themselves become the decor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-md overflow-hidden"
            style={{ height: "460px" }}
          >
            <img
              src="/images/hero-banquet.png"
              alt="Banquet Hall Interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(5,3,1,0.3) 0%, transparent 60%)" }} />
            <div className="absolute bottom-6 left-6 glass-card rounded-md px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <span className="text-white font-semibold text-sm ml-1">4.9 / 5</span>
              </div>
              <p className="text-white/60 text-xs mt-1 font-sans">Rated by 500+ verified visitors</p>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                className="flex gap-6 items-start glass-card rounded-md p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i, duration: 0.6 }}
                data-testid={`card-feature-${i}`}
              >
                <div className="font-serif text-4xl font-bold text-gold leading-none mt-1 min-w-[4rem]">{f.num}</div>
                <div>
                  <h3 className="font-serif text-white text-xl mb-2">{f.label}</h3>
                  <p className="text-white/55 font-sans text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative rounded-md overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ height: "320px" }}
        >
          <img src="/images/exterior.png" alt="Hazratgunj Exterior" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(5,3,1,0.85) 0%, rgba(5,3,1,0.4) 60%, transparent 100%)" }} />
          <div className="absolute inset-0 flex items-center px-10 lg:px-16">
            <div className="max-w-lg">
              <span className="text-xs tracking-[0.35em] uppercase text-gold font-sans">Prime Location</span>
              <h3 className="font-serif text-white text-3xl md:text-4xl mt-3 mb-3 leading-tight">
                Airport Road's<br />Finest Address
              </h3>
              <p className="text-white/65 font-sans text-sm leading-relaxed mb-5">
                Located at UGF, Ayodhya Prasad Apartments, Airport Road, Mohaddipur — easily accessible from every part of Gorakhpur.
              </p>
              <a href="https://maps.google.com/?q=Airport+Road+Mohaddipur+Gorakhpur" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-gold/50 text-gold font-semibold text-sm tracking-wider" style={{ background: "rgba(212,175,55,0.08)" }} data-testid="button-directions">
                  Get Directions <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CuisineSection() {
  const cuisines = ["North Indian", "Mughlai / Awadhi", "Chinese", "Continental"];

  return (
    <section id="cuisine" className="relative py-28 overflow-hidden" style={{ background: "#060402" }}>
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-20"
        style={{ background: "radial-gradient(ellipse at right, rgba(212,175,55,0.15) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs tracking-[0.4em] uppercase text-gold font-sans">The Kitchen</span>
          <h2 className="font-serif text-white mt-3 mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Authentic Flavors,<br />Timeless Heritage
          </h2>
          <div className="section-divider" />
          <p className="text-white/60 max-w-2xl mx-auto mt-6 font-sans leading-relaxed">
            Our master chefs draw from centuries-old Awadhi culinary traditions, crafting each dish as a work of art. Every meal at Hazratgunj is a journey through Purvanchal's royal gastronomic legacy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-20">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {DISHES.map((dish, i) => (
              <motion.div
                key={dish.name}
                className="glass-card rounded-md p-6 group cursor-default"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i, duration: 0.6 }}
                data-testid={`card-dish-${i}`}
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-md flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}>
                    <Utensils className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-serif text-white text-lg">{dish.name}</h3>
                      <span className="text-xs tracking-wider uppercase text-black font-semibold px-2 py-0.5 rounded-sm bg-gold/90">
                        {dish.tag}
                      </span>
                    </div>
                    <p className="text-white/55 font-sans text-sm leading-relaxed">{dish.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              className="mt-6 p-5 rounded-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}
            >
              <p className="text-gold/80 text-xs tracking-[0.3em] uppercase font-sans mb-3">Multi-Cuisine Expertise</p>
              <div className="flex flex-wrap gap-2">
                {cuisines.map((c) => (
                  <span key={c} className="text-white/70 text-sm font-sans border border-white/10 rounded-sm px-3 py-1">
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative rounded-md overflow-hidden"
            style={{ height: "500px" }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="/images/food-platter.png"
              alt="Signature Awadhi Cuisine"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,3,1,0.7) 0%, transparent 60%)" }} />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-gold text-xs tracking-[0.3em] uppercase font-sans mb-1">Awadhi Heritage Kitchen</p>
              <p className="text-white font-serif text-lg">Crafted with love,<br />served with royalty.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AmenitiesSection() {
  return (
    <section id="amenities" className="py-28 relative overflow-hidden" style={{ background: "#0A0804" }}>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs tracking-[0.4em] uppercase text-gold font-sans">World-Class Facilities</span>
          <h2 className="font-serif text-white mt-3 mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Luxury Amenities
          </h2>
          <div className="section-divider" />
          <p className="text-white/60 max-w-xl mx-auto mt-6 font-sans leading-relaxed">
            Every element of Hazratgunj has been designed to make your celebration effortless, memorable, and extraordinary.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AMENITIES.map((amenity, i) => {
            const Icon = amenity.icon;
            return (
              <motion.div
                key={amenity.title}
                className="glass-card rounded-md p-7 hover-elevate"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.6 }}
                data-testid={`card-amenity-${i}`}
              >
                <div className="w-12 h-12 rounded-md flex items-center justify-center mb-5"
                  style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}>
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-serif text-white text-lg mb-3">{amenity.title}</h3>
                <p className="text-white/55 font-sans text-sm leading-relaxed">{amenity.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GalleryLightbox({ images, activeIndex, onClose, onPrev, onNext }: {
  images: typeof VENUE_GALLERY;
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button className="absolute top-6 right-6 text-white/70 z-10 p-2" onClick={onClose} data-testid="button-lightbox-close">
        <X className="w-7 h-7" />
      </button>
      <button className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/60 p-2 z-10" onClick={(e) => { e.stopPropagation(); onPrev(); }} data-testid="button-lightbox-prev">
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 p-2 z-10" onClick={(e) => { e.stopPropagation(); onNext(); }} data-testid="button-lightbox-next">
        <ChevronRight className="w-8 h-8" />
      </button>

      <motion.div
        className="max-w-5xl w-full mx-4 md:mx-8"
        key={activeIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[activeIndex].src}
          alt={images[activeIndex].title}
          className="w-full max-h-[75vh] object-contain rounded-md"
        />
        <div className="text-center mt-5">
          <h3 className="font-serif text-white text-xl">{images[activeIndex].title}</h3>
          <p className="text-white/50 font-sans text-sm mt-1">{images[activeIndex].desc}</p>
          <p className="text-gold/50 text-xs font-sans mt-3">{activeIndex + 1} / {images.length}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function GallerySection() {
  const [lightbox, setLightbox] = useState<{ images: typeof VENUE_GALLERY; index: number } | null>(null);

  const openLightbox = useCallback((images: typeof VENUE_GALLERY, index: number) => {
    setLightbox({ images, index });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prevImage = useCallback(() => {
    if (!lightbox) return;
    setLightbox(prev => prev ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length } : null);
  }, [lightbox]);

  const nextImage = useCallback(() => {
    if (!lightbox) return;
    setLightbox(prev => prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : null);
  }, [lightbox]);

  return (
    <section id="gallery" className="py-28 relative overflow-hidden" style={{ background: "#060402" }}>
      <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs tracking-[0.4em] uppercase text-gold font-sans">Visual Journey</span>
          <h2 className="font-serif text-white mt-3 mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Our Venue Gallery
          </h2>
          <div className="section-divider" />
          <p className="text-white/60 max-w-xl mx-auto mt-6 font-sans leading-relaxed">
            Step inside Gorakhpur's most spectacular celebration venue — where every corner tells a story of elegance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-28">
          {VENUE_GALLERY.map((item, i) => (
            <motion.div
              key={item.src}
              className="group relative rounded-md overflow-hidden cursor-pointer"
              style={{ height: i === 0 || i === 5 ? "320px" : "280px" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i, duration: 0.6 }}
              onClick={() => openLightbox(VENUE_GALLERY, i)}
              data-testid={`gallery-venue-${i}`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="flex items-center gap-2 mb-2">
                  <ZoomIn className="w-4 h-4 text-gold" />
                  <span className="text-gold text-xs tracking-widest uppercase font-sans">View</span>
                </div>
                <h3 className="font-serif text-white text-lg">{item.title}</h3>
                <p className="text-white/60 font-sans text-xs mt-1">{item.desc}</p>
              </div>
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-colors duration-300 rounded-md pointer-events-none" />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs tracking-[0.4em] uppercase text-gold font-sans">Culinary Artistry</span>
          <h2 className="font-serif text-white mt-3 mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Food Gallery
          </h2>
          <div className="section-divider" />
          <p className="text-white/60 max-w-xl mx-auto mt-6 font-sans leading-relaxed">
            A feast for the eyes before it becomes a feast for the palate — our signature Awadhi and multi-cuisine creations.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {FOOD_GALLERY.map((item, i) => (
            <motion.div
              key={item.src}
              className="group relative rounded-md overflow-hidden cursor-pointer"
              style={{ height: i % 3 === 1 ? "320px" : "280px" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i, duration: 0.6 }}
              onClick={() => openLightbox(FOOD_GALLERY, i)}
              data-testid={`gallery-food-${i}`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="flex items-center gap-2 mb-2">
                  <ZoomIn className="w-4 h-4 text-gold" />
                  <span className="text-gold text-xs tracking-widest uppercase font-sans">View</span>
                </div>
                <h3 className="font-serif text-white text-lg">{item.title}</h3>
                <p className="text-white/60 font-sans text-xs mt-1">{item.desc}</p>
              </div>
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-colors duration-300 rounded-md pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <GalleryLightbox
            images={lightbox.images}
            activeIndex={lightbox.index}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="py-28 relative overflow-hidden" style={{ background: "#060402" }}>
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <div className="font-serif text-[20rem] font-bold text-gold leading-none select-none">4.9</div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-3 glass-card rounded-full px-6 py-3 mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
            </div>
            <span className="font-serif text-white text-2xl font-bold">4.9</span>
            <span className="text-white/50 text-sm font-sans">/ 5.0</span>
          </div>
          <h2 className="font-serif text-white mt-2 mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Rated 4.9 / 5 by the City
          </h2>
          <div className="section-divider" />
          <p className="text-white/60 max-w-xl mx-auto mt-5 font-sans text-sm">
            Over 500+ verified reviews from families, corporates, and couples who celebrated their most precious moments with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.id}
              className={`glass-card rounded-md p-7 transition-all duration-500 ${i === activeIndex ? "border-gold/40" : "border-white/5"}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
              data-testid={`card-review-${review.id}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 rounded-full gold-gradient-bg flex items-center justify-center text-black font-bold font-serif text-lg flex-shrink-0">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold font-sans text-sm">{review.name}</p>
                  <p className="text-gold text-xs tracking-wider font-sans mt-0.5">{review.event}</p>
                </div>
                <div className="ml-auto flex flex-col items-end gap-1">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <span className="text-white/30 text-xs font-sans">{review.date}</span>
                </div>
              </div>
              <Quote className="w-5 h-5 text-gold/30 mb-3" />
              <p className="text-white/65 font-sans text-sm leading-relaxed italic">{review.text}</p>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                <span className="text-[10px] tracking-widest uppercase text-gold/60 font-sans">Verified Visitor</span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === activeIndex ? "24px" : "8px",
                height: "8px",
                background: i === activeIndex ? "#D4AF37" : "rgba(212,175,55,0.25)"
              }}
              onClick={() => setActiveIndex(i)}
              data-testid={`button-review-dot-${i}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-28 relative overflow-hidden" style={{ background: "#0A0804" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs tracking-[0.4em] uppercase text-gold font-sans">Let's Celebrate Together</span>
          <h2 className="font-serif text-white mt-3 mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Reach Out to Us
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <a href="tel:+919076923170" className="flex items-center gap-5 glass-card rounded-md p-6 group" data-testid="link-phone">
              <div className="w-12 h-12 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}>
                <Phone className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-gold text-xs tracking-widest uppercase font-sans mb-1">Call Us</p>
                <p className="text-white font-serif text-xl">+91 90769 23170</p>
                <p className="text-white/45 text-xs font-sans mt-0.5">Available 10 AM – 10 PM daily</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gold/40 ml-auto group-hover:translate-x-1 transition-transform" />
            </a>

            <a href="https://wa.me/919076923170" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 glass-card rounded-md p-6 group" data-testid="link-whatsapp">
              <div className="w-12 h-12 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}>
                <SiWhatsapp className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-gold text-xs tracking-widest uppercase font-sans mb-1">WhatsApp</p>
                <p className="text-white font-serif text-xl">Quick Enquiry</p>
                <p className="text-white/45 text-xs font-sans mt-0.5">Get a response within minutes</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gold/40 ml-auto group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="flex items-start gap-5 glass-card rounded-md p-6" data-testid="card-address">
              <div className="w-12 h-12 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}>
                <MapPin className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-gold text-xs tracking-widest uppercase font-sans mb-1">Our Location</p>
                <p className="text-white font-serif text-lg leading-snug">UGF, Ayodhya Prasad Apartments<br />Airport Road, Mohaddipur</p>
                <p className="text-white/45 text-sm font-sans mt-1">Gorakhpur, Uttar Pradesh</p>
              </div>
            </div>

            <div className="flex items-center gap-5 glass-card rounded-md p-6" data-testid="card-hours">
              <div className="w-12 h-12 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}>
                <Clock className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-gold text-xs tracking-widest uppercase font-sans mb-1">Hours</p>
                <p className="text-white font-serif text-lg">Open Daily</p>
                <p className="text-white/45 text-sm font-sans mt-0.5">10:00 AM – 11:00 PM</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card rounded-md overflow-hidden" style={{ height: "420px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3562.4!2d83.3731!3d26.7606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQ1JzM4LjIiTiA4M8KwMjInMjMuMiJF!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.7)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hazratgunj Location"
              />
            </div>
            <div className="mt-4 p-5 glass-card rounded-md flex items-center justify-between">
              <div>
                <p className="text-white font-serif text-base">Airport Road, Gorakhpur</p>
                <p className="text-white/45 text-xs font-sans mt-0.5">Near Mohaddipur Chowk</p>
              </div>
              <a href="https://maps.google.com/?q=Airport+Road+Mohaddipur+Gorakhpur" target="_blank" rel="noopener noreferrer">
                <Button className="gold-gradient-bg text-black font-semibold text-xs tracking-wider border-0" data-testid="button-open-maps">
                  Open Maps
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "#030201", borderTop: "1px solid rgba(212,175,55,0.12)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          <div>
            <div className="flex flex-col mb-5">
              <span className="font-serif font-bold text-2xl text-white tracking-wide">Hazratgunj</span>
              <span className="text-[10px] tracking-[0.35em] uppercase text-gold font-sans mt-0.5">Restaurant & Banquet Hall</span>
            </div>
            <p className="text-white/45 text-sm font-sans leading-relaxed mb-6">
              Gorakhpur's first wall-lit boutique banquet hall, blending Awadhi heritage with ultra-modern luxury since its founding.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md flex items-center justify-center transition-colors duration-200"
                style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}
                data-testid="link-instagram">
                <SiInstagram className="w-4 h-4 text-gold" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md flex items-center justify-center transition-colors duration-200"
                style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}
                data-testid="link-facebook">
                <SiFacebook className="w-4 h-4 text-gold" />
              </a>
              <a href="https://wa.me/919076923170" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md flex items-center justify-center transition-colors duration-200"
                style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}
                data-testid="link-footer-whatsapp">
                <SiWhatsapp className="w-4 h-4 text-gold" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-white font-serif text-lg mb-5">Quick Links</p>
            <div className="space-y-3">
              {[
                { label: "Home", href: "#hero" },
                { label: "Banquet Experience", href: "#banquet" },
                { label: "Restaurant Menu", href: "#cuisine" },
                { label: "Amenities", href: "#amenities" },
                { label: "Banquet Enquiries", href: "#contact" },
              ].map(link => (
                <a key={link.href} href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="block text-white/45 text-sm font-sans transition-colors duration-200 cursor-pointer"
                  onMouseEnter={e => (e.currentTarget.style.color = "#D4AF37")}
                  onMouseLeave={e => (e.currentTarget.style.color = "")}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white font-serif text-lg mb-5">Contact Us</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <p className="text-white/45 text-sm font-sans leading-relaxed">
                  UGF, Ayodhya Prasad Apartments,<br />Airport Road, Mohaddipur,<br />Gorakhpur, UP
                </p>
              </div>
              <a href="tel:+919076923170" className="flex items-center gap-3" data-testid="link-footer-phone">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <p className="text-white/45 text-sm font-sans">+91 90769 23170</p>
              </a>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                <p className="text-white/45 text-sm font-sans">Daily: 10 AM – 11 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col items-center gap-3 text-center">
          <div className="section-divider mb-2" />
          <p className="text-white/25 text-xs font-sans">Privacy Policy &nbsp;|&nbsp; Terms of Service</p>
          <p className="text-white/20 text-xs font-sans">
            &copy; {new Date().getFullYear()} Hazratgunj Restaurant & Banquet Hall. All rights reserved.
          </p>
          <div className="mt-4 p-4 rounded-md" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.08)" }}>
            <p className="text-white/35 text-xs font-sans leading-relaxed">
              Designed & Developed with care by <span className="text-gold/70 font-semibold">Aman Gupta</span> | @amangupta.yt
            </p>
            <p className="text-white/20 text-xs font-sans mt-1">
              Chief Digital Architect &nbsp;•&nbsp; Crafting Digital Excellence for Gorakhpur's Elite Businesses
            </p>
            <p className="text-white/20 text-xs font-sans mt-0.5">
              Contact: +91 73550 48683
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
      style={{ background: "rgba(6,4,2,0.95)", backdropFilter: "blur(16px)", borderTop: "1px solid rgba(212,175,55,0.2)" }}>
      <div className="flex items-stretch">
        <a href="tel:+919076923170" className="flex-1 flex flex-col items-center justify-center py-3 gap-1" data-testid="button-sticky-call">
          <Phone className="w-5 h-5 text-gold" />
          <span className="text-white/70 text-xs font-sans tracking-wider">Call Now</span>
        </a>
        <a href="https://wa.me/919076923170" target="_blank" rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1"
          style={{ background: "rgba(212,175,55,0.12)" }}
          data-testid="button-sticky-whatsapp">
          <SiWhatsapp className="w-5 h-5 text-gold" />
          <span className="text-white/70 text-xs font-sans tracking-wider">WhatsApp</span>
        </a>
        <a href="https://maps.google.com/?q=Airport+Road+Mohaddipur+Gorakhpur" target="_blank" rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1"
          data-testid="button-sticky-directions">
          <MapPin className="w-5 h-5 text-gold" />
          <span className="text-white/70 text-xs font-sans tracking-wider">Directions</span>
        </a>
        <a href="tel:+919076923170" className="flex-1 flex flex-col items-center justify-center py-3 gap-1 gold-gradient-bg" data-testid="button-sticky-book">
          <Sparkles className="w-5 h-5 text-black" />
          <span className="text-black text-xs font-semibold font-sans tracking-wider">Book Now</span>
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#060402" }}>
      <Navbar />
      <HeroSection />
      <BanquetSection />
      <CuisineSection />
      <AmenitiesSection />
      <GallerySection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
