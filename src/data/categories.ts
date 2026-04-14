import type { Category } from './types';

export interface CategoryMeta {
  id: Category;
  label: string;
  description: string;
  order: number;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'active-venture',
    label: 'Active Ventures',
    description: 'Current operating entities',
    order: 1,
  },
  {
    id: 'startup-trial',
    label: 'Startup Trials',
    description: 'Experiments, bets, and lessons learned',
    order: 2,
  },
  {
    id: 'professional',
    label: 'Professional Work',
    description: 'Client engagements: no source code, architecture diagrams tell the story',
    order: 3,
  },
  {
    id: 'oss-hobby',
    label: 'Open Source',
    description: 'Selected technical showcases',
    order: 4,
  },
  {
    id: 'frontend-brand',
    label: 'Frontend & Brand',
    description: 'Product and design builds',
    order: 5,
  },
  {
    id: 'writing',
    label: 'Writing',
    description: 'Published essays on tech, AI, engineering, and entrepreneurship',
    order: 6,
  },
];
