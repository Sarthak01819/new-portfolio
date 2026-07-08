import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/data";

export default function SelectedWork() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="section-band pb-24 pt-10 sm:pb-32">
      <div className="section-inner">
        <Reveal className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-3 font-display text-[clamp(2.6rem,7vw,6rem)] uppercase leading-none">Recent builds</h2>
          </div>
          <Link href="/projects" className="secondary-action w-fit">
            All projects <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
