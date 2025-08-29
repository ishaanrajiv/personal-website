import Image from 'next/image';
import { getProjectsData, getSiteConfig } from '@/lib/content';
import Navigation from '@/components/Navigation';
import ContentErrorBoundary from '@/components/ContentErrorBoundary';
import { GitHubLink, TestFlightLink, AppStoreLink, DemoLink } from '@/components/icons';

export default function ProjectsPage() {
  const projectsData = getProjectsData();
  const siteConfig = getSiteConfig();

  return (
    <div className="min-h-screen bg-background text-primary">
      <Navigation siteName={siteConfig.site.name} />

      <ContentErrorBoundary>
        <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-12 text-primary">Projects</h1>
        
        {/* Featured Projects */}
        <div className="space-y-12">
          {projectsData.projects.featured.map((project: any, index: number) => (
            <div key={index} className="border border-border rounded-xl p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-primary">{project.name}</h2>
                  <span className="text-sm text-accent bg-border px-3 py-1 rounded-xl">
                    {project.type}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-2">
                    {project.links.github && <GitHubLink href={project.links.github} />}
                    {project.links.testflight && <TestFlightLink href={project.links.testflight} />}
                    {project.links.app_store && <AppStoreLink href={project.links.app_store} />}
                    {project.links.demo && <DemoLink href={project.links.demo} />}
                  </div>
                  <span className="text-sm text-secondary capitalize">
                    {project.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              <p className="text-secondary mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Hero Image */}
              {project.images?.hero && (
                <div className="mb-6">
                  <Image 
                    src={project.images.hero} 
                    alt={`${project.name} screenshot`}
                    width={800}
                    height={600}
                    className="w-full max-w-2xl mx-auto rounded-xl border border-border"
                  />
                </div>
              )}

              {/* Gallery Images */}
              {project.images?.gallery && project.images.gallery.length > 0 && (
                <div className="mb-6">
                  <div className="flex gap-4 overflow-x-auto pb-4">
                    {project.images.gallery.map((image: string, imgIndex: number) => (
                      <Image 
                        key={imgIndex}
                        src={image} 
                        alt={`${project.name} screenshot ${imgIndex + 1}`}
                        width={256}
                        height={192}
                        className="flex-none w-48 md:w-64 rounded-xl border border-border"
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {project.features && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-primary mb-3">Key Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature: string, featureIndex: number) => (
                      <span 
                        key={featureIndex}
                        className="text-xs text-secondary bg-background-elevated px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string, techIndex: number) => (
                  <span 
                    key={techIndex}
                    className="text-xs text-accent border border-accent px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        <div className="mt-16 space-y-8">
          {/* Web Projects */}
          {projectsData.projects.web_projects && projectsData.projects.web_projects.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-6 text-primary">Web Projects</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {projectsData.projects.web_projects.map((project: any, index: number) => (
                  <div key={index} className="border border-border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-medium text-primary">{project.name}</h3>
                        <span className="text-xs text-accent bg-border px-2 py-1 rounded mt-1 inline-block">
                          {project.type}
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex gap-1">
                          {project.links.github && <GitHubLink href={project.links.github} size="small" style="icon" />}
                          {project.links.testflight && <TestFlightLink href={project.links.testflight} size="small" style="icon" />}
                          {project.links.app_store && <AppStoreLink href={project.links.app_store} size="small" style="icon" />}
                          {project.links.demo && <DemoLink href={project.links.demo} size="small" style="icon" />}
                        </div>
                        <span className="text-xs text-secondary capitalize">
                          {project.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <p className="text-secondary text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {project.features && (
                      <div className="mb-4">
                        <h4 className="text-xs font-medium text-primary mb-2">Features</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.features.slice(0, 4).map((feature: string, featureIndex: number) => (
                            <span 
                              key={featureIndex}
                              className="text-xs text-secondary bg-background-elevated px-2 py-1 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                          {project.features.length > 4 && (
                            <span className="text-xs text-accent border border-accent px-2 py-1 rounded">+{project.features.length - 4}</span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-1 items-center">
                      {project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                        <span 
                          key={techIndex}
                          className="text-xs text-accent border border-accent px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs text-accent border border-accent px-2 py-1 rounded">+{project.technologies.length - 3}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tools */}
          {projectsData.projects.tools && projectsData.projects.tools.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-6 text-primary">Tools & Utilities</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {projectsData.projects.tools.map((project: any, index: number) => (
                  <div key={index} className="border border-border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-medium text-primary">{project.name}</h3>
                        <span className="text-xs text-accent bg-border px-2 py-1 rounded mt-1 inline-block">
                          {project.type}
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex gap-1">
                          {project.links.github && <GitHubLink href={project.links.github} size="small" style="icon" />}
                          {project.links.testflight && <TestFlightLink href={project.links.testflight} size="small" style="icon" />}
                          {project.links.app_store && <AppStoreLink href={project.links.app_store} size="small" style="icon" />}
                          {project.links.demo && <DemoLink href={project.links.demo} size="small" style="icon" />}
                        </div>
                        <span className="text-xs text-secondary capitalize">
                          {project.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <p className="text-secondary text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {project.features && (
                      <div className="mb-4">
                        <h4 className="text-xs font-medium text-primary mb-2">Features</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.features.slice(0, 4).map((feature: string, featureIndex: number) => (
                            <span 
                              key={featureIndex}
                              className="text-xs text-secondary bg-background-elevated px-2 py-1 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                          {project.features.length > 4 && (
                            <span className="text-xs text-accent border border-accent px-2 py-1 rounded">+{project.features.length - 4}</span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-1 items-center">
                      {project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                        <span 
                          key={techIndex}
                          className="text-xs text-accent border border-accent px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs text-accent border border-accent px-2 py-1 rounded">+{project.technologies.length - 3}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experiments */}
          {projectsData.projects.experiments && projectsData.projects.experiments.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-6 text-primary">Experiments</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {projectsData.projects.experiments.map((project: any, index: number) => (
                  <div key={index} className="border border-border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-medium text-primary">{project.name}</h3>
                        <span className="text-xs text-accent bg-border px-2 py-1 rounded mt-1 inline-block">
                          {project.type}
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex gap-1">
                          {project.links.github && <GitHubLink href={project.links.github} size="small" style="icon" />}
                          {project.links.testflight && <TestFlightLink href={project.links.testflight} size="small" style="icon" />}
                          {project.links.app_store && <AppStoreLink href={project.links.app_store} size="small" style="icon" />}
                          {project.links.demo && <DemoLink href={project.links.demo} size="small" style="icon" />}
                        </div>
                        <span className="text-xs text-secondary capitalize">
                          {project.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <p className="text-secondary text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {project.features && (
                      <div className="mb-4">
                        <h4 className="text-xs font-medium text-primary mb-2">Features</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.features.slice(0, 4).map((feature: string, featureIndex: number) => (
                            <span 
                              key={featureIndex}
                              className="text-xs text-secondary bg-background-elevated px-2 py-1 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                          {project.features.length > 4 && (
                            <span className="text-xs text-accent border border-accent px-2 py-1 rounded">+{project.features.length - 4}</span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-1 items-center">
                      {project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                        <span 
                          key={techIndex}
                          className="text-xs text-accent border border-accent px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs text-accent border border-accent px-2 py-1 rounded">+{project.technologies.length - 3}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        </main>
      </ContentErrorBoundary>
    </div>
  );
}