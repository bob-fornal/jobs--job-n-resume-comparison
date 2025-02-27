import {
  type Locator,
  type Page,
  type Response,
} from "@playwright/test";

export const clickButton = async (page: Page, testId: string): Promise<void> => {
  const input = await page.getByTestId(testId);
  return await input.click();
};

export const fillInput = async (page: Page, testId: string, value: string): Promise<void> => {
  const input = await page.getByTestId(testId);
  return await input.fill(value);
};

export const getElement = async (page: Page, testId: string): Promise<Locator> => {
  return await page.getByTestId(testId);
};

export const getErrorElement = async (page: Page, testId: string): Promise<Locator> => {
  return await page.getByTestId(testId);
};

export const getLocalStorage = async (page: Page, pattern: string): Promise<boolean> => {
  const patterns: Array<string> = pattern.split('.');
  const storage = await page.context().storageState();

  let result: any = storage.origins[0].localStorage;
  patterns.forEach((pattern: string) => {
    console.log(result);
    result = result[pattern];
  });

  return result;
};

export const getTitle = async (page: Page, testId: string): Promise<Locator> => {
  return await page.getByTestId(testId);
};

export const gotoPage = async (page: Page, path: string): Promise<Response | null> => {
  return await page.goto(path);
};

export const pressKey = async (page: Page, testId: string, key: string): Promise<void> => {
  const input = await page.getByTestId(testId);
  return await input.press(key);
};
