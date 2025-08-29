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
      paragraphs: string[];
    };
    skills: {
      focus_areas: string;
      analytics: string;
      development: string;
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

export interface BlogData {
  blog: {
    featured_posts: {
      title: string;
      slug: string;
      date: string;
      description: string;
      tags: string[];
      status: string;
    }[];
  };
}

export interface Project {
  name: string;
  description: string;
  status: string;
  type: string;
  technologies: string[];
  images?: {
    hero?: string;
    gallery?: string[];
  };
  links: {
    github?: string;
    app_store?: string;
    demo?: string;
    testflight?: string;
  };
  features?: string[];
}

export interface ProjectsData {
  projects: {
    featured: Project[];
    web_projects: Project[];
    tools: Project[];
    experiments: Project[];
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

export function getBlogData(): BlogData {
  return getContentData('blog.yaml') as BlogData;
}

export function getProjectsData(): ProjectsData {
  return getContentData('projects.yaml') as ProjectsData;
}