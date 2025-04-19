import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPatternsComponent } from './search-patterns.component';

describe('SearchPatternsComponent', () => {
  let component: SearchPatternsComponent;
  let fixture: ComponentFixture<SearchPatternsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchPatternsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPatternsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
