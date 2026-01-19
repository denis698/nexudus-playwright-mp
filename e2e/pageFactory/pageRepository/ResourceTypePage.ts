import { ResourceTypePageObjects } from '@objects/ResourceTypePageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class ResourceTypePage extends ResourceTypePageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(ResourceTypePageObjects.ADD_RESOURCE_TYPE_BUTTON);
    await webActions.verifyURL(ResourceTypePageObjects.RESOURCE_TYPES_PAGE_URL);
  }

  async verifyTypeExistWithName(name: string): Promise<void> {
    await webActions.verifyElementText(ResourceTypePageObjects.RESOURCE_TYPE.replace(`resourceTypeName`, name),name);
    await webActions.verifyElementCount(ResourceTypePageObjects.RESOURCE_TYPE.replace(`resourceTypeName`, name),1);
  }

  async verifyTypeNotExistWithName(name: string): Promise<void> {
    await webActions.verifyElementNotPresent(ResourceTypePageObjects.RESOURCE_TYPE.replace(`resourceTypeName`, name));
  }

  async openResourceTypeWithName(name: string): Promise<void> {
    await webActions.clickElementByRole('link', name);
  }

  async clickOnAddResourceTypeButton(): Promise<void> {
    await webActions.clickElementByExactRole("button", "Add resource type");
  }

}
