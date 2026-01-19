import { AddTeamDialogObjects } from '@objects/AddTeamDialogObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class AddTeamDialog extends AddTeamDialogObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifySetLocationByName(locationName: string) {
    await webActions.waitForPageElement(
      AddTeamDialogObjects.LOCATION_BY_DEFAULT.replace(
        'locationPlaceHolder',
        locationName
      )
    );
  }

  async setTeam(locationName: string, name: string, description: string) {
    await webActions.clickElement(AddTeamDialogObjects.LOCATION_DROPDOWN_MENU);
    await webActions.clickElement(
      AddTeamDialogObjects.LOCATION_MENU_OPTION.replace(
        'locationNamePlaceHolder',
        locationName
      )
    );
    await webActions.enterElementText(
      AddTeamDialogObjects.TEAM_NAME_INPUT,
      name
    );
    await webActions.enterElementText(
      AddTeamDialogObjects.DESCRIPTION_INPUT,
      description
    );
    await webActions.delay(1000); // TEMP CODE - the issue- the field "description" saves empty without delay
  }

  async save(): Promise<void> {
    await webActions.clickElement(AddTeamDialogObjects.SAVE_TEAM_BUTTON);
  }

  async setCompanyTeam(
    companyName: string,
    individualName: string,
    email: string
  ) {
    await webActions.enterElementText(
      AddTeamDialogObjects.STRUCTURE_COMPANY_NAME,
      companyName
    );
    await webActions.enterElementText(
      AddTeamDialogObjects.STRUCTURE_FULL_NAME,
      individualName
    );
    await webActions.enterElementText(
      AddTeamDialogObjects.STRUCTURE_EMAIL,
      email
    );
  }

  async saveCompany(): Promise<void> {
    await webActions.clickElement(AddTeamDialogObjects.STRUCTURE_SAVE_BUTTON);
    await webActions.verifyElementNotPresent(AddTeamDialogObjects.COMPANY_STRUCTURE_TITLE);
  }
}
