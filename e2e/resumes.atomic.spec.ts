import { test } from '@playwright/test';

import { Given, When, Then } from './functionality/cucumber-functionality';

test.describe('Resume Page', () => {
  
  test.beforeEach(async ({ page }) => {
    // One of these needs to be included in each test suite.
    // Block Google Analytics
    await page.route('https://www.google-analytics.com/g/collect*', (route) => {
      route.fulfill({
        status: 204,
        body: '',
      });
    });
  });

  test('has title', async ({ page }) => {
    await Given(page, 'user navigates to the [Resume Page]');
    await Then(page, 'title is [Resume(s) to Job Comparison]');
  });

  test('has "Resume Name" input, error when less than 3 characters', async ({ page }) => {
    await Given(page, 'user navigates to the [Resume Page]');
    await When(page, 'user enters [12] on [Resume Name Input]');
    await When(page, 'user presses [Tab] from [Resume Name Input]');
    await Then(page, 'error displays [Resume Name Error]');
  });

  test('has "Resume Name" input, no error when 3 or more', async ({ page }) => {
    await Given(page, 'user navigates to the [Resume Page]');
    await When(page, 'user enters [12345] on [Resume Name Input]');
    await When(page, 'user presses [Tab] from [Resume Name Input]');
    await Then(page, 'error does not display [Resume Name Error]');
  });

  test('has "Resume" input, error when less than 5 characters', async ({ page }) => {
    await Given(page, 'user navigates to the [Resume Page]');
    await When(page, 'user enters [12] on [Resume Content Input]');
    await When(page, 'user presses [Tab] from [Resume Content Input]');
    await Then(page, 'error displays [Resume Content Error]');
  });

  test('has "Resume" input, no error when 5 or more', async ({ page }) => {
    await Given(page, 'user navigates to the [Resume Page]');
    await When(page, 'user enters [1234567890] on [Resume Content Input]');
    await When(page, 'user presses [Tab] from [Resume Content Input]');
    await Then(page, 'error does not display [Resume Content Error]');
  });

  test('has Clear Resume that removes content from Resume Name and Resume inputs', async ({ page }) => {
    await Given(page, 'user navigates to the [Resume Page]');
    await When(page, 'user enters [Test Resume Name] on [Resume Name Input]');
    await When(page, 'user enters [Test Resume Content] on [Resume Content Input]');
    await When(page, 'user clicks the [Clear Resume Button]');
    await Then(page, 'input is empty [Resume Name Input]');
    await Then(page, 'input is empty [Resume Name Input]');
  });

  test('has Save Resume not enabled if Resume Name and Resume inputs are empty', async ({ page }) => {
    await Given(page, 'user navigates to the [Resume Page]');
    await When(page, 'user clears the [Resume Name Input]');
    await When(page, 'user clears the [Resume Content Input]');
    await Then(page, 'button is disabled [Save Resume Button]')
  });

  test('has Save Resume enabled if Resume Name and Resume inputs have content', async ({ page }) => {
    await Given(page, 'user navigates to the [Resume Page]');
    await When(page, 'user enters [Test Resume Name] on [Resume Name Input]');
    await When(page, 'user enters [Test Resume Content] on [Resume Content Input]');
    await Then(page, 'button is enabled [Save Resume Button]')
  });

  test('has "Page" menu Change Ignore Word List', async ({ page }) => {
    await Given(page, 'user navigates to the [Resume Page]');
    await When(page, 'user clicks the [Page Menu Button]');
    await Then(page, 'element exists [Change Ignore Word List]');
  });

  test('has "Page" menu Export Resumes', async ({ page }) => {
    await Given(page, 'user navigates to the [Resume Page]');
    await When(page, 'user clicks the [Page Menu Button]');
    await Then(page, 'element exists [Export Resumes]');
  });

  test('has "Page" menu Import Resumes', async ({ page }) => {
    await Given(page, 'user navigates to the [Resume Page]');
    await When(page, 'user clicks the [Page Menu Button]');
    await Then(page, 'element exists [Import Resumes]');
  });

  test('has "Page" menu Documentation', async ({ page }) => {
    await Given(page, 'user navigates to the [Resume Page]');
    await When(page, 'user clicks the [Page Menu Button]');
    await Then(page, 'element exists [Documentation]');
  });
});
