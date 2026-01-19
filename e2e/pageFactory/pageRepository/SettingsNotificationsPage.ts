import { SettingsNoificationsPageObjects } from '@objects/SettingsNoificationsPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class SettingsNotificationsPage extends SettingsNoificationsPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(SettingsNoificationsPageObjects.NOTIFICATIONS_PANEL_TEXT);
    await webActions.verifyURL(SettingsNoificationsPageObjects.NOTIFICATIONS_PAGE_URL);
    await webActions.verifyTitle(SettingsNoificationsPageObjects.NOTIFICATIONS_PAGE_TITLE);
  }

  async disableNotifications(): Promise<void> {
    await webActions.waitForPageElement(SettingsNoificationsPageObjects.NOTIFICATIONS_PANEL_TEXT);
    const enableNotificationButton = await webActions.getNumberOfElements(SettingsNoificationsPageObjects.NOTIFICATION_ENABLED_BUTTON)
    if(enableNotificationButton > 0) {
      await webActions.clickElementByRole('switch', 'Enable notifications system (');
      await this.save();
    }
  }

  async enableNotifications(): Promise<void> {
    await webActions.waitForPageElement(SettingsNoificationsPageObjects.NOTIFICATIONS_PANEL_TEXT);
    const disabledNotificationButton = await webActions.getNumberOfElements(SettingsNoificationsPageObjects.NOTIFICATION_DISABLED_BUTTON)
    if (disabledNotificationButton > 0) {
      await webActions.clickElementByRole('switch', 'Enable notifications system (');
      await this.save();
    }
  }

  async save(): Promise<void> {
    await webActions.waitForPageElement(SettingsNoificationsPageObjects.SAVE_SETTINGS_BUTTON);
    await webActions.clickElement(SettingsNoificationsPageObjects.SAVE_SETTINGS_BUTTON);
    await webActions.clickElement(SettingsNoificationsPageObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
    await webActions.verifyElementNotPresent(SettingsNoificationsPageObjects.SAVE_SETTINGS_BUTTON);
  }

  async reloadPage(): Promise<void> {
    await webActions.reload();
  }
}
