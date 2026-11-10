import { test, expect } from '@playwright/test';
import { createPageObjects } from '../utils/page-objects.js';
import { credentials, products } from '../test-data/sauce-demo-data.js';

test.describe('Cart', () => {
  let pages;

  test.beforeEach(async ({ page }) => {
    pages = createPageObjects(page);
    await pages.loginPage.goto();
    await pages.loginPage.login(credentials.standardUser.username, credentials.standardUser.password);
    await pages.inventoryPage.addProductToCart(products.backpack);
    await pages.inventoryPage.openCart();
  });

  test('should show an added product when the cart opens', async () => {
    await expect(pages.cartPage.itemNames).toHaveText([products.backpack]);
  });

  test('should remove a product when its remove button is selected', async () => {
    await pages.cartPage.removeProduct(products.backpack);

    await expect(pages.cartPage.cartItems).toHaveCount(0);
  });

  test('should open checkout when checkout is selected', async ({ page }) => {
    await pages.cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one\.html$/);
  });
});
