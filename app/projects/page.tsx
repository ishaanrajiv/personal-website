import Link from 'next/link';
import Image from 'next/image';
import { getProjectsData, getSiteConfig } from '@/lib/content';
import Navigation from '@/components/Navigation';
import ContentErrorBoundary from '@/components/ContentErrorBoundary';

export default function ProjectsPage() {
  const projectsData = getProjectsData();
  const siteConfig = getSiteConfig();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-primary">
      <Navigation siteName={siteConfig.site.name} />

      <ContentErrorBoundary>
        <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-12 text-primary">Projects</h1>
        
        <div className="space-y-12">
          {projectsData.projects.featured.map((project: any, index: number) => (
            <div key={index} className="border border-[#262626] rounded-xl p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-primary">{project.name}</h2>
                  <span className="text-sm text-[#525252] bg-[#262626] px-3 py-1 rounded-xl">
                    {project.type}
                  </span>
                </div>
                <span className="text-sm text-secondary capitalize">
                  {project.status.replace('_', ' ')}
                </span>
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
                    className="w-full max-w-2xl mx-auto rounded-xl border border-[#262626]"
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
                        className="flex-none w-48 md:w-64 rounded-xl border border-[#262626]"
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
                        className="text-xs text-secondary bg-[#1a1a1a] px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string, techIndex: number) => (
                    <span 
                      key={techIndex}
                      className="text-xs text-[#525252] border border-[#525252] px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.links.github && (
                    <a 
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[#525252] text-[#ededed] px-3 py-2 rounded-xl hover:bg-[#262626] transition-colors text-sm"
                    >
                      GitHub
                    </a>
                  )}
                  {project.links.testflight && (
                    <a 
                      href={project.links.testflight}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[#525252] text-[#ededed] px-3 py-2 rounded-xl hover:bg-[#262626] transition-colors text-sm"
                    >
                      TestFlight
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        </main>
      </ContentErrorBoundary>
    </div>
  );
}