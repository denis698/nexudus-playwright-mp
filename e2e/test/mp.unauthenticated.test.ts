import test from '@lib/BaseTest';

test.beforeEach(async ({ mpMarketingPage, mpLoginPage }) => {
  // Given the user is not logged in
  // When the user navigates to the MP Marketing website
  await mpMarketingPage.navigateTo(process.env.MP_TEST_MARKETING_PAGE_URL);
  await mpMarketingPage.verifyAt(process.env.MP_TEST_LOCATION_PAGE_URL);

  // And the user entered the MP_LOCATION_PASSWORD
  await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
});

test.describe('Navigation', () => {
  test(`@NPA_001 @smoke @mp.navigation - user should see Login button when unauthenticated`, async ({
    mpMarketingPage,
  }) => {
    // Then the Sign in button should be visible after the page is loaded
    await mpMarketingPage.verifySignInButtonIsVisible();
  });
});
