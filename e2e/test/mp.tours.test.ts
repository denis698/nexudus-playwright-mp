import test from '@lib/BaseTest';
import userData from "./testdata/login/mp/user.json"

test.beforeEach(async ({ mpLoginPage }) => {
  await mpLoginPage.navigateTo(process.env.MP_TEST_LOGIN_PAGE_URL);
  await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
  await mpLoginPage.verifyAt();
});

test.describe('MP Tours', () => {
  test.skip(`@120001 @smoke @mp.tour - book a tour`, async ({mpLoginPage, mpDashboardPage}) => {
    await mpDashboardPage.verifyAt();
  });

});
