import test from '@lib/BaseTest';
import userData from "./testdata/login/mp/user.json"

test.beforeEach(async ({ mpLoginPage }) => {
  await mpLoginPage.navigateTo(process.env.MP_TEST_LOGIN_PAGE_URL);
  await mpLoginPage.verifyAt();
});

test.describe('Member Portal Login', () => {
  
  test(`@10001 @smoke @mp.login - login to member portal`, async ({mpLoginPage, mpDashboardPage}) => {
    await mpLoginPage.login(String(process.env.MP_PASSWORD));
    await mpLoginPage.loginAs(String(process.env.MP_TEST_USERNAME), String(process.env.MP_TEST_PASSWORD));
    await mpDashboardPage.verifyAt();
    await mpDashboardPage.verifyUserLoginStatus(userData.name);
  });

});
