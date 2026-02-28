import { MPSettingsPageObjects } from '@objects/MPSettingsPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class MPSettingsPage extends MPSettingsPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(MPSettingsPageObjects.SETTINGS_MENU.replace(`/locuser`, process.env.MP_TEST_USER));
    await webActions.verifyURL(MPSettingsPageObjects.PAGE_URL);
  }

  async accessDashboard(): Promise<void> {
    await webActions.clickElementByRole("button", "avatar");
    await webActions.clickElementByRole('link', 'Dashboard');    
  }
  
}
