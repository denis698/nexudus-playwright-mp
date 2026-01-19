import { InvoicesPageObjects } from '@objects/InvoicesPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class InvoicesPage extends InvoicesPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(InvoicesPageObjects.ADD_INVOICE_BUTTON);
    await webActions.verifyURL(InvoicesPageObjects.PAGE_URL);
  }

  async accessAddInvoice(): Promise<void> {
    await webActions.clickElementByRole('button', 'Add invoice');
  }

  async verifyNoInvoices(): Promise<void> {
    await webActions.waitForVisibleElementText('No items found');
  }

  async delete(): Promise<void> {  
    await webActions.clickElementByLabel('Select row 1');
    await webActions.clickElementByText('Delete');
    await webActions.clickElementByRole('button', 'Delete invoice (not');
    await webActions.waitForVisibleElementText('Action completed');
  }

}
