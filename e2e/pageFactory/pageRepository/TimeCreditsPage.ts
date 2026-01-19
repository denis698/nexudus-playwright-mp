import { TimeCreditsPageObjects } from '@objects/TimeCreditsPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class TimeCreditsPage extends TimeCreditsPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(TimeCreditsPageObjects.ADD_TIME_CREDIT_BUTTON);
    await webActions.verifyURL(TimeCreditsPageObjects.TIME_CREDITS_PAGE_URL);
  }

  async clickOnAddTimeCreditButton(): Promise<void> {
    await webActions.clickElementByExactRole("button", "Add time credit");
  }

  async verifyTimeCreditExistWithName(name: string): Promise<void> {
    await webActions.verifyElementText(TimeCreditsPageObjects.TIME_CREDIT.replace(`timeCreditName`, name),name);
    await webActions.verifyElementCount(TimeCreditsPageObjects.TIME_CREDIT.replace(`timeCreditName`, name),1);
  }

  async verifyTimeCreditNotExistWithName(name: string): Promise<void> {
    await webActions.verifyElementNotPresent(TimeCreditsPageObjects.TIME_CREDIT.replace(`timeCreditName`, name));
  }

  async openTimeCreditWithName(name: string): Promise<void> {
    await webActions.clickElement(TimeCreditsPageObjects.TIME_CREDIT.replace(`timeCreditName`, name));
  }
}
