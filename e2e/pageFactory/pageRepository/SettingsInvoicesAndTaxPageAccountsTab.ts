import { SettingsInvoicesAndTaxPageAccountsTabObjects } from '@objects/SettingsInvoicesAndTaxPageAccountsTabObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class SettingsInvoicesAndTaxPageAccountsTab extends SettingsInvoicesAndTaxPageAccountsTabObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(
      SettingsInvoicesAndTaxPageAccountsTabObjects.ACCOUNTS_TAB_HEADER
    );
    await webActions.verifyURL(
      SettingsInvoicesAndTaxPageAccountsTabObjects.ACCOUNTS_TAB_URL
    );
  }

  async disableFinantialAccountsSettings(): Promise<void> {
    await webActions.waitForPageElement(SettingsInvoicesAndTaxPageAccountsTabObjects.FINANTIAL_ACCOUNT_BUTTON_TEXT);
    const enableFinantialAccountButton = await webActions.getNumberOfElements(SettingsInvoicesAndTaxPageAccountsTabObjects.FINANCIAL_ACCOUNT_SETTING_ENABLED);
    if (enableFinantialAccountButton > 0) {
      await this.disableRequireAllSalesToHaveFinancialAccount();
      await this.save();
    }
  }

  async enableFinantialAccountsSettings(): Promise<void> {
    await webActions.waitForPageElement(SettingsInvoicesAndTaxPageAccountsTabObjects.FINANTIAL_ACCOUNT_BUTTON_TEXT);
    const enableFinantialAccountButton = await webActions.getNumberOfElements(SettingsInvoicesAndTaxPageAccountsTabObjects.FINANCIAL_ACCOUNT_SETTING_ENABLED);
    if (enableFinantialAccountButton == 0) {
      await this.enableRequireAllSalesToHaveFinancialAccount();
      await this.save();
    }
  }

  async disableRequireAllSalesToHaveFinancialAccount(): Promise<void> {
    await webActions.delay(2000); //TEMP CODE
    await webActions.forceClickElement(SettingsInvoicesAndTaxPageAccountsTabObjects.FINANCIAL_ACCOUNT_SETTING_ENABLED);
  }

  async enableRequireAllSalesToHaveFinancialAccount(): Promise<void> {
    await webActions.delay(2000); //TEMP CODE
    await webActions.forceClickElement(SettingsInvoicesAndTaxPageAccountsTabObjects.FINANCIAL_ACCOUNT_SETTING_DISABLED);
  }

  async save(): Promise<void> {
    await webActions.clickElement(SettingsInvoicesAndTaxPageAccountsTabObjects.SAVE_SETTINGS_BUTTON);
    await webActions.clickElement(SettingsInvoicesAndTaxPageAccountsTabObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
    await webActions.verifyElementNotPresent(SettingsInvoicesAndTaxPageAccountsTabObjects.SAVE_SETTINGS_BUTTON);
  }
}
