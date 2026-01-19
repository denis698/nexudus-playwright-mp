import { DashboardPageObjects } from '@objects/DashboardPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class DashboardPage extends DashboardPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.waitForURL(DashboardPageObjects.DASHBOARD_PAGE_URL);
    await webActions.verifyDashboardPageElements(DashboardPageObjects.DASHBOARD_PAGE_SECTION,DashboardPageObjects.DASHBOARD_GRAPH);
  }

  async closePopUps(): Promise<void> {
    //1
    await webActions.waitForPageElement(DashboardPageObjects.RECENT_UPDATES_SIDE_PANEL);
    const recentUpdatesSidePanel = await webActions.getNumberOfElements(DashboardPageObjects.RECENT_UPDATES_SIDE_PANEL)
      if(recentUpdatesSidePanel > 0) {
        await webActions.clickElement(DashboardPageObjects.CLOSE_RECENT_UPDATES_SIDE_PANEL_BUTTON);
      }
    //2
    await webActions.clickElementByLabelAndByRole('Meet NAI', 'button', 'Close')
    //3
    await webActions.clickElementByLabelAndByRole('Unlock your potential with Nexudus Academy!', 'button', 'Close')
    //4
    await webActions.clickElementByFirstRole('button', 'Got it!');
    
  }

  async closeSidePanel(): Promise<void> {
    await webActions.clickElementByExactRole('button', 'Close');
  }

  async verifyUserLoginStatus(userName: string): Promise<void> {
    await webActions.verifyLoginStatus(
      DashboardPageObjects.HEADER_LOGIN_ACCOUNT_NAME.replace(
        `userName`,
        userName
      )
    );
  }

  async logout(): Promise<void> {
    await webActions.clickElement(DashboardPageObjects.LOGOUT_MENU);
    await webActions.clickElement(DashboardPageObjects.LOGOUT_BUTTON);
  }

  async verifyEmailNotificationWarningPresent(): Promise<void> {
    await webActions.verifyThreePageElements(
      DashboardPageObjects.EMAIL_NOTIFICATIONS_TEXT,
      DashboardPageObjects.NOTIFICATION_LINK,
      DashboardPageObjects.NOTIFICATIOB_LINK_TEXT
    );
  }

  async verifyEmailNotificationWarningIsNotPresent(): Promise<void> {
    await webActions.verifyElementNotPresent(
      DashboardPageObjects.EMAIL_NOTIFICATIONS_TEXT
    );
    await webActions.verifyElementNotPresent(
      DashboardPageObjects.NOTIFICATION_LINK
    );
    await webActions.verifyElementNotPresent(
      DashboardPageObjects.NOTIFICATIOB_LINK_TEXT
    );
  }
}
