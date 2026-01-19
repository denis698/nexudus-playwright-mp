import { OperationsPageObjects } from '@objects/OperationsPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class OperationsPage extends OperationsPageObjects {
  private readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyThreePageElements(
      OperationsPageObjects.MEMBERS_CONTACTS_BUTTON,
      OperationsPageObjects.BOOKING_CALENDAR_BUTTON,
      OperationsPageObjects.ACCESS_AND_CHECKIN_BUTTON
    );
    await webActions.verifyURL(OperationsPageObjects.URL);
  }

  async accessMembersContacts(): Promise<void> {
    await webActions.waitForPageElement(
      OperationsPageObjects.MEMBERS_CONTACTS_BUTTON
    );
    await webActions.clickElement(
      OperationsPageObjects.MEMBERS_CONTACTS_BUTTON
    );
  }

  async accessTeams(): Promise<void> {
    await webActions.waitForPageElement(OperationsPageObjects.TEAMS_BUTTON);
    await webActions.clickElement(OperationsPageObjects.TEAMS_BUTTON);
  }
}
