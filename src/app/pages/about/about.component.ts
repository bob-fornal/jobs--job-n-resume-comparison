import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  public position = 40;
  private leftMinimum = 620;
  private rightMaximum = 40;
  private step = 25;

  public animateWalker = false;
  public animateWobble = false;

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.animateWalker === true) return;

    const keys: Array<string> = ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', 'a', 'w', 's', 'z'];
    if (keys.includes(event.key) === false) return;

    this.setAnimateWalker();
    switch (event.key) {
      case 'ArrowLeft':
      case 'a':
        if (this.position + this.step > this.leftMinimum) return;
        this.position += this.step;
        break;
      case 'ArrowRight':
      case 's':
        if (this.position - this.step < this.rightMaximum) return;
        if (this.position - this.step === this.rightMaximum) this.setAnimateWobble();
        this.position -= this.step;
    }
  }

  setAnimateWalker(): void {
    this.animateWalker = true;
    setTimeout(() => this.animateWalker = false, 500);
  }

  setAnimateWobble(): void {
    this.animateWobble = true;
    setTimeout(() => this.animateWobble = false, 3000);
  }
}
