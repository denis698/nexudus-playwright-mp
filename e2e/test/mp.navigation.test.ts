import test from '@lib/BaseTest';
import menuData from './testdata/mp/navigation/profile_menu.json';
import { expect } from '@playwright/test';

test.beforeEach(async ({ mpLoginPage,mpDashboardPage }) => {
  await mpLoginPage.navigateTo(process.env.MP_TEST_LOGIN_PAGE_URL);
  await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
  await mpLoginPage.loginAs(String(process.env.MP_TEST_USERNAME), String(process.env.MP_TEST_PASSWORD));
  await mpDashboardPage.verifyAt();
});

test.describe('Navigation->User Profile Menu', () => {
  test.skip(`@NPA_002a @smoke @mp.nav - admin access user profile menu->page editor->admin->switch account`, async ({
    mpLoginPage,
    mpDashboardPage}) => {
    await mpLoginPage.loginAs(String(process.env.MP_TEST_ADMIN_USERNAME), String(process.env.MP_TEST_ADMIN_PASSWORD));
    await mpDashboardPage.verifyAt();
    const menuOptions = await mpDashboardPage.getProfileMenu();
    expect(menuOptions).toContain("Admin");
    expect(menuOptions).toContain("Page Editor");
    expect(menuOptions).toContain("Switch account");
  });

  test(`@NPA_002 @smoke @mp.nav - access user profile menu options`, async ({
    mpDashboardPage}) => {
    const menuOptions = await mpDashboardPage.getProfileMenu();
    expect(menuOptions).toContain(menuData.dashboard_menu);
    expect(menuOptions).not.toContain("Switch account");
    expect(menuOptions).not.toContain("Page Editor");
    expect(menuOptions).not.toContain("Switch account");
  });

  test(`@NPA_003 & @NPA_012 @smoke @mp.nav - select user profile menu options`, async ({
    mpDashboardPage,
    mpMarketingPage,
    mpInvoicesPage,
    mpBookingsPage,
    mpMyPlansPage, }) => {
    
    //NPA_03
    await mpDashboardPage.accessMarketing();
    await mpMarketingPage.verifyAt();
    await mpMarketingPage.accessDashboard();
    await mpDashboardPage.verifyAt();
    
    //NPA_04
    await mpDashboardPage.accessInvoices();
    await mpInvoicesPage.verifyAt();
    await mpInvoicesPage.accessDashboard();
    await mpDashboardPage.verifyAt();

    //NPA_05
    await mpDashboardPage.accessBookings();
    await mpBookingsPage.verifyAt();
    await mpBookingsPage.accessDashboard();
    await mpDashboardPage.verifyAt();

    //NPA_06
    await mpDashboardPage.accessMyPlans();
    await mpMyPlansPage.verifyAt();
    await mpMyPlansPage.accessDashboard();
    await mpDashboardPage.verifyAt();

    // 🔴NPA_012: Should be able to access User Profile Menu->Sign out  
    // 🔴NPA_011: Should be able to access User Profile Menu->Settings  
    // 🔴NPA_010: Should be able to access User Profile Menu->Account  
    // 🔴NPA_009: Should be able to access User Profile Menu->Building  
    // 🔴NPA_008: Should be able to access User Profile Menu->My activity  
    // 🔴NPA_007: Should be able to access User Profile Menu->Help & support  
    
  });

});
