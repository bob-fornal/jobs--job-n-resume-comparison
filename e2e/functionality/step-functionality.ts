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
  getTitle,
  gotoPage, pressKey
} from "./core-functionality";

export const given = async (page: Page, step: string, detail: string): Promise<Response | null | void> => {
  switch (true) {
    case step === 'user navigates to the':
      return await navigateTo(page, detail);
    default:
      return null;
  }
};

export const when = async (page: Page, step: string, detail: string, _?: string, detail2?: string): Promise<void> => {
  switch (true) {
    case step === 'user clicks the':
      return await userClicks(page, detail);
    case step === 'user enters':
      return await userEnters(page, detail, detail2!);
    case step === 'user presses':
      return await userPresses(page, detail, detail2!);
    default:
      return;
  }
};

export const then = async (page: Page, step: string, detail: string): Promise<void> => {
  switch (true) {
    case step === 'button is disabled':
      return await checkButtonEnabled(page, detail, false);
    case step === 'button is enabled':
      return await checkButtonEnabled(page, detail);
    case step === 'element exists':
      return await checkElementExists(page, detail);
    case step === 'element is selected':
      return await checkElementIsSelected(page, detail);
    case step === 'error displays':
      return await checkError(page, detail);
    case step === 'error does not display':
      return await checkError(page, detail, false);
    case step === 'input is empty':
      return await checkIsEmpty(page, detail);
    case step === 'title is':
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
  switch (true) {
    case detail === 'Change Ignore Word List':
      return await expectElementExists(page, 'button--page-resume--change-ignore-word-list', exists);
    case detail === 'Days Of Code Button':
      return await expectElementExists(page, 'button--application-menu--days-of-code', exists);
    case detail === 'Documentation':
      return await expectElementExists(page, 'button--page-resume--documentation', exists);
    case detail === 'Export Resumes':
      return await expectElementExists(page, 'button--page-resume--export-resumes', exists);
    case detail === 'Import Resumes':
      return await expectElementExists(page, 'button--page-resume--import-resumes', exists);
    case detail === 'Resume to Job Comparison Button':
      return await expectElementExists(page, 'button--application-menu--resumes', exists);
    default:
      return;
  }
};

const checkElementIsSelected = async (page: Page, detail: string, selected = true): Promise<void> => {
  switch (true) {
    case detail === 'Days Of Code Button':
      console.log('checkElementIsSelected', await page.url());
      return await expectElementIsSelected(page, 'button--application-menu--days-of-code', selected);
    case detail === 'Resume to Job Comparison Button':
      return await expectElementIsSelected(page, 'button--application-menu--resumes', selected);
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

const userClicks = async (page: Page, detail: string): Promise<void> => {
  switch (true) {
    case detail === 'Application Menu Button':
      return await clickButton(page, 'button--application-menu');
    case detail === 'Clear Resume Button':
      return await clickButton(page, 'button--clear-resume');
    case detail === 'Days Of Code Button':
      return await clickButton(page, 'button--application-menu--days-of-code');
    case detail === 'Page Menu Button':
      return await clickButton(page, 'button--page-menu');
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
