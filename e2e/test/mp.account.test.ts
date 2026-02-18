import test from '@lib/BaseTest';
import { expect } from '@playwright/test';

test.beforeEach(async ({ mpLoginPage }) => {
  await mpLoginPage.navigateTo(process.env.MP_TEST_LOGIN_PAGE_URL);
  await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
  await mpLoginPage.verifyAt();
});

test.describe('MP Account', () => {  
  test(`@SA_05a @smoke @mp.account - individual account`, async ({mpLoginPage, mpCreateAccountDialog, mpDashboardPage}) => {
    //Will always create a number of 6 digits and it ensures the first digit will never be 0.
    const randomValue = Math.floor(100000 + Math.random() * 900000);
    const fullName = 'Denis ' + randomValue;
    const email = 'denis+' + randomValue + '@nexudus.com';

    await mpLoginPage.accessCreateAccountDialog();
    await mpCreateAccountDialog.verifyAt();
    await mpCreateAccountDialog.createAccount(fullName, email, 'Individual');
    await mpDashboardPage.verifyAt();
    const userLoginName = await mpDashboardPage.getUserLoginStatus(fullName + ' Individual');
    expect(userLoginName).toContain(fullName);
  });

  test(`@SA_05b @smoke @mp.account - company account`, async ({mpLoginPage, mpCreateAccountDialog, mpDashboardPage}) => {
    //Will always create a number of 6 digits and it ensures the first digit will never be 0.
    const randomValue = Math.floor(100000 + Math.random() * 900000);
    const fullName = 'Denis ' + randomValue;
    const email = 'denis+' + randomValue + '@nexudus.com';

    await mpLoginPage.accessCreateAccountDialog();
    await mpCreateAccountDialog.verifyAt();
    await mpCreateAccountDialog.createAccount(fullName, email, 'Company');
    await mpDashboardPage.verifyAt();
    const userFullName = await mpDashboardPage.getUserLoginStatus(fullName + ' Company');
    expect(userFullName).toContain(fullName);

  });

});
