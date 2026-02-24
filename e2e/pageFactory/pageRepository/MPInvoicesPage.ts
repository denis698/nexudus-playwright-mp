import { MPInvoicesPageObjects } from '@objects/MPInvoicesPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class MPInvoicesPage extends MPInvoicesPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(MPInvoicesPageObjects.INVOICE_MENU.replace(`/locuser`, process.env.MP_TEST_USER));
    await webActions.verifyURL(MPInvoicesPageObjects.PAGE_URL);
    await webActions.verifyTitle(MPInvoicesPageObjects.PAGE_TITLE);
  }
 
  async accessDashboard(): Promise<void> {
    await webActions.clickElementByRole("img", "chevron-down icon");
    await webActions.clickElementByRole('link', 'Dashboard');    
  }
}
