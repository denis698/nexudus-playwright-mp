import test from '@lib/BaseTest';

test.beforeEach(async ({ mpMarketingPage, mpLoginPage }) => {
  await mpMarketingPage.navigateTo(process.env.MP_TEST_MARKETING_PAGE_URL);
  await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
});

test.describe('Navigation - ', () => {
  test(`@NPA_001 @smoke @mp.nav - open base URL`, async ({ mpMarketingPage }) => {
    await mpMarketingPage.verifyAt();
  });
  
});