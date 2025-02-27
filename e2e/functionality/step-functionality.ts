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

export const Given = async (page: Page, step: string, detail: string): Promise<Response | null> => {
  switch (true) {
    case step === 'user navigates to the':
      return await navigateTo(page, detail);
    default:
      return null;
  }
};

export const When = async (page: Page, step: string, detail: string, _?: string, detail2?: string): Promise<void> => {
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

export const Then = async (page: Page, step: string, detail: string): Promise<void> => {
  switch (true) {
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

const navigateTo = async (page: Page, detail: string): Promise<Response | null> => {
  switch (true) {
    case detail === 'Resume Page':
      return await gotoPage(page, '/resumes');
    default:
      return null;
  }
};

const userClicks = async (page: Page, detail: string): Promise<void> => {
  switch (true) {
    case detail === 'Clear Resume Button':
      return await clickButton(page, 'button--clear-resume');
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
