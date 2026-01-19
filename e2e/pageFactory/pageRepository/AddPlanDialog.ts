import { AddPlanDialogObjects } from '@objects/AddPlanDialogObjects';
import { WebActions } from '@lib/WebActions';
import { expect, type Page } from '@playwright/test';

let webActions: WebActions;

export class AddPlanDialog extends AddPlanDialogObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElements(AddPlanDialogObjects.PLAN_NAME_TEXT_FIELD,AddPlanDialogObjects.SAVE_CHANGES_BUTTON);
  }

  async addManualEntryPlan(): Promise<void> {
    await webActions.clickElement(AddPlanDialogObjects.MANUAL_ENTRY_BUTTON);
  }

  async addFullTimePlanWithName(planName: string, planMonthlyValue: string): Promise<void> {
    await webActions.clickElement(AddPlanDialogObjects.FULL_TIME_PLAN);
    await webActions.clearElementText(AddPlanDialogObjects.FTP_NAME_TEXT_FIELD);
    await webActions.enterElementText(AddPlanDialogObjects.FTP_NAME_TEXT_FIELD, planName);
    await webActions.clearElementText(AddPlanDialogObjects.FTP_MONTHLY_PRICE_TEXT_FIELD);
    await webActions.enterElementText(AddPlanDialogObjects.FTP_MONTHLY_PRICE_TEXT_FIELD, planMonthlyValue);
    await webActions.forceClickElement(AddPlanDialogObjects.ADD_PLAN_BUTTON);
  }

  async addYearlyPlanWithName(planName: string, planYearlyValue: string): Promise<void> {
    await webActions.clickElement(AddPlanDialogObjects.YEARLY_PLAN);
    await webActions.clearElementText(AddPlanDialogObjects.FT_NAME_TEXT_FIELD);
    await webActions.enterElementText(AddPlanDialogObjects.FT_NAME_TEXT_FIELD, planName);
    await webActions.clearElementText(AddPlanDialogObjects.FT_YEARLY_PRICE_TEXT_FIELD);
    await webActions.enterElementText(AddPlanDialogObjects.FT_YEARLY_PRICE_TEXT_FIELD, planYearlyValue);
    await webActions.forceClickElement(AddPlanDialogObjects.ADD_PLAN_BUTTON);
  }

  async addPartTimePlanWithName(planName: string): Promise<void> {
    await webActions.clickElement(AddPlanDialogObjects.FULL_TIME_PLAN);
    await webActions.clearElementText(AddPlanDialogObjects.FTP_NAME_TEXT_FIELD);
    await webActions.enterElementText(AddPlanDialogObjects.FTP_NAME_TEXT_FIELD,planName);
    await webActions.forceClickElement(AddPlanDialogObjects.ADD_PLAN_BUTTON);
  }

  async setName(name: string): Promise<void> {
    await webActions.clickElement(AddPlanDialogObjects.PLAN_NAME_TEXT_FIELD);
    await webActions.enterElementText(AddPlanDialogObjects.PLAN_NAME_TEXT_FIELD,name);
  }

  async setDescription(description: string): Promise<void> {
    await webActions.enterElementText(AddPlanDialogObjects.PLAN_DESCRIPTION_TEXT_AREA, description);
  }

  async setPlanPosition(index: string): Promise<void> {
    await webActions.enterElementText(AddPlanDialogObjects.PLAN_POSITION_TEXT_FIELD, index);
  }

  async setPlanLocation(text: string): Promise<void> {
    await webActions.enterElementText(AddPlanDialogObjects.PLAN_LOCATION_TEXT_FIELD, text);
  }

  async setFinancialAccount(account:string): Promise<void> {
    await webActions.clickElementByText('Financial account');
    await webActions.clickElementByRole('option', account);
  }

  async setTaxRate(taxRate: string): Promise<void> {
    await webActions.clickElement(AddPlanDialogObjects.TAX_RATE_DROP_DOWN_MENU);
    await webActions.clickElement(AddPlanDialogObjects.CLOSE_LIST_OF_OPTIONS);
    await webActions.clickElement(AddPlanDialogObjects.TAX_RATE_DROP_DOWN_MENU);
    await webActions.selectOptionFromDropdown(AddPlanDialogObjects.TAX_RATE_DROP_DOWN_MENU, taxRate);
  }

  async save(): Promise<void> {
    await webActions.clickElement(AddPlanDialogObjects.SAVE_CHANGES_BUTTON);
  }

  async waitUntilSave(): Promise<void> {
    await webActions.waitForPageElement(AddPlanDialogObjects.DISABLED_SAVE_BUTTON);
  }

  async returnToPlanPage(): Promise<void> {
    await webActions.clickElement(AddPlanDialogObjects.CLOSE_RETURN_BOTTOM_BUTTON);
  }

  async copyPlan(): Promise<void> {
    await webActions.clickElement(AddPlanDialogObjects.MORE_ACTIONS_BUTTON);
    await webActions.clickElement(AddPlanDialogObjects.COPY_PLAN_BUTTON);
    await webActions.clickElement(AddPlanDialogObjects.CONFIRMATION_BUTTON);
    await webActions.clickElement(AddPlanDialogObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
  }

  async delete(): Promise<void> {
    await webActions.clickElement(AddPlanDialogObjects.DELETE_BUTTON);
    await webActions.enterElementText(AddPlanDialogObjects.DELETE_TEXT_FIELD, "DELETE");
    await webActions.clickElement(AddPlanDialogObjects.CONFIRMATION_BUTTON);
    await webActions.verifyElementText(AddPlanDialogObjects.CONFIRMATION_TEXT,'Deleting records in the background');
  }

  async verifyError(message: string): Promise<void> {
    await webActions.verifyElementText(AddPlanDialogObjects.SAVE_ERROR,message);
    await webActions.clickElement(AddPlanDialogObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
  }

  async verifyPlanIsNotCreated(errorMessage: string): Promise<void> {
    await webActions.verifyElementText(AddPlanDialogObjects.TOAST_ERROR_TEXT,errorMessage);
    this.discardChangesAndReturnToPlanPage();
  }

  async verifyPlanError(message: string): Promise<void> {
    await webActions.verifyElementText(AddPlanDialogObjects.TOAST_ERROR_TEXT,message);
  }

  async discardChangesAndReturnToPlanPage(): Promise<void> {
    await webActions.clickElement(AddPlanDialogObjects.CLOSE_RETURN_BOTTOM_BUTTON);
    await webActions.clickElement(AddPlanDialogObjects.DISCARD_UNSAVED_CHANGES_BUTTON);
  }

  async verifyPlanName(expectedPlanName: string): Promise<void> {
    await webActions.waitForElement(AddPlanDialogObjects.PLAN_NAME_HEADER);
    await webActions.verifyElementText(AddPlanDialogObjects.PLAN_NAME_HEADER, expectedPlanName);
    await webActions.verifyElementAttribute(AddPlanDialogObjects.PLAN_NAME_TEXT_FIELD, 'value', expectedPlanName);
  }

  async verifyPlanLocation(expectedPlanLocation: string): Promise<void> {
        const planLocation = await webActions.getValueFromElementByRole('combobox', 'Available at');
        expect(planLocation).toBe(expectedPlanLocation);
  }

  async getPlanDescription(): Promise<string> {
    return await webActions.getTextFromElement(AddPlanDialogObjects.PLAN_DESCRIPTION_TEXT_AREA);
  }

  async verifyPosition(expectedPlanPosition: string): Promise<void> {
    await webActions.verifyElementAttribute(AddPlanDialogObjects.PLAN_POSITION_TEXT_FIELD,'value',expectedPlanPosition);
  }

  async accessPricingTab(): Promise<void> {
    await webActions.clickElement(AddPlanDialogObjects.PRICING_TAB);
  }

  async verifyCost(expectedPlanCost: string): Promise<void> {
    await webActions.waitForElement(AddPlanDialogObjects.PLAN_PRICE_TEXT_FIELD);
    await webActions.verifyElementAttribute(AddPlanDialogObjects.PLAN_PRICE_TEXT_FIELD,'value',expectedPlanCost);
  }

  async setPlanCost(planCost: string): Promise<void> {
    await webActions.clearElementText(AddPlanDialogObjects.PLAN_PRICE_TEXT_FIELD);
    await webActions.enterElementText(AddPlanDialogObjects.PLAN_PRICE_TEXT_FIELD,planCost);
    await webActions.clickElement(AddPlanDialogObjects.PRICING_TAB);
  }

  async verifyPricingTab(): Promise<void> {
    await webActions.verifyPageElements(AddPlanDialogObjects.PLAN_PRICE_TEXT_FIELD,AddPlanDialogObjects.MORE_ACTIONS_BUTTON);
  }
}
