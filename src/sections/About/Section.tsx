import React from "react";

interface SectionProps {
  title: string;
  description: string;
  image: string;
  varient: "place" | "person";
}

const Section = ({ title, description, image, varient }: SectionProps) => {
  // =========================
  // PLACE (no longer hero)
  // =========================
  if (varient === "place") {
    return (
      <section
        className="w-full py-12 px-6"
        style={{
          backgroundColor: "rgb(var(--color-surface))",
        }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[420px] overflow-hidden rounded-2xl">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />

            {/* subtle overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
              }}
            />
          </div>

          {/* Content */}
          <div>
            <h2
              className="text-4xl mb-6"
              style={{ color: "rgb(var(--color-primary))" }}
            >
              {title}
            </h2>

            <div
              className="w-20 h-[3px] mb-6"
              style={{ backgroundColor: "rgb(var(--color-secondary))" }}
            />

            <p
              className="text-lg leading-relaxed"
              style={{ color: "rgb(var(--color-text-muted))" }}
            >
              {description}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // =========================
  // PERSON (important figure)
  // =========================
  return (
    <section
      className="relative w-full py-24 px-6 overflow-hidden"
      style={{
        backgroundColor: "rgb(var(--color-bg-beige))",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(var(--color-accent),0.15), transparent 60%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Image */}
        <div className="relative mx-auto w-[240px] h-[240px] md:w-[220px] md:h-[220px] mb-10">
          {/* glowing frame */}
          <div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{
              backgroundColor: "rgb(var(--color-accent) / 0.35)",
            }}
          />

          {/* portrait */}
          <img
            src={image}
            alt={title}
            className="relative w-full h-full object-cover rounded-full border-4"
            style={{
              borderColor: "rgb(var(--color-surface))",
            }}
          />
        </div>

        {/* Name */}
        <h2
          className="text-4xl md:text-5xl mb-4"
          style={{ color: "rgb(var(--color-text))" }}
        >
          {title}
        </h2>

        {/* Accent line */}
        <div
          className="mx-auto w-24 h-[3px] mb-8"
          style={{ backgroundColor: "rgb(var(--color-primary))" }}
        />

        {/* Description */}
        <p
          className="text-lg leading-relaxed max-w-2xl mx-auto"
          style={{ color: "rgb(var(--color-text-muted))" }}
        >
          {description}
        </p>
      </div>
    </section>
  );
};

export default Section;