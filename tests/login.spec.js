import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { credentials, errorMessages } from '../test-data/sauce-demo-data.js';

test.describe('Login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should open the inventory when valid credentials are submitted', async ({ page }) => {
    await loginPage.login(credentials.standardUser.username, credentials.standardUser.password);

    await expect(page).toHaveURL(/inventory\.html$/);
  });

  test('should show an error when the username is invalid', async () => {
    await loginPage.login(credentials.invalidUsername, credentials.standardUser.password);

    await expect(loginPage.errorMessage).toHaveText(errorMessages.invalidCredentials);
  });

  test('should show an error when the password is invalid', async () => {
    await loginPage.login(credentials.standardUser.username, credentials.invalidPassword);

    await expect(loginPage.errorMessage).toHaveText(errorMessages.invalidCredentials);
  });

  test('should require a username when credentials are empty', async () => {
    await loginPage.login('', '');

    await expect(loginPage.errorMessage).toHaveText(errorMessages.requiredUsername);
  });

  test('should require a password when only the username is provided', async () => {
    await loginPage.login(credentials.standardUser.username, '');

    await expect(loginPage.errorMessage).toHaveText(errorMessages.requiredPassword);
  });

  test('should show a locked-out error when a locked account signs in', async () => {
    await loginPage.login(credentials.lockedOutUser.username, credentials.lockedOutUser.password);

    await expect(loginPage.errorMessage).toHaveText(errorMessages.lockedOut);
  });
});
