import { AddPassDialogObjects } from '@objects/AddPassDialogObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class AddPassDialog extends AddPassDialogObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(AddPassDialogObjects.PASS_NAME_TEXT_FIELD);
  }

  async addManualEntryPass(): Promise<void> {
    await webActions.clickElement(AddPassDialogObjects.MANUAL_ENTRY_BUTTON);
  }

  async addWorkingHoursPass(name:string, from: string,until: string): Promise<void> {
    await webActions.clickElement(AddPassDialogObjects.WORKING_HOURS_PASS_BUTTON);
    await webActions.clearElementText(AddPassDialogObjects.WHP_NAME_TEXT_FIELD);
    await webActions.enterElementText(AddPassDialogObjects.WHP_NAME_TEXT_FIELD, name );
    await webActions.clickElementByPlaceholder('09:');
    await webActions.clickElementByFirstRole('option', from);
    await webActions.clickElementByPlaceholder('17:');
    await webActions.clickElementByFirstRole('option', until);
    await webActions.clickElement(AddPassDialogObjects.ADD_PASS_BUTTON);
  }

  async addPayAsYouGoPass(passName: string): Promise<void> {
    await webActions.clickElement(AddPassDialogObjects.PAY_AS_YOU_GO_PASS_BUTTON);
    await webActions.clearElementText(AddPassDialogObjects.PAYG_NAME_TEXT_FIELD);
    await webActions.enterElementText(AddPassDialogObjects.PAYG_NAME_TEXT_FIELD,passName);
    await webActions.forceClickElement(AddPassDialogObjects.ADD_PASS_BUTTON);
  }

  async setPassName(passName: string): Promise<void> {
    await webActions.clearElementText(AddPassDialogObjects.PASS_NAME_TEXT_FIELD);
    await webActions.enterElementText(AddPassDialogObjects.PASS_NAME_TEXT_FIELD,passName);
  }

  async save(): Promise<void> {
    await webActions.waitForElement(AddPassDialogObjects.SAVE_CHANGES_BUTTON);
    await webActions.clickElement(AddPassDialogObjects.SAVE_CHANGES_BUTTON);
  }

  async delete(): Promise<void> {
    await webActions.clickElement(AddPassDialogObjects.DELETE_BUTTON);
    await webActions.enterElementText(AddPassDialogObjects.DELETE_PASSES_TEXT_FIELD, 'DELETE');
    await webActions.verifyPageElement(AddPassDialogObjects.CONFIRMATION_BUTTON);
    await webActions.clickElement(AddPassDialogObjects.CONFIRMATION_BUTTON);
    await webActions.verifyElementText(AddPassDialogObjects.CONFIRMATION_TEXT,'Deleting records in the background');
    await webActions.clickElement(AddPassDialogObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
  }

  async verifyError(message: string): Promise<void> {
    await webActions.verifyElementText(AddPassDialogObjects.TOAST_ERROR_TEXT, message);
    await webActions.clickElement(AddPassDialogObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
  }

  async verifyPassIsNotCreated(errorMessage: string): Promise<void> {
    await webActions.verifyElementText(AddPassDialogObjects.TOAST_ERROR_TEXT,errorMessage);
    this.discardChangesAndReturnToPassPage();
  }

  async discardChangesAndReturnToPassPage(): Promise<void> {
    await webActions.clickElement(AddPassDialogObjects.CLOSE_RETURN_BUTTON);
    await webActions.clickElement(AddPassDialogObjects.DISCARD_UNSAVED_CHANGES_BUTTON);
  }

  async verifyPlanIsNotCreatedError(errorMessage: string): Promise<void> {
    await webActions.verifyElementText(AddPassDialogObjects.TOAST_ERROR_TEXT,errorMessage);
  }

  async returnToPlanPage(): Promise<void> {
    await webActions.forceClickElement(AddPassDialogObjects.CLOSE_RETURN_BUTTON);
  }

  async navigateToPlans(): Promise<void> {
    await webActions.navigate('/billing/timePasses');
  }

  async setFinancialAccount(financialAccountname: string): Promise<void> {
    await webActions.clickElement(AddPassDialogObjects.FINANCIAL_ACCOUNTS_DROP_DOWN_MENU);
    await webActions.selectOptionFromDropdown(AddPassDialogObjects.FINANCIAL_ACCOUNTS_DROP_DOWN_MENU, financialAccountname);
  }

  async setTaxRate(taxRate: string): Promise<void> {
    await webActions.clickElement(AddPassDialogObjects.TAX_RATE_DROP_DOWN_MENU);
    await webActions.clickElement(AddPassDialogObjects.CLOSE_LIST_OF_OPTIONS);
    await webActions.clickElement(AddPassDialogObjects.TAX_RATE_DROP_DOWN_MENU);
    await webActions.selectOptionFromDropdown(AddPassDialogObjects.TAX_RATE_DROP_DOWN_MENU, taxRate);
  }
}
