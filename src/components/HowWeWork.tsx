import { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import {
  Award,
  MessageSquare,
  Compass,
  Clock,
  Shield,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import completeData from "../src/data/completeData.json";
import vectorimage2 from "@/assets/lcverctor.webp";

const iconMap: Record<string, React.ElementType> = {
  Award,
  MessageSquare,
  Compass,
  Clock,
  Shield,
  Layers,
  Veteran: Award,
  Experience: Clock,
  Warranty: Shield,
  Financing: Layers,
  Certified: Award,
  Community: MessageSquare,
};

const TrustBadge = ({ label, color }: { label: string; color?: string }) => {
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-sm"
      style={{
        background: "rgba(var(--white-rgb), 0.1)",
        border: "1px solid rgba(var(--white-rgb), 0.15)",
      }}
    >
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background:
            color === "blue" || color === "primary"
              ? "var(--primary-hex)"
              : "var(--primary-hover-hex)",
        }}
      />
      <span
        className="text-[10px] font-bold uppercase tracking-wider"
        style={{ color: "var(--white-color)" }}
      >
        {label}
      </span>
    </div>
  );
};

const CinematicBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div
      className="absolute top-20 left-20 w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none"
      style={{ background: "rgba(var(--primary-rgb), 0.05)" }}
      animate={{
        x: [0, 40, 0],
        y: [0, -25, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute bottom-20 right-20 w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none"
      style={{ background: "rgba(var(--navy-rgb), 0.06)" }}
      animate={{
        x: [0, -40, 0],
        y: [0, 25, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2,
      }}
    />
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--primary-hex) 1px, transparent 1px), linear-gradient(to bottom, var(--primary-hex) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);

const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "0px" });

  const FeatureIcon = iconMap[feature.icon] || Award;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 2000,
      }}
      className="relative group h-full cursor-pointer"
    >
      <div
        className="relative h-full overflow-hidden rounded-3xl p-8 flex flex-col transition-all duration-500 shadow-sm hover:shadow-xl"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border-color)",
        }}
      >
        {/* Glow indicator on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.04), transparent 70%)",
          }}
        />

        {/* Accent top line on hover */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--primary-hex), transparent)",
          }}
          initial={{ x: "-100%", opacity: 0 }}
          animate={{
            x: isHovered ? "100%" : "-100%",
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Icon block */}
        <div className="relative mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
            style={{
              background: "rgba(var(--primary-rgb), 0.08)",
              border: "1px solid rgba(var(--primary-rgb), 0.2)",
            }}
          >
            <FeatureIcon
              className="w-7 h-7"
              style={{ color: "var(--primary-hex)" }}
            />
          </div>

          <motion.div
            className="absolute -top-1 -right-1"
            style={{ color: "var(--primary-hex)" }}
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.2 : 0.8,
              opacity: isHovered ? 1 : 0.3,
            }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <h3
            className="text-xl font-bold uppercase tracking-tight transition-colors duration-300"
            style={{
              color: isHovered
                ? "var(--primary-hex)"
                : "var(--heading-color)",
              fontFamily: "var(--font-heading)",
            }}
          >
            {feature.title}
          </h3>
          <div
            className="h-0.5 rounded-full mt-2 transition-all duration-300"
            style={{
              width: isHovered ? "48px" : "0px",
              background:
                "linear-gradient(90deg, var(--primary-hex), transparent)",
            }}
          />
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed flex-1 font-medium"
          style={{ color: "var(--silver-color)" }}
        >
          {feature.description}
        </p>

        {/* Background number watermark */}
        <div
          className="absolute bottom-4 right-4 text-6xl font-black select-none pointer-events-none transition-colors duration-300"
          style={{
            color: isHovered
              ? "rgba(var(--primary-rgb), 0.12)"
              : "rgba(var(--primary-rgb), 0.04)",
          }}
        >
          {(index + 1).toString().padStart(2, "0")}
        </div>

        {/* Bottom accent pill */}
        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
          <span
            className="text-[11px] font-bold uppercase tracking-wider"
            style={{ color: "var(--primary-hex)" }}
          >
            Standard Guarantee
          </span>
          <CheckCircle2
            className="w-4 h-4"
            style={{ color: "var(--primary-hex)" }}
          />
        </div>
      </div>
    </motion.article>
  );
};

