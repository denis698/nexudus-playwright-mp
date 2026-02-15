import test from '@lib/BaseTest';
import userData from "./testdata/login/mp/user.json"

test.beforeEach(async ({ mpLoginPage, mpCommonPage }) => {
  await mpLoginPage.navigateTo(process.env.MP_TEST_LOGIN_PAGE_URL);
  await mpCommonPage.verifyProtectionPopup();
});

test.describe('Login', () => {
  test(`@10001 @smoke @mp.login - login`, async ({mpLoginPage, mpDashboardPage}) => {
    await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
    await mpLoginPage.loginAs(String(process.env.MP_TEST_USERNAME), String(process.env.MP_TEST_PASSWORD));
    await mpDashboardPage.verifyAt();
    await mpDashboardPage.verifyUserLoginStatus(userData.user_name);
  });

    test(`@10002 @smoke @mp.login - failed login`, async ({mpLoginPage}) => {
    await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
    await mpLoginPage.enterEmail("invalid@nexudus.com");
    await mpLoginPage.enterPassword("INVALID");
    await mpLoginPage.clickOnLogin();
    await mpLoginPage.verifyLoginError();
  });

});
