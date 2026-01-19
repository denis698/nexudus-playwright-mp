import { SettingsInvoicesAndTaxPageObjects } from '@objects/SettingsInvoicesAndTaxPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class SettingsInvoicesAndTaxPage extends SettingsInvoicesAndTaxPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(SettingsInvoicesAndTaxPageObjects.YOUR_DETAILS_TAB);
    await webActions.verifyURL(SettingsInvoicesAndTaxPageObjects.PAGE_URL);
  }

  async accessTaxTab(): Promise<void> {
    await webActions.clickElement(SettingsInvoicesAndTaxPageObjects.TAX_TAB);
  }

  async accessAccountsTab(): Promise<void> {
    await webActions.clickElement(SettingsInvoicesAndTaxPageObjects.ACCOUNTS_TAB);
  }
}
