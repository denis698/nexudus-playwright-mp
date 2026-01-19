import { SettingsPageObjects } from '@objects/SettingsPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class SettingsPage extends SettingsPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(SettingsPageObjects.SEARCH_TEXT_FIELD);
    await webActions.verifyURL(SettingsPageObjects.PAGE_URL);
  }

  async accessInvoicesAndTaxPage(): Promise<void> {
    await webActions.clickElement(SettingsPageObjects.INVOICES_AND_TAX_BUTTON);
  }

  async accessNotifications(): Promise<void> {
    await webActions.clickElement(SettingsPageObjects.NOTIFICATIONS_BUTTON);
  }

  async showAdvancedSettings(): Promise<void> {
    await webActions.clickElement(SettingsPageObjects.SHOW_ADVANCED_SETTINGS_BUTTON);
  }

  async accessEmailQueue(): Promise<void> {
    await webActions.clickElement(SettingsPageObjects.EMAIL_QUEUE_BUTTON);
  }

  async delayInTest(time: number): Promise<void> {
    await webActions.delay(time);
  }
}
