export type SiteSettings = {
  heroTagline?: string;
  heroSubtitle?: string;
  heroBlurb?: string;
  aboutParagraphs?: string[];
  contactText?: string;
};

export type CaseStudy = {
  _id: string;
  title: string;
  company: string;
  dates: string;
  category?: string;
  summary: string;
  bullets?: string[];
  order?: number;
};
