import test from '@lib/BaseTest';
import { expect } from '@playwright/test';

test.beforeEach(async ({ mpLoginPage }) => {
  await mpLoginPage.navigateTo(process.env.MP_TEST_LOGIN_PAGE_URL);
  await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
  await mpLoginPage.verifyAt();
});

test.describe('MP Account', () => {  
  test(`@SA_05a @smoke @mp.account - create individual account`, async ({mpLoginPage, mpCreateAccountDialog, mpDashboardPage}) => {
    let randomTimeValue = new Date().toLocaleTimeString();
    randomTimeValue = randomTimeValue.replace("AM","").replace("PM","");
    const fullName = 'Denis ' + randomTimeValue;
    const email = 'denis+' + randomTimeValue + '@nexudus.com';

    await mpLoginPage.accessCreateAccountDialog();
    await mpCreateAccountDialog.verifyAt();
    await mpCreateAccountDialog.createAccount(fullName, email.split(':').join(''), 'Individual');
    await mpDashboardPage.verifyAt();
    const userLoginName = await mpDashboardPage.getUserLoginStatus(fullName + ' Individual');
    expect(userLoginName).toContain(fullName);
  });

  test.skip(`@SA_05b @smoke @mp.account - create a company account`, async ({mpLoginPage, mpCreateAccountDialog, mpDashboardPage}) => {
    const randomTimeValue = new Date().toLocaleTimeString();
    const fullName = 'Denis ' + randomTimeValue;
    const email = 'denis+' + randomTimeValue + '@nexudus.com';

    await mpLoginPage.accessCreateAccountDialog();
    await mpCreateAccountDialog.verifyAt();
    await mpCreateAccountDialog.createAccount(fullName, email.split(':').join(''), 'Company');
    await mpDashboardPage.verifyAt();
    const userLoginName = await mpDashboardPage.getUserLoginStatus(fullName + ' Company');
    expect(userLoginName).toContain(fullName);

  });

});
