import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingPanelComponent } from './marketing-panel.component';

type DataType = any | null;

describe('MarketingPanelComponent', () => {
  let component: MarketingPanelComponent;
  let fixture: ComponentFixture<MarketingPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketingPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "init" to get status and content count, triggering status check, ahdnling null', async () => {
    spyOn(component['service'], 'getItem').and.callFake(async (storeKey: string, itemKey: string, useDB = true): Promise<DataType> => {
      if (itemKey === 'job-squid--marketing-count') {
        return null;
      } else {
        return 2;
      }
    });
    spyOn(component, 'triggerStatusCheck').and.stub();

    await component.init();
    expect(component.triggerStatusCheck).toHaveBeenCalledWith(0);
    expect(component.contentCount).toEqual(2);
  });

  it('expects "init" to get status and content count, triggering status check', async () => {
    spyOn(component['service'], 'getItem').and.callFake(async (storeKey: string, itemKey: string, useDB = true): Promise<DataType> => {
      if (itemKey === 'job-squid--marketing-count') {
        return 1;
      } else {
        return 2;
      }
    });
    spyOn(component, 'triggerStatusCheck').and.stub();

    await component.init();
    expect(component.triggerStatusCheck).toHaveBeenCalledWith(1);
    expect(component.contentCount).toEqual(2);
  });

  it('expects "triggerStatusCheck" to show panel, update to next content, and step', () => {
    const status = 0;
    spyOn(component, 'triggerNextContent').and.stub();
    spyOn(component, 'triggerNextStep').and.stub();

    component.triggerStatusCheck(status);
    expect(component.showPanel).toEqual(true);
    expect(component.triggerNextContent).toHaveBeenCalled();
    expect(component.triggerNextStep).toHaveBeenCalledWith(status);
  });

  it('expects "triggerStatusCheck" to hide panel and step', () => {
    const status = 1;
    spyOn(component, 'triggerNextContent').and.stub();
    spyOn(component, 'triggerNextStep').and.stub();

    component.triggerStatusCheck(status);
    expect(component.showPanel).toEqual(false);
    expect(component.triggerNextContent).not.toHaveBeenCalled();
    expect(component.triggerNextStep).toHaveBeenCalledWith(status);
  });

  it('expects "triggerNextStep" to reset to zero and store', async () => {
    const status = 9;
    component['maxSteps'] = 10;
    spyOn(component['service'], 'setItem').and.stub();

    await component.triggerNextStep(status);
    expect(component['service'].setItem).toHaveBeenCalledWith('marketing', 'job-squid--marketing-count', 0, false);
  });

  it('expects "triggerNextStep" to reset to increment and store', async () => {
    const status = 0;
    component['maxSteps'] = 10;
    spyOn(component['service'], 'setItem').and.stub();

    await component.triggerNextStep(status);
    expect(component['service'].setItem).toHaveBeenCalledWith('marketing', 'job-squid--marketing-count', 1, false);
  });

  it('expects "triggerNextContent" to reset to zero and store', async () => {
    component.contentCount = 4;
    component.content = ['1', '2', '3', '4', '5'];
    spyOn(component['service'], 'setItem').and.stub();

    await component.triggerNextContent();
    expect(component['service'].setItem).toHaveBeenCalledWith('marketing', 'job-squid--marketing-content-count', 0, false);
  });

  it('expects "triggerNextContent" to reset to increment and store', async () => {
    component.contentCount = 0;
    component.content = ['1', '2', '3', '4', '5'];
    spyOn(component['service'], 'setItem').and.stub();

    await component.triggerNextContent();
    expect(component['service'].setItem).toHaveBeenCalledWith('marketing', 'job-squid--marketing-content-count', 1, false);
  });

  it('expects "closePanel" to set panel visibility to false', () => {
    component.showPanel = true;

    component.closePanel();
    expect(component.showPanel).toEqual(false);
  });
});
