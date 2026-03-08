import { useEffect, useState } from 'react';
import { client } from '../lib/sanityClient';
import { DEFAULT_CASE_STUDIES, DEFAULT_SETTINGS } from '../data/defaults';
import type { CaseStudy, SiteSettings } from '../types';

export function useSanityContent(): { settings: Required<SiteSettings>; caseStudies: CaseStudy[] } {
  const [settings, setSettings] = useState<Required<SiteSettings>>(DEFAULT_SETTINGS);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(DEFAULT_CASE_STUDIES);

  useEffect(() => {
    client.fetch<SiteSettings>('*[_type == "siteSettings"][0]').then((data) => {
      if (data) setSettings({ ...DEFAULT_SETTINGS, ...data });
    });

    client.fetch<CaseStudy[]>('*[_type == "caseStudy"] | order(order asc)').then((data) => {
      if (data && data.length > 0) setCaseStudies(data);
    });
  }, []);

  return { settings, caseStudies };
}
