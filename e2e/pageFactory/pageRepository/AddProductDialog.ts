import { AddProductDialogObjects } from '@objects/AddProductDialogObjects';
import { WebActions } from '@lib/WebActions';
import { expect, type Page } from '@playwright/test';

let webActions: WebActions;

export class AddProductDialog extends AddProductDialogObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElements(AddProductDialogObjects.MANUAL_ENTRY_BUTTON,AddProductDialogObjects.DAY_PASS_BUTTON);
  }

  async manualEntry(): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.MANUAL_ENTRY_BUTTON);
  }

  async addDayPassProduct(productName: string, numberOfProducts: string): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.DAY_PASS_BUTTON);
    await webActions.clearElementText(AddProductDialogObjects.DPP_NAME_TEXT_FIELD);
    await webActions.enterElementText(AddProductDialogObjects.DPP_NAME_TEXT_FIELD, productName);
    
    await webActions.clearElementText(AddProductDialogObjects.DPP_NUMBER_OF_PASSES_TEXT_FIELD);
    await webActions.enterElementText(AddProductDialogObjects.DPP_NUMBER_OF_PASSES_TEXT_FIELD, numberOfProducts);
    await webActions.clickElementByNthRole('button', 'Add product');
  }

  async addHourlyPassPackageProduct(productName: string,numberOfProducts: string): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.HOURLY_PASS_PACKAGE_BUTTON);
    await webActions.clearElementText(AddProductDialogObjects.HPP_NAME_TEXT_FIELD);
    await webActions.enterElementText(AddProductDialogObjects.HPP_NAME_TEXT_FIELD,productName);
    await webActions.clearElementText(AddProductDialogObjects.HPP_NUMBER_OF_PASSES_TEXT_FIELD);
    await webActions.enterElementText(AddProductDialogObjects.HPP_NUMBER_OF_PASSES_TEXT_FIELD,numberOfProducts);
    await webActions.clickElementByNthRole('button', 'Add product');
  }

  async addBookingCreditPackageProduct(productName: string,creditAmount: string): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.BOOKING_CREDIT_PACKAGE_BUTTON);
    await webActions.clearElementText(AddProductDialogObjects.BCPP_NAME_TEXT_FIELD);
    await webActions.enterElementText(AddProductDialogObjects.BCPP_NAME_TEXT_FIELD,productName);
    await webActions.clearElementText(AddProductDialogObjects.BCPP_NUMBER_OF_PASSES_TEXT_FIELD);
    await webActions.enterElementText(AddProductDialogObjects.BCPP_NUMBER_OF_PASSES_TEXT_FIELD,creditAmount);
    await webActions.clickElementByNthRole('button', 'Add product');
  }

  async setName(name: string): Promise<void> {
    await webActions.delay(1000); // temp code
    await webActions.enterElementText(AddProductDialogObjects.PRODUCT_NAME_TEXT_FIELD,name);
    await webActions.delay(1000); //temp code
  }

  async setDescription(productDescription: string): Promise<void> {
    await webActions.enterElementText(AddProductDialogObjects.PRODUCT_DESCRIPTION_TEXT_FIELD,productDescription);
  }

  async setFinancialAccount(account:string): Promise<void> {
    await webActions.clickElementByText('Financial account');
    await webActions.clickElementByRole('option', account);
  }

  async setTaxRate(taxRate: string): Promise<void> {
    await webActions.clickElementByText('Tax rate');
    await webActions.clickElementByRole('option', taxRate);
  }

  async verifyError(message: string): Promise<void> {
    await webActions.verifyElementText(AddProductDialogObjects.TOAST_ERROR_TEXT, message);
    await webActions.clickElement(AddProductDialogObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
  }

  async clearProductNotification(): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
  }

  async verifyProductError(message: string): Promise<void> {
    await webActions.verifyElementText(AddProductDialogObjects.PRODUCT_SAVE_ERROR,message);
  }

  async verifyNegativeStockError(errorMessage: string): Promise<void> {
    await webActions.verifyElementContainsText(AddProductDialogObjects.TOAST_ERROR_TEXT, errorMessage);
  }

  async discardChangesAndReturnToProductPage(): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.CLOSE_RETURN_BUTTON);
    await webActions.clickElement(AddProductDialogObjects.DISCARD_UNSAVED_CHANGES_BUTTON);
  }

  async returnToProductPage(): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.CLOSE_RETURN_BUTTON);
  }

  async delete(): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.DELETE_BUTTON);
    await webActions.enterElementText(AddProductDialogObjects.DELETE_TEXT_FIELD, "DELETE");
    await webActions.clickElement(AddProductDialogObjects.CONFIRMATION_BUTTON);
  }

  async copyProduct(): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.MORE_ACTIONS_BUTTON);
    await webActions.clickElement(AddProductDialogObjects.COPY_PRODUCT_BUTTON);
    await webActions.clickElement(AddProductDialogObjects.CONFIRMATION_BUTTON);
    await webActions.waitForElement('text="Action completed"');
    await webActions.clickElement(AddProductDialogObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
  }

  async closeNotificationDialog(): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
  }

  async changeStockLevel(stockLevel: string): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.MORE_ACTIONS_BUTTON);
    await webActions.clickElement(AddProductDialogObjects.ADJUST_STOCK_BUTTON);
    await webActions.enterElementText(AddProductDialogObjects.STOCK_LEVEL_TEXT_FIELD, stockLevel);
    await webActions.clickElement(AddProductDialogObjects.CONFIRMATION_BUTTON);
  }

  async closeProductDialog(): Promise<void> {
    await webActions.clickElementByFirstRole('button', 'Close');
  }

  async assignProductToResourceByName(name: string): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.MORE_ACTIONS_BUTTON);
    await webActions.clickElement(AddProductDialogObjects.ASSIGN_TO_RESOURSES_BUTTON);
    await webActions.clickElement(AddProductDialogObjects.RESOURCES_DROP_DOWN_MENU);
    await webActions.clickElement(AddProductDialogObjects.RESOURCE_NAME_MENU_OPTION.replace(`resourseName`, name));
    await webActions.clickElement(AddProductDialogObjects.ASSIGN_TO_RESOURCES_DIALOG_TEXT);
    await webActions.clickElement(AddProductDialogObjects.CONFIRMATION_BUTTON);
    await webActions.waitForElement('text="Action completed"');
    await webActions.clickElement(AddProductDialogObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
  }

  async verifyProductName(productName: string): Promise<void> {
    await webActions.verifyElementText(AddProductDialogObjects.PRODUCT_NAME_HEADER, productName);
    await webActions.verifyElementAttribute(AddProductDialogObjects.PRODUCT_NAME_TEXT_FIELD, 'value', productName);
  }

  async verifyProductLocation(expectedProductLocation: string): Promise<void> {
    const productLocation = await webActions.getValueFromElementByRole('combobox', 'Available at');
    expect(productLocation).toBe(expectedProductLocation);
  }

  async verifyProductDescription(productDescription: string): Promise<void> {
    await webActions.verifyElementText(AddProductDialogObjects.PRODUCT_DESCRIPTION_TEXT_AREA, productDescription);
  }

  async verifyProductUnitPrice(productUnitPrice: string): Promise<void> {
    await webActions.verifyElementAttribute(AddProductDialogObjects.PRODUCT_UNIT_PRICE_TEXT_FIELD,'value', productUnitPrice);
  }

  async verifyProduct(name: string, description: string, price: string, location: string): Promise<void> {
    await webActions.verifyElementText(AddProductDialogObjects.PRODUCT_NAME_HEADER, name);
    await webActions.verifyElementAttribute(AddProductDialogObjects.PRODUCT_NAME_TEXT_FIELD, 'value', name);
    await webActions.verifyElementText(AddProductDialogObjects.PRODUCT_DESCRIPTION_TEXT_AREA, description);
    await webActions.verifyElementAttribute(AddProductDialogObjects.PRODUCT_UNIT_PRICE_TEXT_FIELD,'value', price);
    expect(await webActions.getValueFromElementByRole('combobox', 'Available at')).toBe(location);
  }

  async accessProductBenefits(): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.BENEFITS_TAB);
    await webActions.verifyPageElements(AddProductDialogObjects.ADD_MONEY_CREDIT_BUTTON,AddProductDialogObjects.MORE_ACTIONS_BUTTON);
  }

  async accessIntegrations(): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.INTEGRATIONS_TAB);
    await webActions.verifyPageElement(AddProductDialogObjects.MORE_ACTIONS_BUTTON);
  }

  async accessAvailability(): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.AVAILABILITYS_TAB);
    await webActions.verifyPageElement(AddProductDialogObjects.MORE_ACTIONS_BUTTON);
  }

  async accessAddMoneyCredit(): Promise<void> {
    await webActions.clickElement(
      AddProductDialogObjects.ADD_MONEY_CREDIT_BUTTON
    );
  }

  async accessBenefits(): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.BENEFITS_BUTTON);
  }

  async addPrintingCredit(printingName: string,printingTime: string): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.PRINTING_CREDIT_HEADER_BUTTON);
    await webActions.verifyPageElement(AddProductDialogObjects.PRINTING_CREDIT_BUTTON);
    await webActions.clickElement(AddProductDialogObjects.PRINTING_CREDIT_BUTTON);
    await webActions.enterElementText(AddProductDialogObjects.PRINTING_CREDIT_NAME_TEXT_FIELD,printingName);
    await webActions.keyboardEnter('ArrowDown');
    await webActions.keyboardEnter('Enter');
    await webActions.enterElementText(AddProductDialogObjects.PRINTING_CREDIT_TIME_TEXT_FIELD,printingTime);
  }

  async verifyAddMoneyCredit(): Promise<void> {
    await webActions.verifyPageElements(AddProductDialogObjects.CREDIT_DESCRIPTION_TEXT_FIELD,AddProductDialogObjects.CREDIT_AMOUNT_TEXT_FIELD);
  }

  async setCreditDescription(creditDescription: string): Promise<void> {
    await webActions.enterElementText(AddProductDialogObjects.CREDIT_DESCRIPTION_TEXT_FIELD, creditDescription);
  }

  async setCreditAmount(creditAmount: string): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.CREDIT_AMOUNT_TEXT_FIELD);
    await webActions.enterElementText(AddProductDialogObjects.CREDIT_AMOUNT_TEXT_FIELD, creditAmount);
  }

  async save(): Promise<void> {
    await webActions.clickElementByRole('button', 'Save changes');
  }

  async saveChanges(): Promise<void> {
    await webActions.clickElementByNthRole('button', 'Save changes');
  }

  async returnToBenefits(): Promise<void> {
    await webActions.clickElementByNthRole('button', 'Close');
    await webActions.clickElement(AddProductDialogObjects.DISCARD_UNSAVED_CHANGES_BUTTON);
  }

  async verifyCreditExistWithName(creditName: string): Promise<void> {
    await webActions.verifyElementText(AddProductDialogObjects.CREDIT_NAME.replace(`creditName`, creditName),creditName);
    await webActions.verifyElementCount(AddProductDialogObjects.CREDIT_NAME.replace(`creditName`, creditName), 1);
  }

  async accessCreditWithName(creditName: string): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.CREDIT_NAME.replace(`creditName`, creditName));
  }

  async deleteCredit(): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.PRODUCT_CHECK_BOX);
    await webActions.clickElement(AddProductDialogObjects.BULK_ACTIONS_BUTTON.replace('Text','Bulk actions (1)'));
    await webActions.clickElement(AddProductDialogObjects.DELETE_RECORD_BUTTON_SIDE_MENU.replace('Text','Delete 1 record'));
    await webActions.enterElementText(AddProductDialogObjects.DELETE_RECORD_TEXT_FIELD, 'DELETE');
    await webActions.clickElementByFirstRole('button', 'Yes, do it');
    await webActions.waitForElement('text="Delete completed"');
    await webActions.clickElement(AddProductDialogObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
  }

  async verifyCreditNotExistWithName(creditName: string): Promise<void> {
    await webActions.verifyElementNotPresent(AddProductDialogObjects.CREDIT_NAME.replace(`creditName`, creditName));
  }

  async verifyIntegrationsWithNameIsDisabled(appName: string): Promise<void> {
    await webActions.verifyPageElement(AddProductDialogObjects.DISABLED_INTEGRATION_BUTTON.replace(`AppName`,appName));
  }

  async disableIntegrationsWithName(appName: string): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.ENABLED_INTEGRATION_BUTTON.replace(`AppName`,appName));
  }

  async verifyIntegrationsWithNameIsEnabled(appName: string): Promise<void> {
    await webActions.verifyPageElement(AddProductDialogObjects.ENABLED_INTEGRATION_BUTTON.replace(`AppName`,appName));
  }

  async enableIntegrationsWithName(appName: string): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.DISABLED_INTEGRATION_BUTTON.replace(`AppName`,appName));
  }

  async navigateToProducts(): Promise<void> {
    await webActions.navigate('/billing/products');
  }

  async verifyMonitorStockLevelsForProductIsEnabled(): Promise<void> {
    await webActions.verifyPageElement(AddProductDialogObjects.ENABLED_MONITOR_STOCK_LEVEL_FOR_PRODUCT_BUTTON);
  }

  async enableMonitorStockLevelsForProduct(): Promise<void> {
    await webActions.waitForPageEdiableElement(AddProductDialogObjects.MONITOR_STOCK_LEVEL_FOR_PRODUCT_BUTTON);
    const monitorStockLevelForProductButton = await webActions.getNumberOfElements(AddProductDialogObjects.DISABLED_MONITOR_STOCK_LEVEL_FOR_PRODUCT_BUTTON)
    if (monitorStockLevelForProductButton > 0) {
      await webActions.clickElement(AddProductDialogObjects.DISABLED_MONITOR_STOCK_LEVEL_FOR_PRODUCT_BUTTON);
      await webActions.waitForPageElement(AddProductDialogObjects.ENABLED_MONITOR_STOCK_LEVEL_FOR_PRODUCT_BUTTON);
    }
  }

  async preventStockFallBelowZero(): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.PREVENT_STOCK_FALL_BELOW_ZERO_DISABLED_BUTTON);
  }

  async closeToast(): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
  }

  async setStockLevelAlertTo(stockAlert: string): Promise<void> {
    await webActions.clearElementText(AddProductDialogObjects.STOCK_LEVEL_ALERT_TEXT_FIELD);
    await webActions.typeElementByLabel('units', stockAlert);
  }

  async addPassesCredit(passName: string, passAmount: string): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.PASSES_CREDIT_HEADER_BUTTON);
    await webActions.verifyPageElement(AddProductDialogObjects.ADD_PASSES_BUTTON);
    await webActions.clickElement(AddProductDialogObjects.ADD_PASSES_BUTTON);
    await webActions.enterElementText(AddProductDialogObjects.PASSES_NAME_TEXT_FIELD,passName);
    await webActions.clickElement(AddProductDialogObjects.PASSES_NAME_TEXT_FIELD);
    await webActions.keyboardEnter('ArrowDown');
    await webActions.keyboardEnter('Enter');
    await webActions.clickElement(AddProductDialogObjects.PASSES_AMOUNT_TEXT_FIELD);
    await webActions.enterElementText(AddProductDialogObjects.PASSES_AMOUNT_TEXT_FIELD,passAmount);
  }

  async addTimeCredit(timeName: string, amount: string): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.TIME_CREDIT_HEADER_BUTTON);
    await webActions.verifyPageElement(AddProductDialogObjects.ADD_TIME_CREDIT_BUTTON);
    await webActions.clickElement(AddProductDialogObjects.ADD_TIME_CREDIT_BUTTON);
    await webActions.enterElementText(AddProductDialogObjects.TIME_CREDIT_NAME_TEXT_FIELD,timeName);
    await webActions.clickElement(AddProductDialogObjects.TIME_CREDIT_NAME_TEXT_FIELD);
    await webActions.keyboardEnter('ArrowDown');
    await webActions.keyboardEnter('Enter');
    await webActions.enterElementText(AddProductDialogObjects.TIME_CREDIT_AMOUNT_TEXT_FIELD,amount);
  }

  async addMoneyCredit(money: string, amount: string): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.MONEY_CREDIT_HEADER_BUTTON);
    await webActions.verifyPageElement(AddProductDialogObjects.ADD_MONEY_CREDIT_BUTTON);
    await webActions.clickElement(AddProductDialogObjects.ADD_MONEY_CREDIT_BUTTON);
    await webActions.enterElementText(AddProductDialogObjects.MONEY_CREDIT_NAME_TEXT_FIELD,money);
    await webActions.clickElement(AddProductDialogObjects.MONEY_CREDIT_AMOUNT_TEXT_FIELD);
    await webActions.enterElementText(AddProductDialogObjects.MONEY_CREDIT_AMOUNT_TEXT_FIELD,amount);
  }

  async verifyPassesCredit(amount: string) {
    await webActions.waitForPageElement(AddProductDialogObjects.PASSES_AMOUNT_BUTTON.replace(`passesCreditAmount`,amount));
  }

  async verifyTimeCredit(minutes: string) {
    await webActions.waitForPageElement(AddProductDialogObjects.TIME_CREDIT_AMOUNT_BUTTON.replace(`timeCreditAmount`,minutes));
  }

  async verifyMoneyCredit(minutes: string) {
    await webActions.waitForPageElement(AddProductDialogObjects.MONEY_CREDIT_AMOUNT_BUTTON.replace(`moneyCreditAmount`,minutes));
  }

  async verifyPrintingCredit(amount: string) {
    await webActions.waitForPageElement(AddProductDialogObjects.PRINTING_CREDIT_AMOUNT_BUTTON.replace(`printingCreditAmount`,amount));
  }

  async setProductVisibilty(displayProduct: boolean): Promise<void> {
    if(displayProduct) {
      await webActions.clickElement(AddProductDialogObjects.DISPLAY_PRODUCT_BUTTON);
    }
  }

  async delayInTest(time: number): Promise<void> {
    await webActions.delay(time);
  }

  async setKindByType(type:string): Promise<void> {
    await webActions.clickElement(AddProductDialogObjects.PRODUCT_KIND_MENU);
    await webActions.clickElementByLabelAndByOption('Product kind', type);
  }

  async verifyKindByValue(expectedKind: string): Promise<void> {
    expect(await webActions.getTextFromMenuElement(AddProductDialogObjects.PRODUCT_KIND)).toContain(expectedKind);
  }
}
