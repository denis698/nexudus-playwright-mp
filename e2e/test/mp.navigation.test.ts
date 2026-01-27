import test from '@lib/BaseTest';
import menuData from "./testdata/mp/navigation/profile_menu.json";

test.beforeEach(async ({ mpLoginPage,mpDashboardPage }) => {
  await mpLoginPage.navigateTo(process.env.MP_TEST_LOGIN_PAGE_URL);
  await mpLoginPage.verifyAt();
  await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
});

test.describe('Navigation->User Profile Menu', () => {
  test(`@NPA_002 @smoke @mp.navigation - admin should be able to access Profile Menu->Page editor->Admin`, async ({mpLoginPage,mpDashboardPage}) => {
    await mpLoginPage.loginAs(String(process.env.MP_TEST_ADMIN_USERNAME), String(process.env.MP_TEST_ADMIN_PASSWORD));
    await mpDashboardPage.verifyAt();
    await mpDashboardPage.verifyProfileMenu(menuData.dashboard_admin_menu);
  });

  test(`@NPA_002 @smoke @mp.navigation - admin should be able to access Profile Menu->Switch account`, async ({mpLoginPage,mpDashboardPage}) => {
    await mpLoginPage.loginAs(String(process.env.MP_TEST_ADMIN_USERNAME), String(process.env.MP_TEST_ADMIN_PASSWORD));
    await mpDashboardPage.verifyAt();
    await mpDashboardPage.verifyProfileMenu(menuData.dashboard_admin_menu);
  });

  test(`@NPA_002 @smoke @mp.navigation - user should be able to access Profile Menu`, async ({mpLoginPage,mpDashboardPage}) => {
    await mpLoginPage.loginAs(String(process.env.MP_TEST_USERNAME), String(process.env.MP_TEST_PASSWORD));
    await mpDashboardPage.verifyAt();
    await mpDashboardPage.verifyProfileMenu(menuData.dashboard_menu);
  });

});
