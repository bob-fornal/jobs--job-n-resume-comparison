import { expect, test } from '@playwright/test';

test.describe('Resume Page', () => {
  test('has title', async ({ page }) => {
    await page.goto('/resumes');
    
    await expect(page.getByTestId('title')).toContainText('Resume(s) to Job Comparison')
  });
});
