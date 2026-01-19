import { AddResourceTypePageObjects } from '@objects/AddResourceTypePageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class AddResourceTypePage extends AddResourceTypePageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(AddResourceTypePageObjects.TYPE_NAME_TEXT_FIELD);
    await webActions.verifyURL(AddResourceTypePageObjects.RESOURCE_TYPES_PAGE_URL);
  }

  async setName(name:string): Promise<void> {
     await webActions.clickElementByExactRole("textbox", "Type name");
     await webActions.enterElementText(AddResourceTypePageObjects.TYPE_NAME_TEXT_FIELD, name);
  }

  async save(): Promise<void> {
    await webActions.clickElementByExactRole("button", "Save changes");
  }

  async delete(): Promise<void> {
    await webActions.clickElementByExactRole("button", "Delete");
    await webActions.enterElementText(AddResourceTypePageObjects.DELETE_TEXT_FIELD, 'DELETE');
    await webActions.clickElementByRole('button', 'Yes, do it');
    await webActions.waitForVisibleElementText('Deleting records in the background');
  }

  async clickOnAddResourcesTab(): Promise<void> {
    await webActions.clickElementByRole("tab", "Resources");
  }

  async closeReorderResourcesPopup(): Promise<void> {
    await webActions.clickElementByLabelAndByRole("Reorder resources in the 'Position' view", 'button', 'Close');
  }

  async clickOnAddResourceButton(): Promise<void> {
    await webActions.clickElementByExactRole("button", "Add resource");
  }
}
