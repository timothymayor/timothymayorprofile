export interface Project {
  id: string;
  name: string;
  tagline: string;
  stack: string[];
  keyFeatures: string[];
  architectureHighlights: string[];
  outcomeImpact: string[];
  themeColor: 'cyan' | 'purple' | 'emerald';
}

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  stack: string[];
}

export interface EducationCertification {
  title: string;
  institution: string;
  date: string;
  major?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}
