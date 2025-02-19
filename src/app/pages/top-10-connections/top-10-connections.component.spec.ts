import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top10ConnectionsComponent } from './top-10-connections.component';

describe('Top10ConnectionsComponent', () => {
  let component: Top10ConnectionsComponent;
  let fixture: ComponentFixture<Top10ConnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Top10ConnectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Top10ConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
