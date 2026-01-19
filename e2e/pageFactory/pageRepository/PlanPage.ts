import { PlanPageObjects } from '@objects/PlanPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class PlanPage extends PlanPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(PlanPageObjects.ADD_PLAN_BUTTON);
    await webActions.verifyURL(PlanPageObjects.PLAN_PAGE_URL);
  }

  async verifyPlanExistWithName(planName: string): Promise<void> {
    await webActions.waitForPageElement(PlanPageObjects.PLAN_NAME.replace(`planName`, planName));
    await webActions.verifyElementText(PlanPageObjects.PLAN_NAME.replace(`planName`, planName), planName);
    await webActions.verifyElementCount(PlanPageObjects.PLAN_NAME.replace(`planName`, planName), 1);
  }

  async verifyPlanNotExistWithName(planName: string): Promise<void> {
    await webActions.verifyElementNotPresent(PlanPageObjects.PLAN_NAME.replace(`planName`, planName));
  }

  async accessAddPlan(): Promise<void> {
    await webActions.clickElement(PlanPageObjects.ADD_PLAN_BUTTON);
  }

  async openWithName(planName: string): Promise<void> {
    await webActions.clickElement(PlanPageObjects.PLAN_NAME.replace(`planName`, planName));
  }

  async delayInTest(time: number): Promise<void> {
    await webActions.delay(time);
  }

  async viewPublishedPlans(): Promise<void> {
    await webActions.clickElement(PlanPageObjects.SEARCH_MENU);
    await webActions.clickElement(PlanPageObjects.SEARCH_MENU_PUBLISHED_OPTION);
  }

  async viewInternalPlans(): Promise<void> {
    await webActions.clickElement(PlanPageObjects.SEARCH_MENU);
    await webActions.clickElement(PlanPageObjects.SEARCH_MENU_INTERNAL_OPTION);
  }

  async viewShowAllPlans(): Promise<void> {
    await webActions.clickElement(PlanPageObjects.SEARCH_MENU);
    await webActions.clickElement(PlanPageObjects.SEARCH_MENU_SHOW_ALL_OPTION);
  }

  async viewAvailablePlans(): Promise<void> {
    await webActions.clickElement(PlanPageObjects.SEARCH_MENU);
    await webActions.clickElement(PlanPageObjects.SEARCH_MENU_AVAILABLE_OPTION);
  }

  async archivePlan(): Promise<void> {
    await webActions.clickElement(PlanPageObjects.PLAN_CHECK_BOX);
    await webActions.clickElement(PlanPageObjects.BULK_ACTIONS_BUTTON.replace('Text','Bulk actions'));
    await webActions.clickElement(PlanPageObjects.ARCHIVE_PLAN_BUTTON);
    await webActions.clickElement(PlanPageObjects.CONFIRMATION_BUTTON);
    await webActions.clickElement(PlanPageObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
    await webActions.clickElement(PlanPageObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
  }

  async viewArchivePlans(): Promise<void> {
    await webActions.clickElement(PlanPageObjects.SEARCH_MENU);
    await webActions.clickElement(PlanPageObjects.SEARCH_MENU_ARCHIVED_OPTION);
  }

  async restorePlan(): Promise<void> {
    await webActions.clickElement(PlanPageObjects.PLAN_CHECK_BOX);
    await webActions.clickElement(PlanPageObjects.BULK_ACTIONS_BUTTON.replace('Text','Bulk actions'));
    await webActions.clickElement(PlanPageObjects.RESTORE_PLAN_BUTTON);
    await webActions.clickElement(PlanPageObjects.CONFIRMATION_BUTTON);
    await webActions.clickElement(PlanPageObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
    await webActions.clickElement(PlanPageObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
  }

  async deleteAllPlans(): Promise<void> {
    if (await webActions.getNumberOfElements(PlanPageObjects.NO_PLANS_LABEL) == 0) {
      await webActions.waitForPageEnabledElement(PlanPageObjects.ALL_PLANS_CHECKBOX);
      await webActions.clickElement(PlanPageObjects.ALL_PLANS_CHECKBOX);
      await webActions.clickElement(PlanPageObjects.BULK_ACTIONS_BUTTON.replace('Text','Bulk actions'));
      await webActions.clickElement(PlanPageObjects.DELETE_PLANS_BUTTON_SIDE_MENU.replace('Text','Delete '));
      await webActions.enterElementText(PlanPageObjects.DELETE_PLANS_TEXT_FIELD, 'DELETE');
      await webActions.clickElementByFirstRole('button', 'Yes, do it');
      await webActions.waitForElement('text="Delete completed"');
      await webActions.clickElement(PlanPageObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
    }
  }

  async verifyNoPlansPresent(): Promise<void> {
    await webActions.waitForElement(PlanPageObjects.NO_PLANS_CANVAS);
  }

  async getNumberOfPlans(): Promise<number> {
    return await webActions.getNumberOfElements(PlanPageObjects.NO_PLANS_LABEL);
  }

  async viewArchivedPlans(): Promise<void> {
    await webActions.clickElement(PlanPageObjects.SEARCH_MENU);
    await webActions.clickElement(PlanPageObjects.SEARCH_MENU_ARCHIVED_OPTION);
  }
    
  async searchByPlanName(name: string): Promise<void> {
    await webActions.enterElementText(PlanPageObjects.SEARCH_FILTER_INPUT_TEXT_FIELD, name);
    await webActions.clickElement(PlanPageObjects.SEARCH_OPTION_BY_TEAM_NAME.replace('teamNamePlaceHolder', name));
    await webActions.keyboardEnter('Escape'); // hide the dpordown list for better visual control
  }
}
