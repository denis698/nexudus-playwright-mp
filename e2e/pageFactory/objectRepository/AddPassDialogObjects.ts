export class AddPassDialogObjects {
  protected static MANUAL_ENTRY_BUTTON = `text="Manual entry"`;
  protected static WORKING_HOURS_PASS_BUTTON = `text="Working hours pass"`;
  protected static PAY_AS_YOU_GO_PASS_BUTTON = `text="Adds a pass set to be automatically sold to customers checking in but who don't yet have a pass."`;
  protected static ADD_PASS_BUTTON = `#billing_timePasses_wizard_add_button`;
  protected static PASS_NAME_TEXT_FIELD = `[data-test-subj="timePass_Name"]`;
  protected static SAVE_CHANGES_BUTTON = `text="Save changes"`;
  protected static CONFIRMATION_BUTTON = `text="Yes, do it"`;
  protected static MORE_ACTIONS_BUTTON = `text="More actions"`;
  protected static CLOSE_NOTIFICATION_TOAST_BUTTON = `[data-test-subj="toastCloseButton"]`;
  protected static DELETE_BUTTON = `text=Delete`;
  protected static CONFIRMATION_TEXT = `[data-test-subj="euiToastHeader__title"]`;
  protected static SAVE_ERROR = '.euiFormErrorText';
  protected static TOAST_ERROR_TEXT = `[data-test-subj="euiToastBody"]`;
  protected static CLOSE_RETURN_BUTTON = `text="Close"`;
  protected static DISCARD_UNSAVED_CHANGES_BUTTON = `text="Discard unsaved changes"`;
  protected static WHP_NAME_TEXT_FIELD = `[placeholder="Working hours pass"]`;
  protected static PAYG_NAME_TEXT_FIELD = `[placeholder="Pays as you pass"]`;
  protected static FINANCIAL_ACCOUNTS_DROP_DOWN_MENU = "[data-test-subj='timePass_FinancialAccountId']";
  protected static TAX_RATE_DROP_DOWN_MENU = "[data-test-subj='timePass_TaxRateId']";
  protected static CLOSE_LIST_OF_OPTIONS = `[aria-label="Close list of options"]`;
  protected static DELETE_PASSES_TEXT_FIELD = '[placeholder="Type \'DELETE\' to continue"]';
}
