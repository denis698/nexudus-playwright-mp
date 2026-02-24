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
  test.skip(`@NPA_002a @smoke @mp.nav - admin access user_profile_menu->page_editor->admin->switch_account`, async ({mpLoginPage,mpDashboardPage}) => {
    await mpLoginPage.loginAs(String(process.env.MP_TEST_ADMIN_USERNAME), String(process.env.MP_TEST_ADMIN_PASSWORD));
    await mpDashboardPage.verifyAt();
    const menuOptions = await mpDashboardPage.getProfileMenu();
    expect(menuOptions).toContain("Admin");
    expect(menuOptions).toContain("Page Editor");
    expect(menuOptions).toContain("Switch account");
  });

  test(`@NPA_002 @smoke @mp.nav - access user_profile_menu`, async ({mpDashboardPage}) => {
    const menuOptions = await mpDashboardPage.getProfileMenu();
    expect(menuOptions).toContain(menuData.dashboard_menu);
    expect(menuOptions).not.toContain("Switch account");
    expect(menuOptions).not.toContain("Page Editor");
    expect(menuOptions).not.toContain("Switch account");
  });

  test(`@NPA_003 & @NPA_012 @smoke @mp.nav - access user_profile_menu`, async ({
    mpDashboardPage,
    mpMarketingPage,
    mpInvoicesPage}) => {
    await mpDashboardPage.accessMarketing();
    await mpMarketingPage.verifyAt();
    await mpMarketingPage.accessDashboard();
    await mpDashboardPage.verifyAt();
    await mpDashboardPage.accessInvoices();
    await mpInvoicesPage.verifyAt();
  });

});
