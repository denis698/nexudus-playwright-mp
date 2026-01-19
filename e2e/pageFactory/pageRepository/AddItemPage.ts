import { AddItemPageObjects } from '@objects/AddItemPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class AddItemPage extends AddItemPageObjects {
  private readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElements(AddItemPageObjects.GENERAL_DETAILS_TAB,AddItemPageObjects.SAVE_ITEM_BUTTON);
  }

  async add(name:string, floor:string, location:string, type:string, note:string, occupier:string, connected_resource:string,
    from_date:string, until_date:string): Promise<void> {
    await webActions.enterElementText(AddItemPageObjects.ITEM_NAME_TEXT_FIELD, name);
    await webActions.clickElement(AddItemPageObjects.FLOOR_PLAN_MENU);
    await webActions.clickElementByFirstRole('option', floor + ' ' +  location);
    await webActions.clickElementByLocatorAndFilter('label', type);

    await webActions.enterElementText(AddItemPageObjects.NOTE_TEXT_AREA, note);
    await webActions.enterTextByLabel('Occupier', occupier);
    await webActions.clickElementByFirstRole('option', occupier);

    await webActions.clickElementByLabel('In service: this item can be');

    await webActions.clickElementByLabel('Connected resource');
    await webActions.enterTextByLabel('Connected resource', connected_resource);
    await webActions.clickElementByFirstRole('option', connected_resource);

    await webActions.clickElementByNthLabel('Press the down key to open a popover containing a calendar.', 1);
    await webActions.clickElementByLabel('day-10');
    await webActions.clickElementByNthLabel('Press the down key to open a popover containing a calendar.', 2);
    await webActions.clickElementByLabel('day-20');
  }

  async save(): Promise<void> {
    await webActions.clickElement(AddItemPageObjects.SAVE_ITEM_BUTTON);
  }
  
  async delete(): Promise<void> {
    await webActions.clickElementByFirstRole('button', "Delete");
    await webActions.enterElementText(AddItemPageObjects.DELETE_ITEMS_TEXT_FIELD, 'DELETE');
    await webActions.clickElementByFirstRole('button', "Yes, do it");
    await webActions.clickElementByFirstRole('button', "Dismiss toast");
  }

  async addNote(note:string): Promise<void> {
    await webActions.enterElementText(AddItemPageObjects.NOTE_TEXT_AREA, note);
  }
}
