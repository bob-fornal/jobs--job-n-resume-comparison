import {
  expect,
  type Page,
  type Response,
} from "@playwright/test";

import {
  clickButton,
  fillInput,
  getElement,
  getErrorElement,
  getLocalStorage,
  getTitle,
  gotoPage, pressKey,
  setCheckbox
} from "./core-functionality";

import { testId } from "./core-elements";

export const given = async (page: Page, step: string, detail: string): Promise<Response | null | void> => {
  switch (true) {
    case step === 'user navigates to the':
      return await navigateTo(page, detail);
    default:
      return null;
  }
};

export const when = async (page: Page, step: string, detail: string, _?: string, detail2?: boolean | string): Promise<void> => {
  switch (step) {
    case 'user checks the':
      return await userChecks(page, detail, (detail2! as boolean));
    case 'user clicks the':
      return await userClicks(page, detail);
    case 'user enters':
      return await userEnters(page, detail, (detail2! as string));
    case 'user presses':
      return await userPresses(page, detail, (detail2! as string));
    default:
      return;
  }
};

export const then = async (page: Page, step: string, detail: string): Promise<void> => {
  switch (step) {
    case 'button is disabled':
      return await checkButtonEnabled(page, detail, false);
    case 'button is enabled':
      return await checkButtonEnabled(page, detail);
    case 'element exists':
      return await checkElementExists(page, detail);
    case 'element is checked':
      return await checkElementIsChecked(page, detail);
    case 'element is not checked':
      return await checkElementIsChecked(page, detail, false);
    case 'element is selected':
      return await checkElementIsSelected(page, detail);
    case 'error displays':
      return await checkError(page, detail);
    case 'error does not display':
      return await checkError(page, detail, false);
    case 'input is empty':
      return await checkIsEmpty(page, detail);
    case 'local storage does not have':
      return await checkLocalStorage(page, detail, false);
    case 'title is':
      return await checkTitle(page, detail);
    default:
      return;
  }
};

const checkButtonEnabled = async (page: Page, detail: string, enabled = true): Promise<void> => {
  switch (true) {
    case detail === 'Save Resume Button':
      if (enabled) {
        return await expect(await getElement(page, 'button--save-resume')).toBeEnabled();
      } else {
        return await expect(await getElement(page, 'button--save-resume')).not.toBeEnabled();
      }
  }
};

const checkError = async (page: Page, detail: string, attached = true): Promise<void> => {
  switch (true) {
    case detail === 'Resume Content Error':
      if (attached) {
        return await expect(await getErrorElement(page, 'mat-error--resume-content')).toBeAttached();
      } else {
        return await expect(await getErrorElement(page, 'mat-error--resume-content')).not.toBeAttached();
      }
    case detail === 'Resume Name Error':
      if (attached) {
        return await expect(await getErrorElement(page, 'mat-error--resume-name')).toBeAttached();
      } else {
        return await expect(await getErrorElement(page, 'mat-error--resume-name')).not.toBeAttached();
      }
    default:
      return;
  }
};

const checkElementExists = async (page: Page, detail: string, exists = true): Promise<void> => {
  switch (detail) {
    case 'Change Ignore Word List':
      return await expectElementExists(page, testId['buttonPageResumeChangeIgnoreWordList'], exists);
    case 'Days Of Code Button':
      return await expectElementExists(page, testId['buttonApplicationMenuDaysOfCode'], exists);
    case 'Documentation':
      return await expectElementExists(page, testId['buttonPageResumeDocumentation'], exists);
    case 'Export Resumes':
      return await expectElementExists(page, testId['buttonPageResumeExportResumes'], exists);
    case 'Import Resumes':
      return await expectElementExists(page, testId['buttonPageResumeImportResumes'], exists);
    case 'Resume to Job Comparison Button':
      return await expectElementExists(page, testId['buttonApplicationMenuResumes'], exists);
    case 'View Goals Checkbox':
      return await expectElementExists(page, testId['checkboxDaysOfCodeViewGoals'], exists);
    default:
      return;
  }
};

