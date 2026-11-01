import Navigation from '@/components/Navigation';
import ContentErrorBoundary from '@/components/ContentErrorBoundary';
import SiteFooter from '@/components/SiteFooter';
import { Container, PageHeader, ProjectRow } from '@/components/SiteUI';
import type { Project } from '@/lib/content';
import { getProjectsData } from '@/lib/content';

function ProjectGroup({ title, projects }: { title: string; projects: Project[] }) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-8 sm:mt-20 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
      <h2 className="text-[1.5rem] font-bold tracking-[-0.025em] lg:sticky lg:top-24 lg:self-start">{title}</h2>
      <div>
        {projects.map((project) => (
          <ProjectRow key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}

export default function ProjectsPage() {
  const { projects } = getProjectsData();

  return (
    <>
      <Navigation />

      <ContentErrorBoundary>
        <main>
          <Container className="pb-24 pt-14 sm:pb-32 sm:pt-24">
            <PageHeader
              label="Selected work"
              title="Projects"
              description="iOS apps, web tools and small experiments. Most of them have their source on GitHub."
            />

            <ProjectGroup title="Featured" projects={projects.featured} />
            <ProjectGroup title="Web projects" projects={projects.web_projects} />
            <ProjectGroup title="Tools and utilities" projects={projects.tools} />
          </Container>
        </main>
      </ContentErrorBoundary>

      <SiteFooter />
    </>
  );
}
