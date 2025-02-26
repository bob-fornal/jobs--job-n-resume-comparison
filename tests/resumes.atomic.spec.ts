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

  test('has title', async ({ page }) => {
    await page.goto('/resumes');
    
    await expect(page.getByTestId('h3--title')).toContainText('Resume(s) to Job Comparison')
  });

  test('has Resume Name input, error when less than 3 characters', async ({ page }) => {
    await page.goto('/resumes');
    const inputResumeName = await page.getByTestId('input--resume-name');
    await inputResumeName.fill('12');

    await inputResumeName.blur();
    expect(page.getByTestId('mat-error--resume-name')).toBeAttached();
  });

  test('has Resume Name input, no error when 3 or more', async ({ page }) => {
    await page.goto('/resumes');
    const inputResumeName = await page.getByTestId('input--resume-name');
    await inputResumeName.fill('12345');

    await inputResumeName.blur();
    expect(page.getByTestId('mat-error--resume-name')).not.toBeAttached();
  });

  test('has Resume input, error when less than 5 characters', async ({ page }) => {
    await page.goto('/resumes');
    const inputResumeContent = await page.getByTestId('input--resume-content');
    await inputResumeContent.fill('12');

    await inputResumeContent.blur();
    expect(page.getByTestId('mat-error--resume-content')).toBeAttached();
  });

  test('has Resume input, no error when 5 or more', async ({ page }) => {
    await page.goto('/resumes');
    const inputResumeContent = await page.getByTestId('input--resume-content');
    await inputResumeContent.fill('12345');

    await inputResumeContent.blur();
    expect(page.getByTestId('mat-error--resume-content')).not.toBeAttached();
  });

  test('has Clear Resume that removes content from Resume Name and Resume inputs', async ({ page }) => {
    await page.goto('/resumes');
    const inputResumeName = await page.getByTestId('input--resume-name');
    await inputResumeName.fill('Test Resume Name');
    const inputResumeContent = await page.getByTestId('input--resume-content');
    await inputResumeContent.fill('Test Resume Content');
    const buttonClearResume = await page.getByTestId('button--clear-resume');

    await buttonClearResume.click();
    expect(await page.getByTestId('input--resume-name')).toBeEmpty();
    expect(await page.getByTestId('input--resume-content')).toBeEmpty();
  });

  test('has Save Resume not enabled if Resume Name and Resume inputs are empty', async ({ page }) => {
    await page.goto('/resumes');
    const inputResumeName = await page.getByTestId('input--resume-name');
    await inputResumeName.clear();
    const inputResumeContent = await page.getByTestId('input--resume-content');
    await inputResumeContent.clear();

    expect(await page.getByTestId('button--save-resume')).toBeDisabled();
  });

  test('has Save Resume enabled if Resume Name and Resume inputs have content', async ({ page }) => {
    await page.goto('/resumes');
    const inputResumeName = await page.getByTestId('input--resume-name');
    await inputResumeName.fill('Test Resume Name');
    const inputResumeContent = await page.getByTestId('input--resume-content');
    await inputResumeContent.fill('Test Resume Content');

    expect(await page.getByTestId('button--save-resume')).toBeEnabled();
  });
});
