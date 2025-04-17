import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "handleKeyDown" to bail out if animation is running', () => {
    component.animateWalker = true;
    spyOn(component, 'setAnimateWalker').and.stub();
    const event: KeyboardEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });

    document.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.setAnimateWalker).not.toHaveBeenCalled();
  });

  it('expects "handleKeyDown" to bail out if key is not in list', () => {
    component.animateWalker = false;
    spyOn(component, 'setAnimateWalker').and.stub();
    const event: KeyboardEvent = new KeyboardEvent('keydown', { key: 'Enter' });

    document.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.setAnimateWalker).not.toHaveBeenCalled();
  });

  it('expects "handleKeyDown" to trigger animation on ArrowLeft and move', () => {
    component.animateWalker = false;
    component.position = 40;
    spyOn(component, 'setAnimateWalker').and.stub();
    const event: KeyboardEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });

    document.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.setAnimateWalker).toHaveBeenCalled();
    expect(component.position).toEqual(65);
  });

  it('expects "handleKeyDown" to trigger animation on ArrowLeft and not move', () => {
    component.animateWalker = false;
    component.position = 600;
    spyOn(component, 'setAnimateWalker').and.stub();
    const event: KeyboardEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });

    document.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.setAnimateWalker).toHaveBeenCalled();
    expect(component.position).toEqual(600);
  });

  it('expects "handleKeyDown" to trigger animation on a and move', () => {
    component.animateWalker = false;
    component.position = 40;
    spyOn(component, 'setAnimateWalker').and.stub();
    const event: KeyboardEvent = new KeyboardEvent('keydown', { key: 'a' });

    document.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.setAnimateWalker).toHaveBeenCalled();
    expect(component.position).toEqual(65);
  });

  it('expects "handleKeyDown" to trigger animation on a and not move', () => {
    component.animateWalker = false;
    component.position = 600;
    spyOn(component, 'setAnimateWalker').and.stub();
    const event: KeyboardEvent = new KeyboardEvent('keydown', { key: 'a' });

    document.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.setAnimateWalker).toHaveBeenCalled();
    expect(component.position).toEqual(600);
  });

  it('expects "handleKeyDown" to trigger animation on ArrowRight and move', () => {
    component.animateWalker = false;
    component.position = 600;
    spyOn(component, 'setAnimateWalker').and.stub();
    const event: KeyboardEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });

    document.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.setAnimateWalker).toHaveBeenCalled();
    expect(component.position).toEqual(575);
  });

  it('expects "handleKeyDown" to trigger animation on ArrowRight and not move', () => {
    component.animateWalker = false;
    component.position = 40;
    spyOn(component, 'setAnimateWalker').and.stub();
    const event: KeyboardEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });

    document.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.setAnimateWalker).toHaveBeenCalled();
    expect(component.position).toEqual(40);
  });

  it('expects "handleKeyDown" to trigger animation on s and move', () => {
    component.animateWalker = false;
    component.position = 600;
    spyOn(component, 'setAnimateWalker').and.stub();
    const event: KeyboardEvent = new KeyboardEvent('keydown', { key: 's' });

    document.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.setAnimateWalker).toHaveBeenCalled();
    expect(component.position).toEqual(575);
  });

  it('expects "handleKeyDown" to trigger animation on s and not move', () => {
    component.animateWalker = false;
    component.position = 40;
    spyOn(component, 'setAnimateWalker').and.stub();
    const event: KeyboardEvent = new KeyboardEvent('keydown', { key: 's' });

    document.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.setAnimateWalker).toHaveBeenCalled();
    expect(component.position).toEqual(40);
  });

  it('expects "handleKeyDown" to trigger animation on ArrowRight to wobble', () => {
    component.animateWalker = false;
    component.position = 65;
    spyOn(component, 'setAnimateWalker').and.stub();
    spyOn(component, 'setAnimateWobble').and.stub();
    const event: KeyboardEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });

    document.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.setAnimateWalker).toHaveBeenCalled();
    expect(component.setAnimateWobble).toHaveBeenCalled();
    expect(component.position).toEqual(40);
  });

  it('expects "setAnimateWalker" to set animation to true and end at 500ms', fakeAsync (() => {
    component.animateWalker = false;

    component.setAnimateWalker();
    expect(component.animateWalker).toEqual(true);
    tick(510);
    expect(component.animateWalker).toEqual(false);
  }));

  it('expects "setAnimateWobble" to set animation to true and end at 3000ms', fakeAsync (() => {
    component.animateWobble = false;

    component.setAnimateWobble();
    expect(component.animateWobble).toEqual(true);
    tick(3010);
    expect(component.animateWobble).toEqual(false);
  }));
});
