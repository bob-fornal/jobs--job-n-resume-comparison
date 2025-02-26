import { expect, test } from '@playwright/test';

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

  test('has "Application" menu resumes', async ({ page }) => {
    await page.goto('/resumes');

    const pageMenuButton = await page.getByTestId('button--application-menu');
    await pageMenuButton.click();

    await expect(await page.getByTestId('button--application-menu--resumes')).toContainText('Resume(s) to Job Comparison');
    await expect(await page.getByTestId('button--application-menu--resumes')).toHaveClass(/selected/);
  });

});