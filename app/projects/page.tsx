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

          <SectionBand title="Featured">
            <div>
              {projectsData.projects.featured.map((project) => (
                <ProjectRow key={project.name} project={project} />
              ))}
            </div>
          </SectionBand>

          {projectsData.projects.web_projects.length > 0 ? (
            <SectionBand title="Web Projects">
              <div>
                {projectsData.projects.web_projects.map((project) => (
                  <ProjectRow key={project.name} project={project} />
                ))}
              </div>
            </SectionBand>
          ) : null}

          {projectsData.projects.tools.length > 0 ? (
            <SectionBand title="Tools & Utilities">
              <div>
                {projectsData.projects.tools.map((project) => (
                  <ProjectRow key={project.name} project={project} />
                ))}
              </div>
            </SectionBand>
          ) : null}
        </main>
      </ContentErrorBoundary>
    </div>
  );
}
