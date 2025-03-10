import { SiteLink } from "./site-link";
import { Tag } from "./tag";

export interface JobActivity {
  datetimestamp: string;
  description: string;
  tag: Tag;
}

export interface JobApplication {
  title: string;
  company: string;
  links: Array<SiteLink>;
  description: string;
  requirements: string;
  notes: string;
  activites: Array<JobActivity>
}