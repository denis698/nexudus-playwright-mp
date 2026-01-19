import { ItemPageObjects } from '@objects/ItemPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class ItemPage extends ItemPageObjects {
  private readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(ItemPageObjects.ADD_ITEM_BUTTON);
    await webActions.verifyURL(ItemPageObjects.URL);
  }

  async accessAddItemPage(): Promise<void> {
    await webActions.clickElementByFirstRole('button', 'Add item');
  }

  async verifyItemExistWithName(itemName: string): Promise<void> {
    await webActions.verifyElementText(ItemPageObjects.ITEM_NAME.replace(`itemName`, itemName), itemName );
    await webActions.verifyElementCount(ItemPageObjects.ITEM_NAME.replace(`itemName`, itemName), 1);
  }

  async openItemWithName(itemName: string): Promise<void> {
    await webActions.clickElementByFirstRole('link', itemName);
  }

  async verifyItemNotExistWithName(itemName: string): Promise<void> {
    await webActions.verifyElementNotPresent(ItemPageObjects.ITEM_NAME.replace(`itemName`, itemName));
  }

  async setItemFilter(viewType: string): Promise<void> {
    await webActions.clickElement(ItemPageObjects.DROPDOWN_ITEMS_TYPES);
    await webActions.clickElement(ItemPageObjects.TYPES_BUTTON.replace('viewType', viewType));
  }

}
