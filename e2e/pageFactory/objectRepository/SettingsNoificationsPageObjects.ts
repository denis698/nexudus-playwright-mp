export class SettingsNoificationsPageObjects {
  protected static NOTIFICATIONS_PAGE_URL = `/settings/5/0/0`;
  protected static NOTIFICATIONS_PAGE_TITLE = `Notifications - Coworking Soho (DENIS)`;
  protected static NOTIFICATION_DISABLED_BUTTON = `.euiSwitch [aria-checked="false"].euiSwitch__button`;
  protected static NOTIFICATION_ENABLED_BUTTON = `.euiSwitch [aria-checked="true"].euiSwitch__button`;
  protected static SAVE_SETTINGS_BUTTON = `text="Save settings"`;
  protected static NOTIFICATIONS_PANEL_TEXT = `text="Enable notifications system (recommended)"`;
  protected static CLOSE_NOTIFICATION_TOAST_BUTTON = `[data-test-subj="toastCloseButton"]`;
  protected static NOTIFICATION_BUTTON = `text="Enable notifications system (recommended)"`;
  protected static SAVE_CHANGES_DISABLED_BUTTON = `.euiButton-isDisabled`;
  protected static NOTIFICATION_BUTTON_TEXT = `text="Enable notifications system (recommended)"`;
  protected static NOTIFICATION_TOAST_TEXT = `[data-test-subj="euiToastBody"]`;
  protected static NOTIFICATION_HEADER = `[title="Notifications"]`;
}
