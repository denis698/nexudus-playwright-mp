import { SettingsEmailQueuePageObjects } from '@objects/SettingsEmailQueuePageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class SettingsEmailQueuePage extends SettingsEmailQueuePageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(SettingsEmailQueuePageObjects.EMAIL_QUEUE_PANEL_TEXT);
    await webActions.verifyURL(SettingsEmailQueuePageObjects.EMAIL_QUEUE_PAGE_URL);
  }

  async deleteEmail(): Promise<void> {
    if (await webActions.getNumberOfElements(SettingsEmailQueuePageObjects.NO_EMAIL_LABEL) == 0) {
      await webActions.clickElementByRole('button', 'Rows per page:');
      await webActions.clickElementByRole('button', '100 rows');
      await webActions.waitForPageEnabledElement(SettingsEmailQueuePageObjects.ALL_EMAIL_CHECKBOX);
      await webActions.clickElement(SettingsEmailQueuePageObjects.ALL_EMAIL_CHECKBOX);
      await webActions.clickElement(SettingsEmailQueuePageObjects.BULK_ACTIONS_BUTTON.replace('Text','Bulk actions'));
      await webActions.clickElement(SettingsEmailQueuePageObjects.DELETE_EMAIL_BUTTON_SIDE_MENU.replace('Text','Delete '));
      await webActions.enterElementText(SettingsEmailQueuePageObjects.DELETE_EMAIL_TEXT_FIELD, 'DELETE');
      await webActions.clickElementByFirstRole('button', 'Yes, do it');
      await webActions.clickElement(SettingsEmailQueuePageObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
    }
  }

}
