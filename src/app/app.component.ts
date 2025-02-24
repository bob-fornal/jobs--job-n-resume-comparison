import { Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

import { FaviconService } from './core/services/favicon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  isDesktop: boolean = true;

  constructor(
    private deviceService: DeviceDetectorService,
    private faviconService: FaviconService,
  ) {
    this.faviconService.init();
    this.init();
  }

  init = (): void => {
    this.isDesktop = this.deviceService.isDesktop();
  };
}