const StatCounter = ({
  value,
  label,
  suffix = "",
  delay = 0,
}: {
  value: string;
  label: string;
  suffix?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const numericValue = parseInt(value);
  const isNumeric = !isNaN(numericValue);
  const [displayValue, setDisplayValue] = useState<number | string>(
    isNumeric ? 0 : value,
  );
  const [isHovered, setIsHovered] = useState(false);
  const inView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (!inView || !isNumeric) return;

    let startTime: number;
    const duration = 1200;
    const end = numericValue;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, numericValue, isNumeric]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="text-center group cursor-pointer"
    >
      <div className="relative inline-block max-w-full">
        <motion.div
          className={`${
            value.length > 8
              ? "text-xl sm:text-2xl md:text-3xl"
              : "text-4xl md:text-5xl"
          } font-black relative z-10 whitespace-nowrap`}
          style={{ color: "var(--primary-hex)" }}
          animate={{
            scale: isHovered ? 1.05 : 1,
            y: isHovered ? -2 : 0,
          }}
        >
          <span>{displayValue}</span>
          {suffix}
        </motion.div>

        <motion.div
          className="absolute inset-0 blur-xl pointer-events-none"
          style={{ background: "rgba(var(--primary-rgb), 0.15)" }}
          animate={{
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.6 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div
        className="text-xs font-bold tracking-wider mt-2 uppercase"
        style={{ color: "var(--silver-color)" }}
      >
        {label}
      </div>
    </motion.div>
  );
};

const HowWeWork = () => {
  const { section, features, stats, cta } = completeData.whyChooseUs;

  return (
    <section
      id="how-we-work"
      className="relative bg-background py-20 md:py-24 lg:py-28 overflow-hidden"
      aria-label="Why Choose Palafox Construction"
    >
      <div id="about" className="absolute -top-24" />
      <CinematicBackground />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-20">
        {/* Section Header */}
        <header className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div
                className="w-12 h-[2px]"
                style={{ background: "var(--primary-hex)" }}
              />
              <span
                className="text-xs font-black tracking-[0.3em] uppercase"
                style={{ color: "var(--primary-hex)" }}
              >
                {section.badge}
              </span>
              <div
                className="w-12 h-[2px]"
                style={{ background: "var(--primary-hex)" }}
              />
            </div>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight uppercase tracking-tight mb-6"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--heading-color)",
              }}
              dangerouslySetInnerHTML={{ __html: section.headline }}
            />

            <p
              className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium"
              style={{ color: "var(--silver-color)" }}
            >
              {section.description}
            </p>
          </motion.div>
        </header>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
          {features.map((feature: any, index: number) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* 4 Stat Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat: any, index: number) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>

        {/* ══════════════════════════════════════════════════
            CALL TO ACTION BANNER: 100% Pixel-Perfect identical to FAQ CTA
           ══════════════════════════════════════════════════ */}
        <div className="relative mt-16 md:mt-24 lg:mt-32">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Luxury Dark-to-Graphite Background */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, var(--navy-color) 0%, var(--primary-hover-hex) 100%)",
                boxShadow: "0 25px 60px rgba(var(--navy-rgb), 0.25)",
                border: "1px solid rgba(var(--primary-rgb), 0.25)",
              }}
            />

            {/* Technical Grid Pattern */}
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                backgroundSize: "45px 45px",
              }}
            />

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 md:py-8">
              {/* Desktop Layout - Two columns with floating image */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-center">
                {/* Left Column - Text Content */}
                <div className="max-w-xl">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-block mb-6"
                  >
                    <span className="px-4 py-2 text-sm font-bold bg-background/10 border border-white/20 rounded-lg text-white backdrop-blur-sm">
                      {cta.badge}
                    </span>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.2] tracking-tight text-white [&_span]:text-white"
                    dangerouslySetInnerHTML={{ __html: cta.title }}
                  />

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-4 text-white font-medium text-lg max-w-lg"
                  >
                    {cta.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-8 flex flex-wrap gap-4"
                  >
                    {cta.buttons.map((button: any, idx: number) => (
                      <motion.a
                        key={idx}
                        href={button.href}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          px-8 py-3.5 rounded-full font-bold transition-all duration-300 shadow-lg
                          flex items-center gap-2
                          ${
                            button.primary
                              ? "bg-primary text-dark hover:bg-secondary shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
                              : "bg-transparent text-white border-2 border-white/20 hover:bg-white/5 backdrop-blur-sm"
                          }
                        `}
                      >
                        {button.text}
                        <ArrowRight className="w-4 h-4" />
                      </motion.a>
                    ))}
                  </motion.div>

                  {/* Trust Indicators */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-8 flex gap-4"
                  >
                    {(cta.trustBadges || []).map((b: any) => {
                      const label = typeof b === "string" ? b : b.label;
                      const color =
                        typeof b === "string" ? "blue" : b.color || "blue";
                      return (
                        <TrustBadge key={label} label={label} color={color} />
                      );
                    })}
                  </motion.div>
                </div>

                {/* Right Column - Floating Vector */}
                <div className="relative">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-[-33rem] w-[85%] lg:w-[90%]"
                    style={{ right: "5%" }}
                  >
                    <img
                      src={vectorimage2}
                      alt={cta.imageAlt || "Palafox Construction"}
                      loading="eager"
                      className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)] will-change-transform transform-gpu"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Mobile Layout - Centered text, no image */}
              <div className="lg:hidden text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="inline-block mb-4"
                >
                  <span className="px-3 py-1.5 text-xs font-semibold bg-background/20 border border-white/30 rounded-full text-white/90 backdrop-blur-sm">
                    {cta.badge}
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-3xl sm:text-4xl font-bold leading-[1.2] text-white [&_span]:text-white"
                  dangerouslySetInnerHTML={{ __html: cta.title }}
                />

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-3 text-white font-medium text-base max-w-md mx-auto"
                >
                  {cta.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-6 flex flex-col sm:flex-row gap-3 justify-center"
                >
                  {cta.buttons.map((button: any, idx: number) => (
                    <motion.a
                      key={idx}
                      href={button.href}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-lg
                        flex items-center justify-center gap-2
                        ${
                          button.primary
                            ? "bg-primary text-dark hover:bg-secondary"
                            : "bg-transparent text-white border-2 border-white/20 hover:bg-white/5"
                        }
                      `}
                    >
                      {button.text}
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  ))}
                </motion.div>

                {/* Trust Badges - Mobile */}
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {(cta.trustBadges || []).map((b: any) => {
                    const label = typeof b === "string" ? b : b.label;
                    const color =
                      typeof b === "string" ? "blue" : b.color || "blue";
                    return (
                      <TrustBadge key={label} label={label} color={color} />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-b-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
