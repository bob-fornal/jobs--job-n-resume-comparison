export interface ResumeDetails {
  name: string;
  content: string;
  keywords: Array<string>;
  matchPercent?: number | null;
}

export interface ResumeForm {
  name: string;
  content: string;
}
