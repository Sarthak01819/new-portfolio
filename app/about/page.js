import FeatureCard from "@/components/FeatureCard";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { aboutHighlights } from "@/lib/data";

export default function AboutPage() {
  return (
    <PageShell className="pb-24 sm:pb-32">
      <section className="section-band">
        <SectionHeader eyebrow="About" title="Builder at heart">
          I am Sarthak Singh, a full-stack developer focused on reliable interfaces, maintainable back ends, and web products that feel fast from the first click.
        </SectionHeader>

        <div className="section-inner grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {aboutHighlights.map((item, index) => (
            <FeatureCard key={item.title} icon={item.icon} title={item.title} description={item.description} index={index} />
          ))}
        </div>
      </section>

      <section className="section-band pt-20">
        <div className="section-inner grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal>
            <p className="eyebrow">Approach</p>
            <h2 className="mt-3 font-display text-5xl uppercase leading-none sm:text-6xl">Clean, fast, useful</h2>
          </Reveal>
          <Reveal className="contact-card p-6 sm:p-8" delay={0.08}>
            <div className="grid gap-6 text-base leading-8 muted-copy sm:text-lg">
              <p>
                I like building with a clear product spine: the interface should be easy to scan, the code should be easy to extend, and the final experience should feel smooth without hiding the actual utility.
              </p>
              <p>
                My current toolkit centers on React, Next.js, Node.js, Express, MongoDB, Tailwind CSS, GSAP, and Three.js, with an eye for shipping responsive work that is ready for real users.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
