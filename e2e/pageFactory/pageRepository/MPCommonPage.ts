import { MPCommonPageObjects } from '@objects/MPCommonPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class MPCommonPage extends MPCommonPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async navigateTo(locationName: string): Promise<void> {
    await webActions.navigate('/' + locationName);
  }

  async isElementVisibleWithName(name:string): Promise<boolean> {
    return await webActions.isVisibleByText(name);
  }
}
