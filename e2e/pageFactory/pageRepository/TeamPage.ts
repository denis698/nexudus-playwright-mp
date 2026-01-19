import { TeamPageObjects } from '@objects/TeamPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class TeamPage extends TeamPageObjects {
  private readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(TeamPageObjects.ADD_TEAMS_BUTTON);
    await webActions.verifyURL(TeamPageObjects.URL_TEAMS);
  }

  async accessAddTeamPage(): Promise<void> {
    await webActions.clickElement(TeamPageObjects.ADD_TEAMS_BUTTON);
  }

  async accessManualEntryPage(): Promise<void> {
    await webActions.clickElement(TeamPageObjects.MANUAL_ENTRY_BUTTON);
  }

  async setTeamFilter(viewFilter: string): Promise<void> {
    await webActions.clickElement(TeamPageObjects.DROPDOWN_TEAMS_TYPES);
    await webActions.clickElement(TeamPageObjects.SHOW_ALL_TYPES_BUTTON);
  }

  async searchByTeamName(teamName: string): Promise<void> {
    await webActions.enterElementText(TeamPageObjects.SEARCH_FILTER_INPUT_TEXT_FIELD,teamName);
    await webActions.clickElement(TeamPageObjects.SEARCH_OPTION_BY_TEAM_NAME.replace('teamNamePlaceHolder',teamName));
    await webActions.keyboardEnter('Escape'); // hide the dpordown list for better visual control
  }

  async deleteTeams(): Promise<void> {
      if (await webActions.getNumberOfElements(TeamPageObjects.NO_TEAMS_LABEL) == 0) {
        await webActions.waitForPageEnabledElement(TeamPageObjects.ALL_TEAMS_CHECKBOX);
        await webActions.clickElement(TeamPageObjects.ALL_TEAMS_CHECKBOX);
        await webActions.clickElement(TeamPageObjects.BULK_ACTIONS_BUTTON.replace('Text','Bulk actions'));
        await webActions.clickElement(TeamPageObjects.DELETE_TEAMS_BUTTON_SIDE_MENU.replace('Text','Delete '));
        await webActions.enterElementText(TeamPageObjects.DELETE_TEAMS_TEXT_FIELD, 'DELETE');
        await webActions.clickElementByFirstRole('button', 'Yes, do it');
        await webActions.waitForElement('text="Delete completed"');
        await webActions.clickElement(TeamPageObjects.CLOSE_NOTIFICATION_TOAST_BUTTON);
      }
  }
  
  async verifyTeamExists(teamName: string): Promise<void> {
    const locator = TeamPageObjects.SEARCH_STRONG_EXACT_MATCH.replace('PlaceHolder',teamName);
    await webActions.verifyPageElement(locator);
  }

  async accessCompanyPage(): Promise<void> {
    await webActions.clickElement(TeamPageObjects.COMPANY_STRUCTURE_BOTTON);
  }

  async accessMultipleCustomersPage(): Promise<void> {
    await webActions.clickElement(TeamPageObjects.MULTIPLE_CUSTOMERS_BOTTON);
  }

  async verifyMembers(teamName: string, individualName: string): Promise<void> {
    await webActions.clickElement(
      TeamPageObjects.TEAM_NAME_A.replace('teamNamePlaceHolder', teamName)
    );
    await webActions.clickElement(TeamPageObjects.TEAM_MEMBERS_BUTTON);

    const companySearchString = `${teamName} (${individualName})`;
    const companyLocator = TeamPageObjects.SEARCH_BY_TEXT.replace(
      'PlaceHolder',
      companySearchString
    );
    await webActions.verifyPageElement(companyLocator);

    const individualSearchString = `${individualName} (${teamName})`;
    const individualLocator = TeamPageObjects.SEARCH_BY_TEXT.replace(
      'PlaceHolder',
      individualSearchString
    );
    await webActions.verifyPageElement(individualLocator);
  }

  async verifyIndividualMembers(name: string,individualNames: string[]): Promise<void> {
    await webActions.clickElement(TeamPageObjects.TEAM_NAME_A.replace('teamNamePlaceHolder',name));
    await webActions.clickElement(TeamPageObjects.TEAM_MEMBERS_BUTTON);

    for (let individualName of individualNames) {
      const memberLocator = TeamPageObjects.SEARCH_BY_TEXT.replace('PlaceHolder',individualName);
      await webActions.verifyPageElement(memberLocator);
    }
  }

  async verifyAllTeamsDeleted(): Promise<void> {
    await webActions.verifyElementNotPresent(TeamPageObjects.DELETE_TEAMS_BUTTON_SIDE_MENU.replace('Text', 'Delete '));
    await webActions.waitForElement(TeamPageObjects.NO_TEAMS_CANVAS);
  }

  async delayInTest(time: number): Promise<void> {
    await webActions.delay(time);
  }
  
}
