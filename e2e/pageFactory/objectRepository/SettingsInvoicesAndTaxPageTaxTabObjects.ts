export class SettingsInvoicesAndTaxPageTaxTabObjects {
  protected static TAX_TAB_URL = `/settings/1/0/5`;
  protected static TAX_TAB_TITLE = `TaxRates list - QA Global`;
  protected static TAX_TAB_HEADER = `text="Tax settings"`;
  protected static TAX_RATE_SETTING_ENABLED  = `[id="Billing.RequireTaxRate"][aria-checked="true"]`;
  protected static TAX_RATE_SETTING_DISABLED = `[id="Billing.RequireTaxRate"][aria-checked="false"]`;
  protected static SAVE_SETTINGS_BUTTON = `text="Save settings"`;
  protected static CLOSE_NOTIFICATION_TOAST_BUTTON = `[data-test-subj="toastCloseButton"]`;
  protected static SAVE_CHANGES_DISABLED_BUTTON = `.euiButton-isDisabled`;
  protected static TAX_RATE_BUTTON_TEXT = `text="Existing items you may have created before enabling this option may still have missing tax rates. Check your chart of accounts and tax rates to update those."`;
  protected static TAX_SETTINGS_HEADER_DESCRIPTION = `text="Defines if your invoices to customers will include tax and how prices will be typed in and displayed to customers."`;
  protected static TAX_RATE_CHECKBOX = `[aria-label="Select this row"]`;
}
