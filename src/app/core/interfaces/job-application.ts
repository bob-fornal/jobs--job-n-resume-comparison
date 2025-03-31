import { SiteLink } from "./site-link";
import { Tag } from "./tag";

export interface JobActivity {
  datetimestamp: string;
  description: string;
  tag?: Tag;
  connection?: any;
}

export interface JobApplication {
  title: string;
  company: string;
  active: boolean;
  description: string;
  requirements: string;
  links: Array<SiteLink>;
  tracking: Array<JobActivity>;
  connections: Array<any>;
}