import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagManagementComponent } from './tag-management.component';

describe('TagManagementComponent', () => {
  let component: TagManagementComponent;
  let fixture: ComponentFixture<TagManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
