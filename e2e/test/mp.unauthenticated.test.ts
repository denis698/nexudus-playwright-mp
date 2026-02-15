import test from '@lib/BaseTest';

test.describe('Navigation - Unauthenticated Access, Location password provided', () => {
  test.beforeEach(async ({ mpMarketingPage, mpCommonPage }) => {
    await mpMarketingPage.navigateTo(process.env.MP_TEST_MARKETING_PAGE_URL);
    await mpCommonPage.verifyProtectionPopup();
    await mpCommonPage.protectionPopupLocationLogin(String(process.env.MP_LOCATION_PASSWORD));
  });

  test(`@NPA_001 @smoke @mp.navigation - open base URL`, async ({ mpMarketingPage }) => {
    await mpMarketingPage.verifySignInButtonIsVisible();
  });

  test(`@NPA_002 @smoke @mp.navigation - open invoices page`, async ({
    mpInvoicesPage,
    mpLoginPage,
  }) => {
    await mpInvoicesPage.navigateTo();
    await mpLoginPage.verifyAt();
    await mpInvoicesPage.verifyNoInvoicesText();
  });
});

test.describe('Navigation - Unauthenticated Access, No location password provided', () => {
  test(`@NPA_101 @smoke @mp.navigation - open invoices page`, async ({
    mpInvoicesPage,
    mpCommonPage,
  }) => {
    await mpInvoicesPage.navigateTo();
    await mpCommonPage.verifyProtectionPopup();
    await mpInvoicesPage.verifyNoInvoicesText();
  });
});
