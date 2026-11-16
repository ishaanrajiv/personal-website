import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// TypeScript interfaces for content data
export interface SiteConfig {
  site: {
    name: string;
    title: string;
    description: string;
    author: string;
    copyright: string;
    hero: {
      title: string;
      subtitle: string;
    };
    about: {
      title: string;
      short: string[];
      paragraphs: string[];
    };
    contact: {
      email: string;
      linkedin: string;
      github: string;
    };
  };
}

export interface CVData {
  cv: {
    professional_experience: {
      title: string;
      description: string;
    };
    experience: {
      title: string;
      company: string;
      period: string;
      location: string;
      description: string;
    }[];
    education: {
      degree: string;
      institution: string;
      year: string;
    }[];
    technical_skills: {
      category: string;
      skills: string[];
    }[];
  };
}

/** How far a project has got out into the world. Shown as a badge on every project. */
export type Release = 'open_source' | 'app_store' | 'testflight' | 'wip';

export const RELEASE_LABELS: Record<Release, string> = {
  open_source: 'Open source',
  app_store: 'App Store',
  testflight: 'TestFlight beta',
  wip: 'WIP',
};

export interface Project {
  name: string;
  // One line for the homepage.
  summary: string;
  description: string;
  // The stage, where it's worth saying: "alpha", "beta".
  status: string;
  // Left out, the project shows no badge.
  release?: Release;
  // An open source project that also gets a card on the homepage.
  home?: boolean;
  // The line a project with no links shows instead.
  note?: string;
  type: string;
  technologies: string[];
  images?: {
    hero?: string;
    gallery?: string[];
    // "landscape" for desktop window captures; phone screenshots (the default) are portrait.
    aspect?: 'portrait' | 'landscape';
  };
  links: {
    github?: string;
    app_store?: string;
    demo?: string;
    testflight?: string;
    website?: string;
  };
  features?: string[];
}

export interface ProjectsData {
  projects: {
    featured: Project[];
    wip: Project[];
    open_source: Project[];
    web: Project[];
  };
}

const contentDirectory = path.join(process.cwd(), 'content');

export function getContentData(filename: string): any {
  const fullPath = path.join(contentDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const data = yaml.load(fileContents) as any;
  return data;
}

export function getSiteConfig(): SiteConfig {
  return getContentData('site.yaml') as SiteConfig;
}

export function getCVData(): CVData {
  return getContentData('cv.yaml') as CVData;
}

export function getProjectsData(): ProjectsData {
  return getContentData('projects.yaml') as ProjectsData;
}
