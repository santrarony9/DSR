import { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Our Projects | DSR Event Planner',
  description: 'View our portfolio of weddings, corporate events, and celebrations curated by DSR Event Planner.',
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
