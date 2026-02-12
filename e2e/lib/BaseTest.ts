import { test as baseTest } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { DashboardPage } from '@pages/DashboardPage';
import { NavigationPanel } from '@pages/NavigationPanel';
import { InventoryPage } from '@pages/InventoryPage';
import { ProductPage } from '@pages/ProductPage';
import { AddProductDialog } from '@pages/AddProductDialog';
import { ResourcePage } from '@pages/ResourcePage';
import { AddResourceDialog } from '@pages/AddResourceDialog';
import { SettingsPage } from '@pages/SettingsPage';
import { SettingsInvoicesAndTaxPage } from '@pages/SettingsInvoicesAndTaxPage';
import { SettingsInvoicesAndTaxPageTaxTab } from '@pages/SettingsInvoicesAndTaxPageTaxTab';
import { SettingsInvoicesAndTaxPageAccountsTab } from '@pages/SettingsInvoicesAndTaxPageAccountsTab';
import { PlanPage } from '@pages/PlanPage';
import { AddPlanDialog } from '@pages/AddPlanDialog';
import { PassPage } from '@pages/PassPage';
import { AddPassDialog } from '@pages/AddPassDialog';
import { SettingsNotificationsPage } from '@pages/SettingsNotificationsPage';
import { SettingsEmailQueuePage } from '@pages/SettingsEmailQueuePage';
import { CustomerPage } from '@pages/CustomerPage';
import { AddCustomerDialog } from '@pages/AddCustomerDialog';
import { OperationsPage } from '@pages/OperationsPage';
import { AddTeamDialog } from '@pages/AddTeamDialog';
import { TeamPage } from '@pages/TeamPage';
import { ItemPage } from '@pages/ItemPage';
import { AddItemPage } from '@pages/AddItemPage';
import { TestDataUtil } from './TestDataUtil';
import { AddMultipleCustomersDialog } from '@pages/AddMultipleCustomersDialog';
import { FinancePage } from '@pages/FinancePage';
import { InvoicesPage } from '@pages/InvoicesPage';
import { AddInvoicePage } from '@pages/AddInvoicePage';
import { MPLoginPage } from '@pages/MPLoginPage';
import { MPMarketingPage } from '@pages/MPMarketingPage';
import { MPDashboardPage } from '@pages/MPDashboardPage';
import { ResourceTypePage } from '@pages/ResourceTypePage';
import { AddResourceTypePage } from '@pages/AddResourceTypePage';
import { TimeCreditsPage } from '@pages/TimeCreditsPage';
import { AddTimeCreditsPage } from '@pages/AddTimeCreditsPage';
import { MPBookingsMeetingRoomsPage } from '@pages/MPBookingsMeetingRoomsPage';


