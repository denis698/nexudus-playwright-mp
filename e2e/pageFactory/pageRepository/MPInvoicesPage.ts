import { MPInvoicesPageObjects } from '@objects/MPInvoicesPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';
import { MPCommonPage } from './MPCommonPage';

let webActions: WebActions;

export class MPInvoicesPage extends MPInvoicesPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async navigateTo(): Promise<void> {
    await webActions.navigate(
      '/' + MPCommonPage.LOCATION_NAME_1 + MPInvoicesPageObjects.INVOICES_PAGE_URL
    );
  }

  async verifyNoInvoicesText(): Promise<void> {
    await webActions.verifyElementNotPresent(MPInvoicesPageObjects.INVOICES_TEXT);
  }
}
