import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import MaskText from "@/components/MaskText";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { certifications, experience } from "@/lib/data";

export const metadata = {
  title: "Experience - Sarthak Singh",
  description: "Work experience, education, and certifications of Sarthak Singh, full-stack developer.",
};

export default function ExperiencePage() {
  return (
    <PageShell className="pb-24 sm:pb-32">
      <section className="section-band">
        <SectionHeader eyebrow="Experience" title="The journey">
          A front-end internship, freelance client work, the degree behind it, and the certifications along the way: where I have been building and learning.
        </SectionHeader>

        <div className="section-inner">
          <ExperienceTimeline items={experience} />
        </div>
      </section>

      <section className="section-band pt-24 sm:pt-32">
        <div className="section-inner grid gap-8 lg:grid-cols-[0.75fr_1fr] lg:items-start">
          <Reveal>
            <p className="eyebrow">Certifications</p>
            <h2 className="mt-3 font-display text-5xl uppercase leading-none sm:text-6xl">
              <MaskText>Always learning</MaskText>
            </h2>
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.09} delay={0.1}>
            {certifications.map((cert) => (
              <StaggerItem key={cert.title} className="h-full">
                <div className="feature-card flex h-full items-start gap-4 p-5">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border"
                  style={{ borderColor: "var(--line)", background: "var(--surface-strong)" }}
                >
                  <Award size={19} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display text-base uppercase">{cert.title}</span>
                  <span className="mt-1 block text-sm muted-copy">
                    {cert.issuer}
                    {cert.date ? ` · ${cert.date}` : ""}
                  </span>
                </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-band pt-24 sm:pt-32">
        <Reveal from="scale" className="section-inner contact-card flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="eyebrow">Next chapter</p>
            <h2 className="mt-3 font-display text-3xl uppercase leading-tight sm:text-5xl">Have a project in mind?</h2>
          </div>
          <Link href="/contact" className="primary-action shrink-0">
            Work with me <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </Reveal>
      </section>
    </PageShell>
  );
}
