import { Component } from '@angular/core';
import { StorageLayerService } from '../../core/services/storage-layer.service';

@Component({
  selector: 'marketing-panel',
  standalone: false,
  
  templateUrl: './marketing-panel.component.html',
  styleUrl: './marketing-panel.component.css'
})
export class MarketingPanelComponent {
  private maxSteps: number = 10;
  public showPanel: boolean = false;

  public contentCount: number = 0;
  public content: Array<string> = [
    'There will never be a cost for this site. Support by <a href="https://buymeacoffee.com/bob.ts">Buying Me A Coffee.</a>',
    'Code-Squid.com, check out my <a href="https://code-squid.com/p/unit-tests-react">React Unit Testing Course</a>.',
    'Code-Squid.com <a href="https://code-squid.com/p/developer-mentoring">Mentoring</a> is available.',
    'Job-Squid never stores your data off-site. All records are stored on your computer.',
  ];

  constructor(
    private service: StorageLayerService,
  ) {
    this.init();
  }

  init = async (): Promise<void> => {
    let status: number | null = await this.service.getItem('marketing', 'job-squid--marketing-count', false);
    this.contentCount = (await this.service.getItem('marketing', 'job-squid--marketing-content-count', false) || 0);
    if (status === null) {
      status = 0;
    }

    this.triggerStatusCheck(status);
  };

  triggerStatusCheck = (status: number): void => {
    if (status === 0) {
      this.showPanel = true;
      this.triggerNextContent();
    } else {
      this.showPanel = false;
    }
    this.triggerNextStep(status);
  };

  triggerNextStep = async (status: number): Promise<void> => {
    const newStatus = (status + 1 === this.maxSteps) ? 0 : status + 1;
    await this.service.setItem('marketing', 'job-squid--marketing-count', newStatus, false);
  };

  triggerNextContent = async (): Promise<void> => {
    const newContent = (this.contentCount + 1 === this.content.length ? 0 : this.contentCount + 1);
    await this.service.setItem('marketing', 'job-squid--marketing-content-count', newContent, false);
  };

  closePanel = (): void => {
    this.showPanel = false;
  };
}
