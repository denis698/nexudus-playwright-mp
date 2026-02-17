import { MPDashboardPageObjects } from '@objects/MPDashboardPageObjects';
import { WebActions } from '@lib/WebActions';
import { expect, type Page } from '@playwright/test';

let webActions: WebActions;

export class MPDashboardPage extends MPDashboardPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(MPDashboardPageObjects.OUNBOARDING_SECTION);
    await webActions.verifyURL(MPDashboardPageObjects.PAGE_URL);
    await webActions.verifyTitle(MPDashboardPageObjects.PAGE_TITLE);
  }

  async getUserLoginStatus(userName:string): Promise<string> {
    await webActions.clickElementByRole("img", "chevron-down icon");
    return await webActions.getTextFromElementByRole('link', userName);
  }

  async getProfileMenu(): Promise<string> {
    await webActions.clickElementByRole("img", "chevron-down icon");
    return await webActions.getTextFromElement(MPDashboardPageObjects.PROFILE_DROPDOWN);
  }

}
