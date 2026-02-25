import { MPMyPlansPageObjects } from '@objects/MPMyPlansPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class MPMyPlansPage extends MPMyPlansPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(MPMyPlansPageObjects.BOOKINGS_MENU.replace(`/locuser`, process.env.MP_TEST_USER));
    await webActions.verifyURL(MPMyPlansPageObjects.PAGE_URL);
    await webActions.verifyTitle(MPMyPlansPageObjects.PAGE_TITLE);
  }
 
  async accessDashboard(): Promise<void> {
    await webActions.clickElementByRole("img", "chevron-down icon");
    await webActions.clickElementByRole('link', 'Dashboard');    
  }
}
