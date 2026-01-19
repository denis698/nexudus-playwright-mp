import { AddMultipleCustomersDialogObjects } from '@objects/AddMultipleCustomersDialogObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class AddMultipleCustomersDialog extends AddMultipleCustomersDialogObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async setTeam(name, emails): Promise<void> {
    await webActions.enterElementText(AddMultipleCustomersDialogObjects.TEAM_NAME_INPUT,name);
    await webActions.enterElementText(AddMultipleCustomersDialogObjects.EMAILS_TEXT_FIELD,emails);
  }

  async save(): Promise<void> {
    await webActions.clickElement(AddMultipleCustomersDialogObjects.SAVE_BUTTON);
    await webActions.waitUntilElementNotPresent(AddMultipleCustomersDialogObjects.TITLE,30000);
  }
}
