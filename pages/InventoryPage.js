export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async addProductToCart(productName) {
    const product = this.inventoryItems.filter({
      has: this.page.locator('[data-test="inventory-item-name"]', { hasText: productName }),
    });
    await product.locator('button').click();
  }

  async removeProductFromCart(productName) {
    const product = this.inventoryItems.filter({
      has: this.page.locator('[data-test="inventory-item-name"]', { hasText: productName }),
    });
    await product.locator('button').click();
  }

  async sortProducts(option) {
    await this.sortSelect.selectOption(option);
  }

  async getProductNames() {
    return this.inventoryItems.locator('[data-test="inventory-item-name"]').allTextContents();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
