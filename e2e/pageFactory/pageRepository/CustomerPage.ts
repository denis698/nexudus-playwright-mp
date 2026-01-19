import { CustomerPageObjects } from '@objects/CustomerPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';
import { Customer } from '@objects/AddCustomerDialogObjects';

let webActions: WebActions;

export class CustomerPage extends CustomerPageObjects {
  private readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(CustomerPageObjects.ADD_BUTTON);
    await webActions.verifyURL(CustomerPageObjects.URL);
  }

  async accessAddCustomerPage(): Promise<void> {
    await webActions.clickElement(CustomerPageObjects.ADD_BUTTON);
  }

  async accessManualEntryPage(): Promise<void> {
    await webActions.clickElement(CustomerPageObjects.MANUAL_ENTRY_BUTTON);
  }

  async accessCompanyPage(): Promise<void> {
    await webActions.clickElement(CustomerPageObjects.COMPANY_STRUCTURE_BUTTON);
  }

  async accessMultipleCustomersPage(): Promise<void> {
    await webActions.clickElement(CustomerPageObjects.MULTIPLE_CUSTOMERS_BUTTON);
  }

  async setCustomerFilter(viewType: string): Promise<void> {
    await webActions.clickElement(CustomerPageObjects.DROPDOWN_CUSTOMERS_TYPES);
    await webActions.clickElement(CustomerPageObjects.SHOW_ALL_TYPES_BUTTON.replace('viewType', viewType));
  }

    async searchByCustomerName(name: string): Promise<void> {
      await webActions.enterElementText(CustomerPageObjects.SEARCH_FILTER_INPUT_TEXT_FIELD, name);
      await webActions.clickElement(CustomerPageObjects.SEARCH_OPTION_BY_CUSTOMER_NAME.replace('customerNamePlaceHolder', name));
      await webActions.keyboardEnter('Escape'); // hide the dpordown list for better visual control
    }

  async setCustomerTypeFilterNew(type: Customer): Promise<void> {
    await webActions.clickElement(
      CustomerPageObjects.DROPDOWN_CUSTOMERS_TYPES_NEW
    );

    let locator: string;
    switch (type) {
      case Customer.Individual:
        locator = CustomerPageObjects.INDIVIDUAL_TYPE_BUTTON;
        break;
      case Customer.Company:
        locator = CustomerPageObjects.COMPANY_TYPE_BUTTON;
        break;
      default:
        throw new Error(`Unknown Customer type: ${type}`);
    }
    await webActions.clickElement(locator);
  }

  async searchByFullName(fullName: string): Promise<void> {
    await webActions.waitForPageElement(
      CustomerPageObjects.SEARCH_FILTER_INPUT_TEXT_FIELD
    );
    const cleanButton = this.page.locator(
      CustomerPageObjects.CLEAN_SEARCH_BUTTON
    );
    const count = await cleanButton.count();

    if (count == 1) {
      await webActions.clickElement(CustomerPageObjects.CLEAN_SEARCH_BUTTON);
    }

    await webActions.enterElementText(
      CustomerPageObjects.SEARCH_FILTER_INPUT_TEXT_FIELD,
      fullName
    );
    await webActions.clickElement(
      CustomerPageObjects.SEARCH_OPTION_BY_FULL_NAME.replace(
        'customerNamePlaceHolder',
        fullName
      )
    );

    await webActions.waitForPageElement(
      CustomerPageObjects.SEARCH_PROGRESS_BAR
    );
    await webActions.verifyElementNotPresent(
      CustomerPageObjects.SEARCH_PROGRESS_BAR
    );
    await webActions.keyboardEnter('Escape'); // hide the dropdown list for better visual control
  }

  async deleteCustomers(): Promise<void> {
      if (await webActions.getNumberOfElements(CustomerPageObjects.NO_CUSTOMERS_LABEL) == 0) {
        await webActions.waitForPageEnabledElement(CustomerPageObjects.ALL_CUSTOMERS_CHECKBOX);
        await webActions.clickElement(CustomerPageObjects.NUMBER_VISIBLE_ROWS_BUTTON);
        await webActions.clickElement(CustomerPageObjects.NUMBER_VISIBLE_ROWS_100);
        await webActions.clickElement(CustomerPageObjects.ALL_CUSTOMERS_CHECKBOX);
        await webActions.clickElement(CustomerPageObjects.BULK_ACTIONS_BUTTON.replace('Text','Bulk actions'));
        await webActions.clickElement(CustomerPageObjects.DELETE_CUSTOMERS_BUTTON_SIDE_MENU.replace('Text','Delete '));
        await webActions.enterElementText(CustomerPageObjects.DELETE_CUSTOMERS_TEXT_FIELD, 'DELETE CUSTOMER');
        await webActions.clickElementByFirstRole('button', 'Yes, do it');
        await webActions.clickElement(CustomerPageObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
      }
  }

    async verifyAllCustomersDeleted(): Promise<void> {
      await webActions.waitForElement(CustomerPageObjects.NO_CUSTOMERS_CANVAS);
    }

  async verifyIndividualPlanByName(planName: string): Promise<void> {
    await webActions.verifyPageElementByRole('link', planName);
  }

  async searchBySmartSearch(companyName: string): Promise<void> {
    await webActions.waitForPageElement(
      CustomerPageObjects.SEARCH_FILTER_INPUT_TEXT_FIELD
    );
    await webActions.enterElementText(
      CustomerPageObjects.SEARCH_FILTER_INPUT_TEXT_FIELD,
      companyName
    );
    await webActions.clickElement(
      CustomerPageObjects.SEARCH_OPTION_BY_SMART_SEARCH.replace(
        'customerCompanyNamePlaceHolder',
        companyName
      )
    );

    await webActions.waitForPageElement(CustomerPageObjects.SEARCH_PROGRESS_BAR);
    await webActions.verifyElementNotPresent(CustomerPageObjects.SEARCH_PROGRESS_BAR);
    await webActions.keyboardEnter('Escape'); // hide the dpordown list for better visual control
  }

  async verifyIndividualExists(
    individualName: string,
    companyName: string
  ): Promise<void> {
    const searchString = `${individualName} (${companyName})`;
    const locator = CustomerPageObjects.SEARCH_BY_TEXT.replace(
      'PlaceHolder',
      searchString
    );
    await webActions.verifyPageElement(locator);
  }

  async verifyCompanyExists(companyName: string,individualName: string): Promise<void> {
    const searchString = `${companyName} (${individualName})`;
    const locator = CustomerPageObjects.SEARCH_BY_TEXT.replace('PlaceHolder',searchString);
    await webActions.verifyPageElement(locator);
  }

  async verifyIndividualMembers(name: string): Promise<void> {
    const memberLocator = CustomerPageObjects.SEARCH_BY_TEXT.replace('PlaceHolder',name);
    await webActions.verifyPageElement(memberLocator);
  }

  async checkIndividualsExist(names: string[]): Promise<void> {
    for (const name of names) {
      await this.searchByFullName(name);
      await this.verifyIndividualMembers(name);
    }
  }
}
