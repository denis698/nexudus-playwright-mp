import test from '@lib/BaseTest';
import menuData from './testdata/mp/navigation/profile_menu.json';
import { expect } from '@playwright/test';

test.beforeEach(async ({ mpLoginPage, mpCommonPage }) => {
  await mpLoginPage.navigateTo(process.env.MP_TEST_LOGIN_PAGE_URL);
  await mpCommonPage.verifyProtectionPopup();
  await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
  await mpLoginPage.verifyAt();
});

test.describe('Navigation->User Profile Menu', () => {
  test(`@NPA_002a @smoke @mp.navigation - admin should be able to access Profile Menu->Page editor->Admin->Switch account`, async ({mpLoginPage,mpDashboardPage}) => {
    await mpLoginPage.loginAs(String(process.env.MP_TEST_ADMIN_USERNAME), String(process.env.MP_TEST_ADMIN_PASSWORD));
    await mpDashboardPage.verifyAt();
    const menuOptions = await mpDashboardPage.getProfileMenu();
    expect(menuOptions).toContain("Admin");
    expect(menuOptions).toContain("Page Editor");
    expect(menuOptions).toContain("Switch account");
  });

  test(`@NPA_002b @smoke @mp.navigation - user should be able to access Profile Menu`, async ({mpLoginPage,mpDashboardPage}) => {
    await mpLoginPage.loginAs(String(process.env.MP_TEST_USERNAME), String(process.env.MP_TEST_PASSWORD));
    await mpDashboardPage.verifyAt();
    const menuOptions = await mpDashboardPage.getProfileMenu();
    expect(menuOptions).toContain(menuData.dashboard_menu);
    expect(menuOptions).not.toContain("Switch account");
    expect(menuOptions).not.toContain("Page Editor");
    expect(menuOptions).not.toContain("Switch account");
  });

});
