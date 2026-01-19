import { InventoryPageObjects } from '@objects/InventoryPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class InventoryPage extends InventoryPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyThreePageElements(
      InventoryPageObjects.PRODUCTS_BUTTON,
      InventoryPageObjects.FLOOR_PLANS_BUTTON,
      InventoryPageObjects.RESOURCES_BUTTON
    );
    await webActions.verifyURL(InventoryPageObjects.INVENTORY_PAGE_URL);
  }

  async navigateToPlans(): Promise<void> {
    await webActions.navigate('/billing/tariffs');
  }

  async accessProducts(): Promise<void> {
    await webActions.clickElementByFirstRole('link', 'Products');
  }

  async accessPlans(): Promise<void> {
    await webActions.clickElementByFirstRole('link', 'Plans');
  }

  async accessPasses(): Promise<void> {
    await webActions.clickElementByFirstRole('link', 'Passes');
  }


  async accessResources(): Promise<void> {
    await webActions.clickElementByFirstRole('link', 'Resources');
  }

  async accessFloorPlanItems(): Promise<void> {
    await webActions.clickElementByFirstRole('link', 'Floor plan items');
  }

  async accessResourceTypes(): Promise<void> {
    await webActions.clickElementByRole('button', 'Resource types');
  }

  async accessTimeCredits(): Promise<void> {
    await webActions.clickElementByRole('button', 'Time credits');
  }

  async accessPrintingCreits(): Promise<void> {
    await webActions.clickElementByRole('button', 'Printing credits');
  }

  async accessPrices(): Promise<void> {
    await webActions.clickElementByRole('button', 'Prices');
  }
}
