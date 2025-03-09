import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistItem, LongTermGoal } from '../../core/interfaces/structure-goals.interface';

import { LongTermGoalsComponent } from './long-term-goals.component';

describe('LongTermGoalsComponent', () => {
  let component: LongTermGoalsComponent;
  let fixture: ComponentFixture<LongTermGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LongTermGoalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongTermGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "handleGoalsEffect" to set goals', () => {
    const value: Array<LongTermGoal> = [
      {
        title: 'TITLE',
        active: false,
        description: 'DESCRIPTION',
        summary: 'SUMMARY',
        checklist: [],
      },
    ];
    spyOn(component['service'], 'structure').and.returnValue(value);

    component.handleGoalsEffect();
    expect(component.goals).toEqual(value);
  });

  it('expects "getChecklistStatus" to build the correct string', () => {
    const list: Array<ChecklistItem> = [
      { title: 'TITLE1', finished: true, description: 'DESCRIPTION1' },
      { title: 'TITLE2', finished: false, description: 'DESCRIPTION2' },
    ];
    const expected = 'Finished 1 of 2';

    const result: string = component.getChecklistStatus(list);
    expect(result).toEqual(expected);
  });

  it('expects "editChecklist" to open the dialog with current index', () => {
    spyOn(component['dialog'], 'open').and.stub();
    const index = 5;

    component.editChecklist(index);
    expect(component['dialog'].open).toHaveBeenCalledWith(jasmine.any(Function), { data: { index: 5 } });
  });

  it('expects "navigate" to navigate to a page without index', () => {
    const to = 'PAGE';
    const data = undefined;
    spyOn(component['router'], 'navigateByUrl').and.stub();

    component.navigate(to, data);
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/long-term-goals/PAGE');
  });

  it('expects "navigate" to navigate to a page without index', () => {
    const to = 'PAGE';
    const data = 5;
    spyOn(component['router'], 'navigateByUrl').and.stub();

    component.navigate(to, data);
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/long-term-goals/PAGE/5');
  });

  it('expects "delete" to remove the goal at the specified index', () => {
    component.goals = [
      { title: 'TITLE1', active: false, description: 'DESCRIPTION1', summary: 'SUMMARY1', checklist: [] },
      { title: 'TITLE2', active: false, description: 'DESCRIPTION2', summary: 'SUMMARY2', checklist: [] },
      { title: 'TITLE3', active: false, description: 'DESCRIPTION3', summary: 'SUMMARY3', checklist: [] },
    ];
    const index = 1;
    const expected: Array<LongTermGoal> = [
      { title: 'TITLE1', active: false, description: 'DESCRIPTION1', summary: 'SUMMARY1', checklist: [] },
      { title: 'TITLE3', active: false, description: 'DESCRIPTION3', summary: 'SUMMARY3', checklist: [] },
    ];
    spyOn(component['service'], 'saveGoals').and.stub();

    component.delete(index);
    expect(component['service'].saveGoals).toHaveBeenCalledWith(expected);
  });

  it('expects "handleTriggerImportEffect" to fire trigger and do nothing if not active', () => {
    spyOn(component['service'], 'triggerImport').and.returnValue('inactive');
    spyOn(component['service'], 'clearTriggerImport').and.stub();
    spyOn(component.fileUpload.nativeElement, 'click').and.stub();

    component.handleTriggerImportEffect();
    expect(component['service'].triggerImport).toHaveBeenCalled();
    expect(component['service'].clearTriggerImport).not.toHaveBeenCalled();
    expect(component.fileUpload.nativeElement.click).not.toHaveBeenCalled();
  });

  it('expects "handleTriggerImportEffect" to fire trigger', () => {
    spyOn(component['service'], 'triggerImport').and.returnValue('active');
    spyOn(component['service'], 'clearTriggerImport').and.stub();
    spyOn(component.fileUpload.nativeElement, 'click').and.stub();

    component.handleTriggerImportEffect();
    expect(component['service'].triggerImport).toHaveBeenCalled();
    expect(component['service'].clearTriggerImport).toHaveBeenCalled();
    expect(component.fileUpload.nativeElement.click).toHaveBeenCalled();
  });

  it('expects "onFileSelect" to do nothing if there is no file', () => {
    const event: any = {
      target: {
        files: [undefined],
      }
    };
    const mockFileReader = {
      onload: null,
      readAsText: (file: any) => ({}),
    };
    spyOn(component, 'fileReader').and.returnValue(mockFileReader);
    spyOn(mockFileReader, 'readAsText').and.stub();

    component.onFileSelect(event);
    expect(component.fileReader).not.toHaveBeenCalled();
    expect(mockFileReader.readAsText).not.toHaveBeenCalled();
  });

  it('expects "onFileSelect" to process file', () => {
    const event: any = {
      target: {
        files: ['FILE'],
      }
    };
    const mockFileReader = {
      onload: null,
      readAsText: (file: any) => ({}),
    };
    spyOn(component, 'fileReader').and.returnValue(mockFileReader);
    spyOn(mockFileReader, 'readAsText').and.stub();

    component.onFileSelect(event);
    expect(component.fileReader).toHaveBeenCalled();
    expect(mockFileReader.readAsText).toHaveBeenCalledWith('FILE');
  });

  it('expects "readerOnLoad" to capture goals', () => {
    const event: any = {
      target: {
        result: '[]',
      },
    };
    spyOn(component['service'], 'saveGoals').and.stub();

    component.readerOnload(event);
    expect(component['service'].saveGoals).toHaveBeenCalledWith([]);
  });
});
