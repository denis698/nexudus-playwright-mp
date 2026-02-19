import { MPMarketingPageObjects } from '@objects/MPMarketingPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class MPMarketingPage extends MPMarketingPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async navigateTo(url: string): Promise<void> {
    await webActions.navigate(url);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(MPMarketingPageObjects.SIGN_IN_BUTTON);
  }

  async isElementVisibleWithName(name:string): Promise<boolean> {
    return await webActions.isVisibleByText(name);
  }

  async isElementVisible(selector:string): Promise<boolean> {
    return await webActions.isVisible(selector);
  }
}