const checkElementIsChecked = async (page: Page, detail: string, checked = true): Promise<void> => {
  switch (detail) {
    case 'View Goals Checkbox':
      return await expectElementIsChecked(page, testId['checkboxDaysOfCodeViewGoals'], checked);
    default:
      return;
  }
};

const checkElementIsSelected = async (page: Page, detail: string, selected = true): Promise<void> => {
  switch (true) {
    case detail === 'Days Of Code Button':
      return await expectElementIsSelected(page, testId['buttonApplicationMenuDaysOfCode'], selected);
    case detail === 'Resume to Job Comparison Button':
      return await expectElementIsSelected(page, testId['buttonApplicationMenuResumes'], selected);
    default:
      return;
  }
};

const expectElementExists = async (page: Page, testId: string, exists = true): Promise<void> => {
  if (exists) {
    return await expect(await getElement(page, testId)).toBeAttached();
  } else {
    return await expect(await getElement(page, testId)).not.toBeAttached();
  }
}

const expectElementIsChecked = async (page: Page, testId: string, checked = true): Promise<void> => {
  if (checked) {
    return await expect(await getElement(page, testId, 'input[type=checkbox]')).toBeChecked();
  } else {
    return await expect(await getElement(page, testId, 'input[type=checkbox]')).not.toBeChecked();
  }
};

const expectElementIsSelected = async (page: Page, testId: string, selected = true): Promise<void> => {
  if (selected) {
    return await expect(await getElement(page, testId)).toHaveClass(/selected/);
  } else {
    return await expect(await getElement(page, testId)).not.toHaveClass(/selected/);
  }
};

const checkIsEmpty = async (page: Page, detail: string): Promise<void> => {
  switch (true) {
    case detail === 'Resume Content Input':
      return await expect(await getElement(page, 'input--resume-content')).toBeEmpty();
    case detail === 'Resume Name Input':
      return await expect(await getElement(page, 'input--resume-name')).toBeEmpty();
    default:
      return;
  }
};

const checkLocalStorage = async (page: Page, detail: string, setting = true): Promise<void> => {
  switch (detail) {
    case 'Goals set':
      return await expect(await getLocalStorage(page, 'job-squid--100-days.useGoals')).toEqual(setting);
    default:
      return;
  }
};

const checkTitle = async (page: Page, detail: string): Promise<void> => {
  return await expect(await getTitle(page, 'h3--title')).toContainText(detail);
};

const navigateTo = async (page: Page, detail: string): Promise<Response | null | void> => {
  switch (detail) {
    case 'Days Of Code Page':
      await gotoPage(page, '/resumes');
      await userClicks(page, 'Application Menu Button');
      return await userClicks(page, 'Days Of Code Button');
    case 'Resume Page':
      return await gotoPage(page, '/resumes');
    default:
      return null;
  }
};

const userChecks = async (page: Page, detail: string, state: boolean): Promise<void> => {
  switch (detail) {
    case 'View Goals Checkbox':
      return await setCheckbox(page, testId['checkboxDaysOfCodeViewGoals'], state);
    default:
      return;
  }
};

const userClicks = async (page: Page, detail: string): Promise<void> => {
  switch (detail) {
    case 'Application Menu Button':
      return await clickButton(page, testId['buttonApplicationMenu']);
    case 'Clear Resume Button':
      return await clickButton(page, testId['buttonClearResume']);
    case 'Days Of Code Button':
      return await clickButton(page, testId['buttonApplicationMenuDaysOfCode']);
    case 'Page Menu Button':
      return await clickButton(page, testId['buttonPageMenu']);
    default:
      return;
  }
};

const userEnters = async (page: Page, detail: string, detail2: string): Promise<void> => {
  switch (true) {
    case detail2 === 'Resume Content Input':
      return await fillInput(page, 'input--resume-content', detail);
    case detail2 === 'Resume Name Input':
      return await fillInput(page, 'input--resume-name', detail);
    default:
      return;
  }
};

const userPresses = async (page: Page, detail: string, detail2: string): Promise<void> => {
  switch (true) {
    case detail2 === 'Resume Content Input':
      return await pressKey(page, 'input--resume-content', detail);
    case detail2 === 'Resume Name Input':
      return await pressKey(page, 'input--resume-name', detail);
    default:
      return;
  }
};
