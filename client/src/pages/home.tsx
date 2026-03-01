import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Star, ChevronDown, Menu, X, Utensils, Users, Car, Mic2, Music2, Sparkles, ArrowRight, Quote, Instagram, Facebook, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";

const NAV_LINKS = [
  { label: "Banquet", href: "#banquet" },
  { label: "Cuisine", href: "#cuisine" },
  { label: "Amenities", href: "#amenities" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
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

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden" id="hero">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src="/images/hero-banquet.png"
          alt="Hazratgunj Banquet Hall Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(5,3,1,0.6) 0%, rgba(5,3,1,0.3) 50%, rgba(5,3,1,0.8) 100%)" }} />
      </motion.div>

      <motion.div className="relative z-10 text-center px-6 max-w-5xl mx-auto" style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-4"
        >
          <span className="inline-block text-xs tracking-[0.4em] uppercase text-gold font-sans mb-6 border border-gold/30 px-4 py-2 rounded-sm">
            Gorakhpur's Premier Boutique Banquet
          </span>
        </motion.div>

        <motion.h1
          className="font-serif text-white mb-6 leading-tight"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", textShadow: "0 2px 40px rgba(0,0,0,0.5)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          The Pinnacle of{" "}
          <span className="gold-shimmer">Purvanchal's</span>
          <br />Elegance
        </motion.h1>

        <motion.p
          className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-sans font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Experience Gorakhpur's first wall-lit boutique banquet hall — a symphony of Awadhi tradition and ultra-modern luxury.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <a href="tel:+919076923170">
            <Button
              className="gold-gradient-bg text-black font-bold text-base px-8 py-6 border-0 tracking-wider"
              data-testid="button-book-event"
            >
              Book Your Event
            </Button>
          </a>
          <a
            href="#cuisine"
            onClick={(e) => { e.preventDefault(); document.querySelector("#cuisine")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            <Button
              variant="outline"
              className="border-white/40 text-white font-semibold text-base px-8 py-6 tracking-wider"
              style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}
              data-testid="button-view-menu"
            >
              View Menu
            </Button>
          </a>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-8 mt-14 text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="text-center">
            <div className="font-serif text-3xl font-bold text-gold">600<span className="text-xl">+</span></div>
            <div className="text-xs tracking-widest uppercase mt-1 font-sans">Guest Capacity</div>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div className="text-center">
            <div className="font-serif text-3xl font-bold text-gold">4.9</div>
            <div className="text-xs tracking-widest uppercase mt-1 font-sans">Google Rating</div>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div className="text-center">
            <div className="font-serif text-3xl font-bold text-gold">500<span className="text-xl">+</span></div>
            <div className="text-xs tracking-widest uppercase mt-1 font-sans">Events Hosted</div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-xs tracking-widest uppercase font-sans">Discover</span>
        <ChevronDown className="w-4 h-4" />
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
      <ReviewsSection />
      <ContactSection />
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
