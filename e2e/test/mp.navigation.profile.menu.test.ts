import test from '@lib/BaseTest';
import menuData from "./testdata/mp/navigation/profile_menu.json";

test.beforeEach(async ({ mpLoginPage,mpDashboardPage }) => {
  await mpLoginPage.navigateTo(process.env.MP_TEST_LOGIN_PAGE_URL);
  await mpLoginPage.verifyAt();
  await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
  await mpLoginPage.loginAs(String(process.env.MP_TEST_USERNAME), String(process.env.MP_TEST_PASSWORD));
  await mpDashboardPage.verifyAt();
});

test.describe('Navigation->User Profile Menu', () => {
  test(`@15002 @smoke @mp.navigation - should be able to access profile penu`, async ({mpDashboardPage}) => {
    await mpDashboardPage.verifyProfileMenu(menuData.dashboard_menu);
  });

});
