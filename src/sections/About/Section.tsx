import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionProps {
  title: string;
  description: string;
  image: string;
  varient: "place" | "person";
}

const Section = ({ title, description, image, varient }: SectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  // ===== CONTAINER =====
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };

  // ===== FADE UP (TEXT) =====
  const fadeUp = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // ===== IMAGE (PARALLAX FEEL) =====
  const imageAnim = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // =========================
  // PLACE
  // =========================
  if (varient === "place") {
    return (
      <motion.section
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full py-12 px-6"
        style={{ backgroundColor: "rgb(var(--color-surface))" }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          {/* IMAGE */}
          <motion.div
            variants={imageAnim as any}
            className="relative h-[420px] overflow-hidden rounded-2xl"
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
              }}
            />
          </motion.div>

          {/* CONTENT */}
          <motion.div variants={container}>
            <motion.h2
              variants={fadeUp as any}
              className="text-4xl mb-6"
              style={{ color: "rgb(var(--color-primary))" }}
            >
              {title}
            </motion.h2>

            <motion.div
              variants={fadeUp as any}
              className="w-20 h-[3px] mb-6"
              style={{ backgroundColor: "rgb(var(--color-secondary))" }}
            />

            <motion.p
              variants={fadeUp as any}
              className="text-lg leading-relaxed"
              style={{ color: "rgb(var(--color-text-muted))" }}
            >
              {description}
            </motion.p>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  // =========================
  // PERSON
  // =========================
  return (
    <motion.section
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative w-full py-24 px-6 overflow-hidden"
      style={{ backgroundColor: "rgb(var(--color-bg-beige))" }}
    >
      {/* Background glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(var(--color-accent),0.15), transparent 60%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* IMAGE */}
        <motion.div
          variants={imageAnim as any}
          className="relative mx-auto w-[240px] h-[240px] md:w-[220px] md:h-[220px] mb-10"
        >
          <div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{
              backgroundColor: "rgb(var(--color-accent) / 0.35)",
            }}
          />

          <img
            src={image}
            alt={title}
            className="relative w-full h-full object-cover rounded-full border-4"
            style={{
              borderColor: "rgb(var(--color-surface))",
            }}
          />
        </motion.div>

        {/* TEXT */}
        <motion.h2
          variants={fadeUp as any}
          className="text-4xl md:text-5xl mb-4"
          style={{ color: "rgb(var(--color-text))" }}
        >
          {title}
        </motion.h2>

        <motion.div
          variants={fadeUp as any}
          className="mx-auto w-24 h-[3px] mb-8"
          style={{ backgroundColor: "rgb(var(--color-primary))" }}
        />

        <motion.p
          variants={fadeUp as any}
          className="text-lg leading-relaxed max-w-2xl mx-auto"
          style={{ color: "rgb(var(--color-text-muted))" }}
        >
          {description}
        </motion.p>
      </div>
    </motion.section>
  );
};

export default Section;