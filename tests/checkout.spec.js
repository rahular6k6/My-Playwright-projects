import { test, expect } from '@playwright/test';
import { createPageObjects } from '../utils/page-objects.js';
import { credentials, customer, errorMessages, products } from '../test-data/sauce-demo-data.js';

test.describe('Checkout', () => {
  let pages;

  test.beforeEach(async ({ page }) => {
    pages = createPageObjects(page);
    await pages.loginPage.goto();
    await pages.loginPage.login(credentials.standardUser.username, credentials.standardUser.password);
    await pages.inventoryPage.addProductToCart(products.backpack);
    await pages.inventoryPage.openCart();
    await pages.cartPage.proceedToCheckout();
  });

  test('should require a first name when customer details are empty', async () => {
    await pages.checkoutPage.continueToOverview();

    await expect(pages.checkoutPage.errorMessage).toHaveText(errorMessages.requiredFirstName);
  });

  test('should require a last name when the first name and postal code are provided', async () => {
    await pages.checkoutPage.enterCustomerDetails(customer.firstName, '', customer.postalCode);
    await pages.checkoutPage.continueToOverview();

    await expect(pages.checkoutPage.errorMessage).toHaveText(errorMessages.requiredLastName);
  });

  test('should require a postal code when the customer names are provided', async () => {
    await pages.checkoutPage.enterCustomerDetails(customer.firstName, customer.lastName, '');
    await pages.checkoutPage.continueToOverview();

    await expect(pages.checkoutPage.errorMessage).toHaveText(errorMessages.requiredPostalCode);
  });

  test('should show the order summary when customer details are submitted', async () => {
    await pages.checkoutPage.enterCustomerDetails(customer.firstName, customer.lastName, customer.postalCode);
    await pages.checkoutPage.continueToOverview();

    await expect(pages.checkoutPage.summaryItems).toHaveCount(1);
    await expect(pages.checkoutPage.summaryItems).toContainText(products.backpack);
    await expect(pages.checkoutPage.summarySubtotal).toContainText('$29.99');
    await expect(pages.checkoutPage.summaryTax).toBeVisible();
    await expect(pages.checkoutPage.summaryTotal).toBeVisible();
  });

  test('should complete the order when checkout details are valid', async () => {
    await pages.checkoutPage.enterCustomerDetails(customer.firstName, customer.lastName, customer.postalCode);
    await pages.checkoutPage.continueToOverview();
    await pages.checkoutPage.finishOrder();

    await expect(pages.checkoutPage.confirmationHeader).toHaveText('Thank you for your order!');
  });
});
