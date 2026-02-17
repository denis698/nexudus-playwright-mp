import test from '@lib/BaseTest';
import userData from "./testdata/login/mp/user.json"
import { expect } from '@playwright/test';

test.beforeEach(async ({ mpLoginPage, mpCommonPage }) => {
  await mpLoginPage.navigateTo(process.env.MP_TEST_LOGIN_PAGE_URL);
  await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
});

test.describe('Login', () => {
  test(`@SA_01a @smoke @mp.login - login`, async ({mpLoginPage, mpDashboardPage}) => {
    await mpLoginPage.loginAs(String(process.env.MP_TEST_USERNAME), String(process.env.MP_TEST_PASSWORD));
    await mpDashboardPage.verifyAt();
    const userLoginName = await mpDashboardPage.getUserLoginStatus(userData.user_name);
    expect(userLoginName).toContain(userData.user_name);
  });

    test(`@SA_01b @smoke @mp.login - failed login`, async ({mpLoginPage}) => {
    const expectedLoginError = 'Invalid email/password';  
    await mpLoginPage.enterEmail("invalid@nexudus.com");
    await mpLoginPage.enterPassword("INVALID");
    await mpLoginPage.clickOnLogin();
    const loginError = await mpLoginPage.getLoginError();
    expect(loginError).toContain(expectedLoginError);
  });

});
