import test from '@lib/BaseTest';
import userData from "./testdata/login/mp/user.json"

test.beforeEach(async ({ mpLoginPage }) => {
  await mpLoginPage.navigateTo(process.env.MP_TEST_LOGIN_PAGE_URL);
  await mpLoginPage.verifyAt();
});

test.describe('MP Registration', () => {  
  test.skip(`@11001 @smoke @mp.registrer - register new member`, async ({mpLoginPage, mpDashboardPage}) => {
    await mpLoginPage.loginAs(String(process.env.MP_TEST_USERNAME), String(process.env.MP_TEST_PASSWORD));
    await mpDashboardPage.verifyAt();
    await mpDashboardPage.verifyUserLoginStatus(userData.name);
  });

});
