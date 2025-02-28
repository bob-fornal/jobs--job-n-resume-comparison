import { test } from '@playwright/test';

import { Given, When, Then } from './functionality/cucumber-functionality';

test.describe('Toolbar: Days Of Code', () => {
  
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

  test('has "Application" menu for Days Of Code Tracker', async ({ page }) => {
    await Given(page, 'user navigates to the [Days Of Code Page]');
    await When(page, 'user clicks the [Application Menu Button]');
    await Then(page, 'element exists [Days Of Code Button]');
    await Then(page, 'element is selected [Days Of Code Button]');
  });
});

test.describe('Toolbar: Resumes', () => {
  
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

  test('has "Application" menu for Resumes', async ({ page }) => {
    await Given(page, 'user navigates to the [Resume Page]');
    await When(page, 'user clicks the [Application Menu Button]');
    await Then(page, 'element exists [Resume to Job Comparison Button]');
    await Then(page, 'element is selected [Resume to Job Comparison Button]');
  });
});
