import { SettingsInvoicesAndTaxPageTaxTabObjects } from '@objects/SettingsInvoicesAndTaxPageTaxTabObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class SettingsInvoicesAndTaxPageTaxTab extends SettingsInvoicesAndTaxPageTaxTabObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(SettingsInvoicesAndTaxPageTaxTabObjects.TAX_TAB_HEADER);
    await webActions.verifyURL(SettingsInvoicesAndTaxPageTaxTabObjects.TAX_TAB_URL);
  }

  async disableTaxRateSettings(): Promise<void> {
    await webActions.waitForElement(SettingsInvoicesAndTaxPageTaxTabObjects.TAX_SETTINGS_HEADER_DESCRIPTION);
    const enabledTaxRateButton = await webActions.getNumberOfElements(SettingsInvoicesAndTaxPageTaxTabObjects.TAX_RATE_SETTING_ENABLED);
    if (enabledTaxRateButton > 0) {
      await this.disableRequireAllSalesToHaveDefinedTaxRate();
      await this.save();
    }
  }

  async enableTaxRateSettings(): Promise<void> {
    await webActions.waitForElement(SettingsInvoicesAndTaxPageTaxTabObjects.TAX_SETTINGS_HEADER_DESCRIPTION);
    const enabledTaxRateButton = await webActions.getNumberOfElements(SettingsInvoicesAndTaxPageTaxTabObjects.TAX_RATE_SETTING_ENABLED);
    if (enabledTaxRateButton == 0) {
      await this.enableRequireAllSalesToHaveDefinedTaxRate();
      await this.save();
    }
  }

  async disableRequireAllSalesToHaveDefinedTaxRate(): Promise<void> {
    await webActions.delay(2000); //TEMP CODE
    await webActions.forceClickElement(SettingsInvoicesAndTaxPageTaxTabObjects.TAX_RATE_SETTING_ENABLED);
  }

  async enableRequireAllSalesToHaveDefinedTaxRate(): Promise<void> {
    await webActions.delay(2000); //TEMP CODE
    await webActions.forceClickElement(SettingsInvoicesAndTaxPageTaxTabObjects.TAX_RATE_SETTING_DISABLED);
  }

  async save(): Promise<void> {
    await webActions.clickElement(SettingsInvoicesAndTaxPageTaxTabObjects.SAVE_SETTINGS_BUTTON);
    await webActions.clickElement(SettingsInvoicesAndTaxPageTaxTabObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
    await webActions.verifyElementNotPresent(SettingsInvoicesAndTaxPageTaxTabObjects.SAVE_SETTINGS_BUTTON);
  }
}
