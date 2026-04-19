import Navigation from '@/components/Navigation';
import ContentErrorBoundary from '@/components/ContentErrorBoundary';
import { PageIntro, ProjectRow, SectionBand } from '@/components/MonochromeUI';
import { getProjectsData } from '@/lib/content';

export default function ProjectsPage() {
  const projectsData = getProjectsData();

  return (
    <div className="site-shell">
      <Navigation />

      <ContentErrorBoundary>
        <main className="page-frame page-offset">
          <PageIntro title="Projects" eyebrow="Selected work" />

          <SectionBand index="01" title="Featured">
            <div>
              {projectsData.projects.featured.map((project, index) => (
                <ProjectRow key={project.name} project={project} index={index} />
              ))}
            </div>
          </SectionBand>

          {projectsData.projects.web_projects.length > 0 ? (
            <SectionBand index="02" title="Web Projects">
              <div>
                {projectsData.projects.web_projects.map((project, index) => (
                  <ProjectRow key={project.name} project={project} index={index} />
                ))}
              </div>
            </SectionBand>
          ) : null}

          {projectsData.projects.tools.length > 0 ? (
            <SectionBand index="03" title="Tools & Utilities">
              <div>
                {projectsData.projects.tools.map((project, index) => (
                  <ProjectRow key={project.name} project={project} index={index} />
                ))}
              </div>
            </SectionBand>
          ) : null}
        </main>
      </ContentErrorBoundary>
    </div>
  );
}
