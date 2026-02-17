import test from '@lib/BaseTest';
import { expect } from '@playwright/test';

test.beforeEach(async ({ mpLoginPage }) => {
  await mpLoginPage.navigateTo(process.env.MP_TEST_LOGIN_PAGE_URL);
  await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
  await mpLoginPage.verifyAt();
});

test.describe('MP Account', () => {  
  test(`@SA_05 @smoke @mp.account - create an account`, async ({mpLoginPage, mpCreateAccountDialog, mpDashboardPage}) => {
    const randomTimeValue = new Date().toLocaleTimeString();
    const fullName = 'Denis ' + randomTimeValue;
    const email = 'denis+' + randomTimeValue + '@nexudus.com';

    await mpLoginPage.accessCreateAccountDialog();
    await mpCreateAccountDialog.verifyAt();
    await mpCreateAccountDialog.createAccount(fullName,email.split(':').join(''));
    await mpDashboardPage.verifyAt();
    const userLoginName = await mpDashboardPage.getUserLoginStatus(fullName);
    expect(userLoginName).toContain(fullName);

  });

});
