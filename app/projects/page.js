import PageShell from "@/components/PageShell";
import ProjectCard from "@/components/ProjectCard";
import SectionHeader from "@/components/SectionHeader";
import { projects } from "@/lib/data";

export default function ProjectsPage() {
  return (
    <PageShell className="pb-24 sm:pb-32">
      <section className="section-band">
        <SectionHeader eyebrow="Projects" title="Selected builds" meta={`${projects.length} works`}>
          A compact archive of full-stack builds, interface studies, clones, dashboards, and utility products.
        </SectionHeader>

        <div className="section-inner grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
