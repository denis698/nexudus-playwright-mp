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

  async isElementVisibleWithExactName(name:string): Promise<boolean> {
    return await webActions.isVisibleByExactText(name);
  }

  async isElementVisibleByRole(role:any, name:string): Promise<boolean> {
    return await webActions.isVisibleByRole(role, name)
  }


  async isElementVisible(selector:string): Promise<boolean> {
    return await webActions.isVisible(selector);
  }
  
  async setLanguage(name:string): Promise<void> {
    await webActions.clickElementByRole('button', 'Language');
    await webActions.clickElementByRole('button', name);
  }

  async delayInTest(time: number): Promise<void> {
    await webActions.delay(time);
  }

}
