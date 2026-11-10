import { test, expect } from '@playwright/test';
import { createPageObjects } from '../utils/page-objects.js';
import { credentials, products } from '../test-data/sauce-demo-data.js';

test.describe('Inventory', () => {
  let pages;

  test.beforeEach(async ({ page }) => {
    pages = createPageObjects(page);
    await pages.loginPage.goto();
    await pages.loginPage.login(credentials.standardUser.username, credentials.standardUser.password);
  });

  test('should show all products when the inventory page opens', async () => {
    await expect(pages.inventoryPage.inventoryItems).toHaveCount(6);
  });

  test('should add a product when its add-to-cart button is selected', async () => {
    await pages.inventoryPage.addProductToCart(products.backpack);

    await expect(pages.inventoryPage.cartBadge).toHaveText('1');
  });

  test('should remove a product when its remove button is selected', async () => {
    await pages.inventoryPage.addProductToCart(products.backpack);
    await pages.inventoryPage.removeProductFromCart(products.backpack);

    await expect(pages.inventoryPage.cartBadge).toHaveCount(0);
  });

  test('should sort products by name when A to Z sorting is selected', async () => {
    await pages.inventoryPage.sortProducts('az');

    await expect
      .poll(() => pages.inventoryPage.getProductNames())
      .toEqual(['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Fleece Jacket', 'Sauce Labs Onesie', 'Test.allTheThings() T-Shirt (Red)']);
  });

  test('should sort products by price when low-to-high sorting is selected', async () => {
    await pages.inventoryPage.sortProducts('lohi');

    await expect
      .poll(() => pages.inventoryPage.getProductNames())
      .toEqual(['Sauce Labs Onesie', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt', 'Test.allTheThings() T-Shirt (Red)', 'Sauce Labs Backpack', 'Sauce Labs Fleece Jacket']);
  });
});
