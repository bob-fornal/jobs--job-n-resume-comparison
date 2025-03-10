import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPledgeComponent } from './about-pledge.component';

describe('AboutPledgeComponent', () => {
  let component: AboutPledgeComponent;
  let fixture: ComponentFixture<AboutPledgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutPledgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutPledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
