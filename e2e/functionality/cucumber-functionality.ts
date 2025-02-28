import {
  type Page,
  type Response,
} from "@playwright/test";

import { given, then, when } from "./step-functionality";

export const Given = async (page: Page, action: string): Promise<Response | null | void> => {
  const actions: Array<string> = splitString(action, [/\s*\[/, /\]\s*/], ',');

  const [step, ...details] = actions;
  switch (step) {
    case 'user navigates to the':
      return await given(page, step, details[0]);
    default:
      return null;
  }
};

export const When = async (page: Page, action: string): Promise<void> => {
  const actions: Array<string> = splitString(action, [/\s*\[/, /\]\s*/], ',');

  const [step, ...details] = actions;
  switch (step) {
    case 'user clicks the':
    case 'user clears the':
      return await when(page, step, details[0]);
    case 'user checks the':
      return await when(page, step, details[0], '', true);
    case 'user enters':
    case 'user presses':
      return await when(page, step, details[0], details[1], details[2]);
    default:
      return;
  }
};

export const Then = async (page: Page, action: string): Promise<void> => {
  const actions: Array<string> = splitString(action, [/\s*\[/, /\]\s*/], ',');

  const [step, ...details] = actions;
  return await then(page, step, details[0]);
};

const splitString = (base: string, tokens: Array<string | RegExp>, join: string): Array<string> => {
  tokens.forEach((token: string | RegExp) => {
    base = base.split(token).join(join);
  });
  return base.split(join);
};