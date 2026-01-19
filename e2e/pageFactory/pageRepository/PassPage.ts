import { PassPageObjects } from '@objects/PassPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class PassPage extends PassPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(PassPageObjects.ADD_PASS_BUTTON);
    await webActions.verifyURL(PassPageObjects.PASS_PAGE_URL);
  }

  async verifyPassExistWithName(passName: string): Promise<void> {
    await webActions.verifyElementText(PassPageObjects.PASS_NAME.replace(`passName`, passName),passName);
  }

  async verifyNumberOfPassesWithName(passName: string, numberOfPasses): Promise<void> {
    await webActions.verifyElementText(PassPageObjects.PASS_NAME.replace(`passName`, passName),passName);
    await webActions.verifyElementCount(PassPageObjects.PASS_NAME.replace(`passName`, passName),numberOfPasses);
  }

  async verifyPassNotExistWithName(passName: string): Promise<void> {
    await webActions.verifyElementNotPresent(PassPageObjects.PASS_NAME.replace(`passName`, passName));
  }

  async delayInTest(time: number): Promise<void> {
    await webActions.delay(time);
  }

  async accessAddPass(): Promise<void> {
    await webActions.clickElement(PassPageObjects.ADD_PASS_BUTTON);
  }

  async openPassWithName(passName: string): Promise<void> {
    await webActions.clickElement(PassPageObjects.PASS_NAME.replace(`passName`, passName));
  }

  async archivePass(): Promise<void> {
    await webActions.clickElement(PassPageObjects.PASS_CHECK_BOX);
    await webActions.clickElement(PassPageObjects.BULK_ACTIONS_BUTTON.replace('Text','Bulk actions'));
    await webActions.clickElement(PassPageObjects.ARCHIVE_PASS_BUTTON);
    await webActions.clickElement(PassPageObjects.CONFIRMATION_BUTTON);
    await webActions.clickElement(PassPageObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
    await webActions.clickElement(PassPageObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
  }

  async viewArchivePasses(): Promise<void> {
    await webActions.clickElement(PassPageObjects.SEARCH_MENU);
    await webActions.clickElement(PassPageObjects.SEARCH_MENU_ARCHIVED_OPTION);
  }

  async restorePass(): Promise<void> {
    await webActions.clickElement(PassPageObjects.PASS_CHECK_BOX);
    await webActions.clickElement(PassPageObjects.BULK_ACTIONS_BUTTON.replace('Text','Bulk actions'));
    await webActions.clickElement(PassPageObjects.RESTORE_PASS_BUTTON);
    await webActions.clickElement(PassPageObjects.CONFIRMATION_BUTTON);
    await webActions.clickElement(PassPageObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
    await webActions.clickElement(PassPageObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
  }

  async viewShowAllPasses(): Promise<void> {
    await webActions.clickElement(PassPageObjects.SEARCH_MENU);
    await webActions.clickElement(PassPageObjects.SEARCH_MENU_SHOW_ALL_OPTION);
  }

  async viewCalendarDayPasses(): Promise<void> {
    await webActions.clickElement(PassPageObjects.SEARCH_MENU);
    await webActions.clickElement(PassPageObjects.SEARCH_MENU_CALENDAR_DAY_OPTION);
  }

  async viewTimeBasedPasses(): Promise<void> {
    await webActions.clickElement(PassPageObjects.SEARCH_MENU);
    await webActions.clickElement(PassPageObjects.SEARCH_MENU_TIME_BASED_OPTION);
  }

  async viewAvailablePasses(): Promise<void> {
    await webActions.clickElement(PassPageObjects.SEARCH_MENU);
    await webActions.clickElement(PassPageObjects.SEARCH_MENU_AVAILABLE_OPTION);
  }

  async viewPayAsYouGoForMembersPasses(): Promise<void> {
    await webActions.clickElement(PassPageObjects.SEARCH_MENU);
    await webActions.clickElement(PassPageObjects.SEARCH_MENU_PAY_AS_YOU_GO_MEMBERS_PASSES);
  }

  async viewPayAsYouGoForContactsPasses(): Promise<void> {
    await webActions.clickElement(PassPageObjects.SEARCH_MENU);
    await webActions.clickElement(PassPageObjects.SEARCH_MENU_PAY_AS_YOU_GO_CONTACTS_PASSES);
  }

  async viewArchivedPasses(): Promise<void> {
    await webActions.clickElement(PassPageObjects.SEARCH_MENU);
    await webActions.clickElement(PassPageObjects.SEARCH_MENU_ARCHIVED_OPTION);
  }
  
  async getNumberOfPasses(): Promise<number> {
    return await webActions.getNumberOfElements(PassPageObjects.NO_PASS_LABEL);
  }

  async delete(): Promise<void> {
    if (await webActions.getNumberOfElements(PassPageObjects.NO_PASSES_LABEL) == 0) {
      await webActions.waitForPageEnabledElement(PassPageObjects.ALL_PASSES_CHECKBOX);
      await webActions.clickElement(PassPageObjects.ALL_PASSES_CHECKBOX);
      await webActions.clickElement(PassPageObjects.BULK_ACTIONS_BUTTON.replace('Text','Bulk actions'));
      await webActions.clickElement(PassPageObjects.DELETE_PASSES_BUTTON_SIDE_MENU.replace('Text','Delete '));
      await webActions.enterElementText(PassPageObjects.DELETE_PASSES_TEXT_FIELD, 'DELETE');
      await webActions.clickElementByFirstRole('button', 'Yes, do it');
      await webActions.waitForElement('text="Delete completed"');
      await webActions.clickElement(PassPageObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
    }
  }

  async verifyNoPassesPresent(): Promise<void> {
    await webActions.waitForElement(PassPageObjects.NO_PASSES_CANVAS);
  }

  async searchByPassName(name: string): Promise<void> {
    await webActions.clickElement(PassPageObjects.SEARCH_FILTER_INPUT_TEXT_FIELD);
    await webActions.enterElementText(PassPageObjects.SEARCH_FILTER_INPUT_TEXT_FIELD, name);
    await webActions.clickElement(PassPageObjects.SEARCH_OPTION_BY_PASS_NAME.replace('passNamePlaceHolder', name));
    await webActions.keyboardEnter('Escape'); // hide the dpordown list for better visual control
  }
}
