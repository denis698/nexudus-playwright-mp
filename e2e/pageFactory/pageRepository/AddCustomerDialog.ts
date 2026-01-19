import {
  AddCustomerDialogObjects,
  Customer,
} from '@objects/AddCustomerDialogObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class AddCustomerDialog extends AddCustomerDialogObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async addManualEntryCustomer(): Promise<void> {
    await webActions.clickElement(AddCustomerDialogObjects.MANUAL_ENTRY_BUTTON);
  }

  async navigateToOperations(): Promise<void> {
    await webActions.navigate('/operations/coworkers');
  }

  async setManualEntryCustomer(type: Customer,fullName: string,email: string,companyName: string) { 
    await webActions.setOptionForSelectByLabel(AddCustomerDialogObjects.COWORKER_TYPE, type);
    if (type == Customer.Company) {
      await webActions.waitForPageElement(AddCustomerDialogObjects.PRIMARY_CONTACT_LABEL);
    }
    await webActions.enterElementText(AddCustomerDialogObjects.FULL_NAME,fullName);
    await webActions.enterElementText(AddCustomerDialogObjects.EMAIL,email);
    await webActions.enterElementText(AddCustomerDialogObjects.COMPANY_NAME,companyName);
  }

  async setCompanyStructure(companyName: string,fullName: string,email: string) {
    await webActions.enterElementText(AddCustomerDialogObjects.STRUCTURE_COMPANY_NAME,companyName);
    await webActions.enterElementText(AddCustomerDialogObjects.STRUCTURE_FULL_NAME,fullName);
    await webActions.enterElementText(AddCustomerDialogObjects.STRUCTURE_EMAIL,email);
  }

  // Create Multiple Customers without a Team and without a Plan
  async setEmails(emails: string): Promise<void> {
    await webActions.enterElementText(AddCustomerDialogObjects.EMAILS_TEXT_FIELD,emails);
  }

  // Create a new team before fill in "full names and emails"
  async setTeam(teamName: string): Promise<void> {
    await webActions.typeElementTextByNth(AddCustomerDialogObjects.TEAM_TEXT_FIELD,0,teamName);
    await webActions.clickElement(AddCustomerDialogObjects.TEAM_DROP_DOWN_MENU);
    await webActions.waitUntilElementNotPresent(AddCustomerDialogObjects.CONFIRM_TITLE,30000);
  }

  // Select an existing team, fill in "full names and emails"
  async setExistingTeamAndEmails(teamName: string,emails: string): Promise<void> {
    await webActions.typeElementTextByNth(AddCustomerDialogObjects.TEAM_TEXT_FIELD,0,teamName);
    await webActions.clickElement(AddCustomerDialogObjects.TEAM_NAME_MARK.replace('Placeholder', teamName));
    await this.setEmails(emails);
  }

  async delayInTest(time: number): Promise<void> {
    await webActions.delay(time);
  }

  async save(): Promise<void> {
    await webActions.clickElement(
      AddCustomerDialogObjects.SAVE_CUSTOMER_BUTTON
    );
    await webActions.waitForPageElement(
      AddCustomerDialogObjects.SAVE_CUSTOMER_DISABLE_BUTTON
    );
    await webActions.waitForPageElement(
      AddCustomerDialogObjects.MORE_DETAILS_BUTTON
    );
    await webActions.waitForPageElement(
      AddCustomerDialogObjects.JOINED_AS_A_CUSTOMER_LABEL
    );
  }

  // Select a Plan, fill in "full names and emails"
  async setPlan(planName: string, emails: string): Promise<void> {
    await webActions.typeElementTextByNth(AddCustomerDialogObjects.TEAM_TEXT_FIELD,1,planName);
    await webActions.clickElement(AddCustomerDialogObjects.TEAM_NAME_MARK.replace('Placeholder', planName));
    await this.setEmails(emails);
  }

  async saveCustomer(): Promise<void> {
    await webActions.clickElement(AddCustomerDialogObjects.SAVE_BUTTON);
    await webActions.verifyElementNotPresent(AddCustomerDialogObjects.TITLE);
  }

  async closeCustomerAndReturntoContactsPage(): Promise<void> {
    await webActions.clickElement(AddCustomerDialogObjects.CLOSE_CUSTOMER_BUTTON);
  }
}
