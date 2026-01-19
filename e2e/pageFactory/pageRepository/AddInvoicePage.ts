import { AddInvoicesPageObjects } from '@objects/AddInvoicePageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class AddInvoicePage extends AddInvoicesPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElements(
      AddInvoicesPageObjects.TITLE,
      AddInvoicesPageObjects.CUSTOMER_DROP_DOWN_MENU);
  }

  async setCustomer(name:string): Promise<void> {
    await webActions.enterTextByExactLabel('Customer', name);
    await webActions.clickElementByRole('option', 'invoice [highlight start] invoice');
  }

  async save(): Promise<void> {
    await webActions.waitForPageEnabledElement(AddInvoicesPageObjects.SAVE_CHANGES_BUTTON);
    await webActions.forceClickElement(AddInvoicesPageObjects.SAVE_CHANGES_BUTTON);
    await webActions.waitForPageElement(AddInvoicesPageObjects.SAVE_CHANGES_DISABLED_BUTTON);
  }

  async verifyInvoice(productName:string, productPrice:string, tax:string): Promise<void> {
    await webActions.waitForVisibleElementText(productName);
    await webActions.waitForVisibleFirstElementText(productPrice)
    await webActions.waitForVisibleElementText(tax);
  }

  async returnToInvoices(): Promise<void> {
    await webActions.clickElementByLabel('Close this dialog');
  }

  async delete(): Promise<void> {  
    await webActions.clickElementByText('Delete');
    await webActions.enterElementText(AddInvoicesPageObjects.DELETE_INVOICES_TEXT_FIELD, 'DELETE INVOICE');
    await webActions.clickElementByRole('button', 'Delete invoice (not');
    await webActions.waitForVisibleElementText('Action completed');
  }

}
