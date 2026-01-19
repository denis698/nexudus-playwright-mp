import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';
import { NavigationPanelObjects } from '@objects/NavigationPanelObjects';

let webActions: WebActions;

export class NavigationPanel extends NavigationPanelObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(NavigationPanelObjects.INVENTORY_BUTTON);
  }

  async accessFinance(): Promise<void> {
    await webActions.clickElementByFirstRole('link', 'Finance');
  }

  async accessInventory(): Promise<void> {
    await webActions.clickElement(NavigationPanelObjects.INVENTORY_BUTTON);
  }

  async accessOperations(): Promise<void> {
    await webActions.clickElement(NavigationPanelObjects.OPERATIONS_BUTTON);
  }

  async accessSettings(): Promise<void> {
    await webActions.clickElement(NavigationPanelObjects.SETTINGS_BUTTON);
  }

  async accessDashboard(): Promise<void> {
    await webActions.clickElement(NavigationPanelObjects.DASHBOARD_BUTTON);
  }

  async accessLocationWithName(locationName: string): Promise<void> {
    await webActions.clickElement(NavigationPanelObjects.LOCATION_MENU);
    await webActions.clickElement(NavigationPanelObjects.LOCATION_NAME.replace(`locationName`, locationName)
    );
  }

  async viewDataForAllSelectedLocations(): Promise<void> {
    await webActions.clickElement(NavigationPanelObjects.LOCATION_MENU);
    await webActions.clickElement(NavigationPanelObjects.SHOW_DATA_FOR_ALL_LOCATIONS_BUTTON);
  }

  async accessAI(): Promise<void> {
    await webActions.clickElement(NavigationPanelObjects.AI_BUTTON);
  }
}
