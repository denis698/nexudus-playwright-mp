export class SettingsInvoicesAndTaxPageAccountsTabObjects {
  protected static ACCOUNTS_TAB_URL = `/settings/1/0/6`;
  protected static ACCOUNTS_TAB_TITLE = `Accounts list - QA Global`;
  protected static ACCOUNTS_TAB_HEADER = `text="Financial accounts"`;
  protected static FINANCIAL_ACCOUNT_SETTING_ENABLED = `[id="Billing.RequireFinancialAccount"][aria-checked="true"]`;
  protected static FINANCIAL_ACCOUNT_SETTING_DISABLED = `[id="Billing.RequireFinancialAccount"][aria-checked="false"]`;
  protected static SAVE_SETTINGS_BUTTON = `text="Save settings"`;
  protected static CLOSE_NOTIFICATION_TOAST_BUTTON = `[data-test-subj="toastCloseButton"]`;
  protected static SAVE_CHANGES_DISABLED_BUTTON = `.euiButton-isDisabled`;
  protected static FINANTIAL_ACCOUNT_BUTTON_TEXT = `text="Existing items you may have created before enabling this option may still have missing financial accounts. Check your chart of accounts and tax rates to update those."`;
  protected static FINANCIAL_ACCOUNTS_HEADER_DESCRIPTION = `text="Financial accounts let you create categories for the different items you sell. Nexudus offers several financial reports based on these accounts. You can define accounts here and assign them to each item you sell from the chart menu."`;
}
