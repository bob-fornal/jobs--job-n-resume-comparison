import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  public position = 30;
  private leftMinimum = 620;
  private rightMaximum = 30;
  private step = 25;
  public animate = false;

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.animate === true) return;

    const keys: Array<string> = ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
    if (keys.includes(event.key) === false) return;

    this.setAnimation();
    switch (event.key) {
      case 'ArrowLeft':
        if (this.position + this.step > this.leftMinimum) return;
        this.position += this.step;
        break;
      case 'ArrowRight':
        if (this.position - this.step < this.rightMaximum) return;
        this.position -= this.step;
    }
  }

  setAnimation(): void {
    this.animate = true;
    setTimeout(() => this.animate = false, 500);
  }
}
