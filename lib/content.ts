import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const contentDirectory = path.join(process.cwd(), 'content');

export function getContentData(filename: string) {
  const fullPath = path.join(contentDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const data = yaml.load(fileContents) as any;
  return data;
}

export function getSiteConfig() {
  return getContentData('site.yaml');
}

export function getCVData() {
  return getContentData('cv.yaml');
}

export function getBlogData() {
  return getContentData('blog.yaml');
}

export function getProjectsData() {
  return getContentData('projects.yaml');
}