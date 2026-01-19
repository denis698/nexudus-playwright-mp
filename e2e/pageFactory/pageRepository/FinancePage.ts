import { FinancePageObjects } from '@objects/FinancePageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class FinancePage extends FinancePageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyThreePageElements(
      FinancePageObjects.INVOICES_BUTTON,
      FinancePageObjects.CONTACTS_BUTTON,
      FinancePageObjects.CONTACTS_CALENDAR_BUTTON
    );
    await webActions.verifyURL(FinancePageObjects.FINANCE_PAGE_URL);
  }

  async accessInvoices(): Promise<void> {
    await webActions.clickElementByFirstRole('link', 'Invoices');
  }

}
