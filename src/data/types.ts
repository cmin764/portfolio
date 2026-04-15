export type Category =
  | 'active-venture'
  | 'startup-trial'
  | 'professional'
  | 'oss-hobby'
  | 'frontend-brand'
  | 'writing';

export type Complexity = 'low' | 'medium' | 'high';

export type ProjectStatus =
  | 'active'
  | 'shipped'
  | 'stealth'
  | 'in-progress'
  | 'discontinued';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: Category;
  complexity: Complexity;
  status: ProjectStatus;
  tags: string[];
  company?: string;
  period?: string;
  links: ProjectLink[];
  diagramFile?: string;
  diagramExcalidrawUrl?: string;
  highlights?: string[];
  architectureNotes?: string;
}