const test = baseTest.extend<{
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  navigationPanel: NavigationPanel;
  inventoryPage: InventoryPage;
  productPage: ProductPage;
  addProductDialog: AddProductDialog;
  resourcePage: ResourcePage;
  addResourceDialog: AddResourceDialog;
  settingsPage: SettingsPage;
  settingsInvoicesAndTaxPage: SettingsInvoicesAndTaxPage;
  settingsInvoicesAndTaxPageTaxTab: SettingsInvoicesAndTaxPageTaxTab;
  settingsInvoicesAndTaxPageAccountsTab: SettingsInvoicesAndTaxPageAccountsTab;
  planPage: PlanPage;
  addPlanDialog: AddPlanDialog;
  passPage: PassPage;
  addPassDialog: AddPassDialog;
  settingsNotificationsPage: SettingsNotificationsPage;
  settingsEmailQueuePage: SettingsEmailQueuePage;
  customerPage: CustomerPage;
  addCustomerDialog: AddCustomerDialog;
  operationsPage: OperationsPage;
  addTeamDialog: AddTeamDialog;
  teamPage: TeamPage;
  itemPage: ItemPage;
  addItemPage: AddItemPage;
  testDataUtil: TestDataUtil;
  addMultipleCustomersDialog: AddMultipleCustomersDialog;
  financePage: FinancePage;
  invoicesPage: InvoicesPage;
  addInvoicePage: AddInvoicePage;
  resourceTypePage: ResourceTypePage;
  addResourceTypePage: AddResourceTypePage;
  timeCreditsPage: TimeCreditsPage;
  addTimeCreditsPage: AddTimeCreditsPage;
  mpLoginPage: MPLoginPage;
  mpMarketingPage: MPMarketingPage;
  mpDashboardPage: MPDashboardPage;
  mPBookingsMeetingRoomsPage: MPBookingsMeetingRoomsPage;
  
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  navigationPanel: async ({ page }, use) => {
    await use(new NavigationPanel(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  addProductDialog: async ({ page }, use) => {
    await use(new AddProductDialog(page));
  },
  resourcePage: async ({ page }, use) => {
    await use(new ResourcePage(page));
  },
  addResourceDialog: async ({ page }, use) => {
    await use(new AddResourceDialog(page));
  },
  settingsPage: async ({ page }, use) => {
    await use(new SettingsPage(page));
  },
  settingsInvoicesAndTaxPage: async ({ page }, use) => {
    await use(new SettingsInvoicesAndTaxPage(page));
  },
  settingsInvoicesAndTaxPageTaxTab: async ({ page }, use) => {
    await use(new SettingsInvoicesAndTaxPageTaxTab(page));
  },
  settingsInvoicesAndTaxPageAccountsTab: async ({ page }, use) => {
    await use(new SettingsInvoicesAndTaxPageAccountsTab(page));
  },
  planPage: async ({ page }, use) => {
    await use(new PlanPage(page));
  },
  addPlanDialog: async ({ page }, use) => {
    await use(new AddPlanDialog(page));
  },
  passPage: async ({ page }, use) => {
    await use(new PassPage(page));
  },
  addPassDialog: async ({ page }, use) => {
    await use(new AddPassDialog(page));
  },
  settingsNotificationsPage: async ({ page }, use) => {
    await use(new SettingsNotificationsPage(page));
  },
  settingsEmailQueuePage: async ({ page }, use) => {
    await use(new SettingsEmailQueuePage(page));
  },
  customerPage: async ({ page }, use) => {
    await use(new CustomerPage(page));
  },
  addCustomerDialog: async ({ page }, use) => {
    await use(new AddCustomerDialog(page));
  },
  operationsPage: async ({ page }, use) => {
    await use(new OperationsPage(page));
  },
  addTeamDialog: async ({ page }, use) => {
    await use(new AddTeamDialog(page));
  },
  teamPage: async ({ page }, use) => {
    await use(new TeamPage(page));
  },
  itemPage: async ({ page }, use) => {
    await use(new ItemPage(page));
  },
  addItemPage: async ({ page }, use) => {
    await use(new AddItemPage(page));
  },
  testDataUtil: async ({}, use) => {
    await use(new TestDataUtil());
  },
  addMultipleCustomersDialog: async ({ page }, use) => {
    await use(new AddMultipleCustomersDialog(page));
  },
  financePage: async ({ page }, use) => {
    await use(new FinancePage(page));
  },
  invoicesPage: async ({ page }, use) => {
    await use(new InvoicesPage(page));
  },
  addInvoicePage: async ({ page }, use) => {
    await use(new AddInvoicePage(page));
  },
  resourceTypePage: async ({ page }, use) => {
    await use(new ResourceTypePage(page));
  },
  addResourceTypePage: async ({ page }, use) => {
    await use(new AddResourceTypePage(page));
  },
  mpLoginPage: async ({ page }, use) => {
    await use(new MPLoginPage(page));
  },
  mpMarketingPage: async ({ page }, use) => {
    await use(new MPMarketingPage(page));
  },
  mpDashboardPage: async ({ page }, use) => {
    await use(new MPDashboardPage(page));
  },
  timeCreditsPage: async ({ page }, use) => {
    await use(new TimeCreditsPage(page));
  },
  addTimeCreditsPage: async ({ page }, use) => {
    await use(new AddTimeCreditsPage(page));
  },
  mPBookingsMeetingRoomsPage: async ({ page }, use) => {
    await use(new MPBookingsMeetingRoomsPage(page));
  }
});

test.beforeEach(async ({}, testInfo) => {
  const timeStamp = new Date().toLocaleTimeString();
  if (testInfo.retry > 0) {
    console.log(`Retry N:${testInfo.retry}`);
  }
  test.info().annotations.push({
    type: 'task',
    description: testInfo.titlePath.toLocaleString() + ' - ' + timeStamp,
  });
});

test.afterEach(async ({ page }, testInfo) => {
  const storageState = 'monocart-results/storage/' + testInfo.title.slice(0, 5) + '_storageState.json';
  if (testInfo.status !== 'passed') {
    console.log(new Date().toLocaleTimeString() + ` - ${testInfo.title} - failed after ${testInfo.duration / 1000} sec`);
    console.log('# ' + testInfo.errors);
    // Save signed-in state to 'test_id_storageState.json'.
    await page.context().storageState({ path: storageState });
  }
});

export default test;
