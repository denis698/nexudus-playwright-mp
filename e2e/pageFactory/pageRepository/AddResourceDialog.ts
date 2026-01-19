import { AddResourceDialogObjects } from '@objects/AddResourceDialogObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class AddResourceDialog extends AddResourceDialogObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(AddResourceDialogObjects.DELETE_BUTTON);
  }

  async accessProductsTab(): Promise<void> {
    await webActions.clickElement(AddResourceDialogObjects.PRODUCTS_TAB);
  }

  async closeReorderResourcesPopup(): Promise<void> {
    await webActions.clickElementByLabelAndByRole("Reorder resources in the 'Position' view", 'button', 'Close');
  }

  async closeBulkOptionsPopup(): Promise<void> {
    await webActions.clickElementByLabelAndByRole("Bulk actions", 'button', 'Close');
  }

  async verifyProductAssignedToResource(productName: string): Promise<void> {
    await webActions.verifyElementCount(AddResourceDialogObjects.PRODUCT_NAME.replace(`productName`, productName),1);
  }

  async verifyResourseIsNotAssignedToResource(productName: string): Promise<void> {
    await webActions.verifyElementNotPresent(AddResourceDialogObjects.PRODUCT_NAME.replace(`productName`, productName));
  }

  async removeReourceProducts(): Promise<void> {
    await webActions.clickElement(AddResourceDialogObjects.RESOURCE_CHECK_BOX);
    await webActions.clickElement(AddResourceDialogObjects.BULK_ACTIONS_BUTTON.replace('Text','Bulk actions ('));
    await webActions.clickElement(AddResourceDialogObjects.DELETE_PODUCT_BUTTON_SIDE_MENU.replace('Text','Delete '));
    await webActions.enterElementText(AddResourceDialogObjects.DELETE_TEXT_FIELD, 'DELETE');
    await webActions.clickElementByFirstRole('button', 'Yes, do it');
    await webActions.clickElement(AddResourceDialogObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
  }

  async manualEntry(): Promise<void> {
    await webActions.clickElementByExactRole("button", "Manual entry");
  }

  async setName(resourceName:string): Promise<void> {
    await webActions.clickElementByExactRole("textbox", "Resource name");
    await webActions.enterElementText(AddResourceDialogObjects.RESOURCE_NAME_TEXT_FIELD, resourceName);
  }

  async setType(resourceType:string): Promise<void> {
    await webActions.clickElementByExactRole("combobox", "Resource type");
    await webActions.clickElementByExactRole("option", resourceType);
  }

  async save(): Promise<void> {
    await webActions.clickElementByExactRole("button", "Save changes");
  }

  async saveChanges(): Promise<void> {
    await webActions.clickElementByNthRole("button", "Save changes");
  }

  async delete(): Promise<void> {
    await webActions.clickElementByExactRole("button", "Delete");
    await webActions.enterElementText(AddResourceDialogObjects.DELETE_TEXT_FIELD, 'DELETE');
    await webActions.clickElementByRole('button', 'Yes, do it');
    await webActions.waitForVisibleElementText('Deleting records in the background');
  }
}
