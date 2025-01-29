import { Component } from '@angular/core';
import keyword_extractor from 'keyword-extractor';

interface ResumeDetails {
  name: string;
  content: string;
  keywords: Array<string>;
  matchPercent?: number;
}

@Component({
  selector: 'app-compare-resume',
  standalone: false,
  
  templateUrl: './compare-resume.component.html',
  styleUrl: './compare-resume.component.css'
})
export class CompareResumeComponent {
  resumes: Array<ResumeDetails> = [];
}
