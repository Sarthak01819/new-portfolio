import Reveal from "@/components/Reveal";

export default function SectionHeader({ eyebrow, title, meta, children, align = "center" }) {
  const isCenter = align === "center";

  return (
    <Reveal
      className={`section-inner mb-12 flex flex-col gap-5 ${
        isCenter ? "items-center text-center" : "items-start text-left"
      }`}
    >
      <div className="flex flex-wrap items-end gap-4">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        {meta && <span className="font-display text-sm uppercase muted-copy">{meta}</span>}
      </div>
      <h1 className="font-display text-[clamp(3.4rem,10vw,8.5rem)] uppercase leading-[0.9]">{title}</h1>
      {children && <div className="max-w-3xl text-base leading-7 muted-copy sm:text-lg">{children}</div>}
    </Reveal>
  );
}
