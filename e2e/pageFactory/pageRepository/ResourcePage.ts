import { ResourcePageObjects } from '@objects/ResourcePageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class ResourcePage extends ResourcePageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(ResourcePageObjects.ADD_RESOURCE_BUTTON);
    await webActions.verifyURL(ResourcePageObjects.RESOURCES_PAGE_URL);
  }

  async verifyResourceExistWithName(name: string): Promise<void> {
    await webActions.verifyElementText(ResourcePageObjects.RESOURCE_TAB.replace(`resourceName`, name),name);
    await webActions.verifyElementCount(ResourcePageObjects.RESOURCE_TAB.replace(`resourceName`, name),1);
  }

  async verifyResourceNotExistWithName(name: string): Promise<void> {
    await webActions.verifyElementNotPresent(ResourcePageObjects.RESOURCE_TAB.replace(`resourceName`, name));
  }

  async addResource(): Promise<void> {
    await webActions.clickElement(ResourcePageObjects.ADD_RESOURCE_BUTTON);
  }

  async openResourceWithName(name: string): Promise<void> {
    await webActions.clickElement(ResourcePageObjects.RESOURCE_CARD.replace(`resourceName`, name));
  }

  async clickOnAddResourceButton(): Promise<void> {
    await webActions.clickElementByExactRole("button", "Add resource");
  }

  async closeReorderResourcesPopup(): Promise<void> {
    await webActions.clickElementByLabelAndByRole("Reorder resources in the 'Position' view", 'button', 'Close');
  }
}
