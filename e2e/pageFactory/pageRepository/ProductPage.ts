import { ProductPageObjects } from '@objects/ProductPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class ProductPage extends ProductPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyProductPageElements(ProductPageObjects.ADD_PRODUCT_BUTTON,ProductPageObjects.PRODUCT_TABLE);
    await webActions.verifyURL(ProductPageObjects.PRODUCT_PAGE_URL);
  }

  async verifyProductExistWithName(productName: string): Promise<void> {
    await webActions.waitForElement(ProductPageObjects.ADD_PRODUCT_BUTTON);
    await webActions.verifyElementText(ProductPageObjects.PRODUCT_NAME.replace(`productName`, productName),productName);
    await webActions.verifyElementCount(ProductPageObjects.PRODUCT_NAME.replace(`productName`, productName),1);
  }

  async verifyProductNotExistWithName(productName: string): Promise<void> {
    await webActions.verifyElementNotPresent(ProductPageObjects.PRODUCT_NAME.replace(`productName`, productName));
  }

  async clickOnAddProductButton(): Promise<void> {
    await webActions.clickElement(ProductPageObjects.ADD_PRODUCT_BUTTON);
  }

  async openProductWithName(productName: string): Promise<void> {
    await webActions.forceClickElement(ProductPageObjects.PRODUCT_NAME.replace(`productName`, productName));
  }

  async verifyProductOutOfStock(stockLevel: string): Promise<void> {
    await webActions.verifyElementCount(ProductPageObjects.PRODUCT_OUT_OF_STOCK.replace(`stockLevel`, stockLevel),1);
  }

  async verifyProductStockLevel(stockLevel: string): Promise<void> {
    await webActions.verifyElementCount(ProductPageObjects.PRODUCT_STOCK_LEVEL.replace(`stockLevel`, stockLevel),1);
  }

  async verifyProductLowStockLevel(stockLevel: string): Promise<void> {
    await webActions.verifyElementCount(ProductPageObjects.PRODUCT_STOCK_LOW_LEVEL.replace(`stockLevel`,stockLevel),1);
  }

  async archiveProduct(): Promise<void> {
    await webActions.clickElement(ProductPageObjects.PRODUCT_CHECK_BOX);
    await webActions.clickElement(ProductPageObjects.BULK_ACTIONS_BUTTON.replace('Text','Bulk actions'));
    await webActions.clickElement(ProductPageObjects.ARCHIVE_PRODUCT_BUTTON);
    await webActions.clickElement(ProductPageObjects.CONFIRMATION_BUTTON);
    await webActions.clickElement(ProductPageObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
    await webActions.clickElement(ProductPageObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
  }

  async viewArchiveProducts(): Promise<void> {
    await webActions.clickElement(ProductPageObjects.SEARCH_MENU);
    await webActions.clickElement(ProductPageObjects.SEARCH_MENU_ARCHIVED_OPTION);
  }

  async viewPublishedProducts(): Promise<void> {
    await webActions.clickElement(ProductPageObjects.SEARCH_MENU);
    await webActions.clickElement(ProductPageObjects.SEARCH_MENU_PUBLISHED_OPTION);
  }

  async viewInternalProducts(): Promise<void> {
    await webActions.clickElement(ProductPageObjects.SEARCH_MENU);
    await webActions.clickElement(ProductPageObjects.SEARCH_MENU_INTERNAL_OPTION);
  }

  async viewAllProducts(): Promise<void> {
    await webActions.clickElement(ProductPageObjects.SEARCH_MENU);
    await webActions.clickElement(ProductPageObjects.SEARCH_MENU_SHOW_ALL_OPTION);
  }

  async viewAvailableProducts(): Promise<void> {
    await webActions.clickElement(ProductPageObjects.SEARCH_MENU);
    await webActions.clickElement(ProductPageObjects.SEARCH_MENU_AVAILABLE_OPTION);
  }

  async deleteProduct(): Promise<void> {
    await webActions.clickElement(ProductPageObjects.PRODUCT_CHECK_BOX);
    await webActions.clickElement(ProductPageObjects.DELETE_PRODUCT_BUTTON);
    await webActions.enterElementText(ProductPageObjects.DELETE_PRODUCTS_TEXT_FIELD, 'DELETE');
    await webActions.clickElement(ProductPageObjects.CONFIRMATION_BUTTON);
    await webActions.clickElement(ProductPageObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
  }

  async restoreProduct(): Promise<void> {
    await webActions.clickElement(ProductPageObjects.PRODUCT_CHECK_BOX);
    await webActions.clickElement(ProductPageObjects.BULK_ACTIONS_BUTTON.replace('Text','Bulk actions'));
    await webActions.clickElement(ProductPageObjects.RESTORE_PRODUCT_BUTTON);
    await webActions.clickElement(ProductPageObjects.CONFIRMATION_BUTTON);
    await webActions.clickElement(ProductPageObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
  }

  async delayInTest(time: number): Promise<void> {
    await webActions.delay(time);
  }

  async accessAvailability(): Promise<void> {
    await webActions.clickElement(ProductPageObjects.AVAILABILITY_TAB);
  }

  async preventProductStockFallBelowZero(): Promise<void> {
    await webActions.clickElementByLabel('Prevent stock for this');
  }

  async setTeamFilter(viewType: string): Promise<void> {
    await webActions.clickElement(ProductPageObjects.DROPDOWN_TEAMS_TYPES);
    await webActions.clickElement(ProductPageObjects.SHOW_ALL_TYPES_BUTTON.replace('viewType', viewType));
  }

  async searchByProductName(name: string): Promise<void> {
    await webActions.enterElementText(ProductPageObjects.SEARCH_FILTER_INPUT_TEXT_FIELD, name);
    await webActions.clickElement(ProductPageObjects.SEARCH_OPTION_BY_TEAM_NAME.replace('teamNamePlaceHolder', name));
    await webActions.keyboardEnter('Escape'); // hide the dpordown list for better visual control
  }

  async verifyNoProductsPresent(): Promise<void> {
    await webActions.verifyElementNotPresent(ProductPageObjects.DELETE_PRODUCTS_BUTTON_SIDE_MENU.replace('Text', 'Delete '));
    await webActions.waitForElement(ProductPageObjects.NO_PRODUCTS_CANVAS);
  }

  async getNumberOfProducts(): Promise<number> {
    return await webActions.getNumberOfElements(ProductPageObjects.NO_PRODUCTS_LABEL);
  }

  async deleteProducts(): Promise<void> {
    if (await webActions.getNumberOfElements(ProductPageObjects.NO_PRODUCTS_LABEL) == 0) {
      await webActions.clickElementByRole('button', 'Rows per page:');
      await webActions.clickElementByRole('button', '100 rows');
      await webActions.waitForPageEnabledElement(ProductPageObjects.ALL_PRODUCTS_CHECKBOX);
      await webActions.clickElement(ProductPageObjects.ALL_PRODUCTS_CHECKBOX);
      await webActions.clickElement(ProductPageObjects.BULK_ACTIONS_BUTTON.replace('Text','Bulk actions'));
      await webActions.clickElement(ProductPageObjects.DELETE_PRODUCTS_BUTTON_SIDE_MENU.replace('Text','Delete '));
      await webActions.enterElementText(ProductPageObjects.DELETE_PRODUCTS_TEXT_FIELD, 'DELETE');
      await webActions.clickElementByFirstRole('button', 'Yes, do it');
      await webActions.waitForElement('text="Delete completed"');
      await webActions.clickElement(ProductPageObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
    }
  }

  async viewMoreRows(): Promise<void> {
    if (await webActions.getNumberOfElements(ProductPageObjects.NO_PRODUCTS_LABEL) == 0) {
      await webActions.clickElementByRole('button', 'Rows per page:');
      await webActions.clickElementByRole('button', '100 rows');
    }
  }

  async verifyProductPublished(): Promise<void> {
    await webActions.verifyElementCount(ProductPageObjects.PRODUCT_PUBLISHED_TAG, 1);
  }

  async verifyProductInternal(): Promise<void> {
    await webActions.verifyElementCount(ProductPageObjects.PRODUCT_INTERNAL_TAG, 1);
  }

}
