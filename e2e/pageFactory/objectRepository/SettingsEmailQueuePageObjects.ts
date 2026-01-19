export class SettingsEmailQueuePageObjects {
  protected static EMAIL_QUEUE_PAGE_URL = `/settings/5/3/0`;
  protected static EMAIL_QUEUE_PAGE_TITLE = `Email notifications list - Coworking Soho (DENIS)`;
  protected static EMAIL_QUEUE_PANEL_TEXT = `text="This is the list of all email notifications we have sent from this location."`;
  protected static CLOSE_NOTIFICATION_TOAST_BUTTON = `[data-test-subj="toastCloseButton"]`;
  protected static NOTIFICATION_TOAST_TEXT = `[data-test-subj="euiToastBody"]`;
  protected static NO_EMAIL_LABEL = `text="No items found"`;
  protected static DELETE_EMAIL_TEXT_FIELD = '[placeholder="Type \'DELETE\' to continue"]';
  protected static DELETE_EMAIL_BUTTON_SIDE_MENU = '//*[contains(text(),"Text")]';
  protected static BULK_ACTIONS_BUTTON = '//*[contains(text(),"Text")]';
  protected static ALL_EMAIL_CHECKBOX = `[data-test-subj="checkboxSelectAll"]`;
  protected static NO_EMAIL_CANVAS = `.euiEmptyPrompt__main`;
}
