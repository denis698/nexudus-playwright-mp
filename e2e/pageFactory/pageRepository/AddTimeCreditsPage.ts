import { WebActions } from '@lib/WebActions';
import { AddTimeCreditPageObjects } from '@objects/AddTimeCreditsPageObjects';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class AddTimeCreditsPage extends AddTimeCreditPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(AddTimeCreditPageObjects.CREDIT_NAME_TEXT_FIELD);
    await webActions.verifyURL(AddTimeCreditPageObjects.ADD_TIME_CREDIT_PAGE_URL);
  }

  async setName(name:string): Promise<void> {
     await webActions.clickElementByExactRole("textbox", "Credit name");
     await webActions.enterElementText(AddTimeCreditPageObjects.CREDIT_NAME_TEXT_FIELD, name);
  }

  async setType(type:string): Promise<void> {
    await webActions.clickElementByExactRole("combobox", "This credit can be used to book following resource types");
    await webActions.clickElementByExactRole("option", type);
  }

  async setUnit(unit:string): Promise<void> {
    await webActions.clickElementByExactRole("combobox", "Credit unit");
    await webActions.clickElementByExactRole("option", unit);
  }

  async save(): Promise<void> {
    await webActions.clickElementByExactRole("button", "Save changes");
  }

  async delete(): Promise<void> {
    await webActions.clickElementByExactRole("button", "Delete");
    await webActions.enterElementText(AddTimeCreditPageObjects.DELETE_TEXT_FIELD, 'DELETE');
    await webActions.clickElementByRole('button', 'Yes, do it');
    await webActions.waitForVisibleElementText('Deleting records in the background');
  }

  // async closeReorderResourcesPopup(): Promise<void> {
  //   await webActions.clickElementByLabelAndByRole("Reorder resources in the 'Position' view", 'button', 'Close');
  // }

}
