import { test } from '@playwright/test';

import { Given, When, Then } from './functionality/cucumber-functionality';

test.describe('Days Of Code Page', () => {
  
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
    await Given(page, 'user navigates to the [Days Of Code Page]');
    await Then(page, 'title is [#100DaysOfCode Tracker]');
  });

  test('has notes off by default', async ({ page }) => {
    await Given(page, 'user navigates to the [Days Of Code Page]');
    await When(page, 'user clicks the [Page Menu Button]');
    await Then(page, 'element exists [View Goals Checkbox]');
  });
});