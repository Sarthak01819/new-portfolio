import FeatureCard from "@/components/FeatureCard";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { services, techStack } from "@/lib/data";

export default function ServicesPage() {
  return (
    <PageShell className="pb-24 sm:pb-32">
      <section className="section-band">
        <SectionHeader eyebrow="Services" title="What I build">
          Complete web solutions from interface design and API development to database integration and deployment polish.
        </SectionHeader>

        <div className="section-inner grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <FeatureCard key={service.title} icon={service.icon} title={service.title} description={service.description} index={index} />
          ))}
        </div>
      </section>

      <section className="section-band pt-20">
        <div className="section-inner grid gap-8 lg:grid-cols-[0.75fr_1fr] lg:items-start">
          <Reveal>
            <p className="eyebrow">Tech stack</p>
            <h2 className="mt-3 font-display text-5xl uppercase leading-none sm:text-6xl">Tools I use</h2>
          </Reveal>
          <Reveal className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" delay={0.08}>
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-[8px] border px-4 py-4 text-center text-sm font-semibold"
                style={{ borderColor: "var(--line)", background: "var(--surface)" }}
              >
                {tech}
              </span>
            ))}
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
