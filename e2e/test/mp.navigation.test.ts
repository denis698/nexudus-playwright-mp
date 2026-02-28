import test from '@lib/BaseTest';
import menuData from './testdata/mp/navigation/profile_menu.json';
import { expect } from '@playwright/test';

test.beforeEach(async ({ mpLoginPage }) => {
  await mpLoginPage.navigateTo(process.env.MP_TEST_LOGIN_PAGE_URL);
  await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
});

test.describe('navigation->user-profile-menu', () => {
  test(`@NPA_01 @smoke @mp.nav - access member portal`, async ({ mpMarketingPage }) => {
    await mpMarketingPage.navigateTo(process.env.MP_TEST_MARKETING_PAGE_URL);
    await mpMarketingPage.verifyAt();
    await mpMarketingPage.isElementVisibleWithName('Sign in');
  });
  
  test(`@NPA_02 @smoke @mp.nav - admin access user-profile-menu->page editor->admin->switch account`, async ({
    mpLoginPage,
    mpDashboardPage}) => {
    await mpLoginPage.loginAs(String(process.env.MP_TEST_ADMIN_USERNAME), String(process.env.MP_TEST_ADMIN_PASSWORD));
    await mpDashboardPage.verifyAt();
    const menuOptions = await mpDashboardPage.getProfileMenu();
    expect(menuOptions).toContain("Admin");
    expect(menuOptions).toContain("Page Editor");
    expect(menuOptions).toContain("Switch account");
  });

  test(`@NPA_02 @smoke @mp.nav - access user-profile-menu options`, async ({
    mpDashboardPage,
    mpLoginPage}) => {
    await mpLoginPage.loginAs(String(process.env.MP_TEST_USERNAME), String(process.env.MP_TEST_PASSWORD));
    await mpDashboardPage.verifyAt();
    const menuOptions = await mpDashboardPage.getProfileMenu();
    expect(menuOptions).toContain(menuData.dashboard_menu);
    expect(menuOptions).not.toContain("Switch account");
    expect(menuOptions).not.toContain("Page Editor");
    expect(menuOptions).not.toContain("Switch account");
  });

  test(`@NPA_03 to 11 @smoke @mp.nav - access user-profile-menu options`, async ({
    mpHeader,
    mpLoginPage,
    mpDashboardPage,
    mpMarketingPage,
    mpInvoicesPage,
    mpBookingsPage,
    mpMyPlansPage,
    mpHelpSupportPage,
    mpBuildingPage,
    mpAccountPage,
    mpSettingsPage, }) => {
    
    await mpLoginPage.loginAs(String(process.env.MP_TEST_USERNAME), String(process.env.MP_TEST_PASSWORD));
    await mpDashboardPage.verifyAt();  
    
    //NPA_03
    await mpHeader.accessMarketing();
    await mpMarketingPage.verifyAt();

    await mpHeader.accessDashboard();
    await mpDashboardPage.verifyAt();
    
    //NPA_04
    await mpHeader.accessInvoices();
    await mpInvoicesPage.verifyAt();

    await mpHeader.accessDashboard();
    await mpDashboardPage.verifyAt();

    //NPA_05
    await mpHeader.accessBookings();
    await mpBookingsPage.verifyAt();

    await mpHeader.accessDashboard();
    await mpDashboardPage.verifyAt();

    //NPA_06
    await mpHeader.accessMyPlans();
    await mpMyPlansPage.verifyAt();

    await mpHeader.accessDashboard();
    await mpDashboardPage.verifyAt();

    //NPA_07 
    await mpHeader.accessFAQs();
    await mpHelpSupportPage.verifyAtFAQs();
    await mpHelpSupportPage.accessHelpDesk();
    await mpHelpSupportPage.verifyAtHelp();

    await mpHeader.accessDashboard();
    await mpDashboardPage.verifyAt();

    //NPA_08  
    await mpHeader.accessInvoices();
    await mpInvoicesPage.verifyAt();

    await mpInvoicesPage.accessBookings();
    await mpInvoicesPage.verifyAtBook();

    await mpInvoicesPage.accessVisitors();
    await mpInvoicesPage.verifyAtVis();

    await mpInvoicesPage.accessDeliveries();
    await mpInvoicesPage.verifyAtDel();

    await mpInvoicesPage.accessEvents();
    await mpInvoicesPage.verifyAtEve();

    await mpInvoicesPage.accessCourses();
    await mpInvoicesPage.verifyAtCou();

    await mpHeader.accessDashboard();
    await mpDashboardPage.verifyAt();

    //NPA_09
    await mpHeader.accessBuilding();
    await mpBuildingPage.verifyAtAva();
    await mpBuildingPage.accessEnvironment();
    await mpBuildingPage.verifyAtEnv();

    await mpHeader.accessDashboard();
    await mpDashboardPage.verifyAt();

    //NPA_10
    await mpHeader.accessAccount();
    await mpAccountPage.verifyAtAcc();
    
    await mpAccountPage.accessBillingDetails();
    await mpAccountPage.verifyAtBdt();

    await mpAccountPage.accessPlanBenefits();
    await mpAccountPage.verifyAtPbn();

    await mpAccountPage.accessDirectoryProfile();
    await mpAccountPage.verifyAtDPf();

    await mpAccountPage.accessIdentityChecks();
    await mpAccountPage.verifyAtId();

    await mpAccountPage.accessFiles();
    await mpAccountPage.verifyAtFil();

    await mpAccountPage.accessSettings();
    await mpAccountPage.verifyAtSet();

    await mpHeader.accessDashboard();
    await mpDashboardPage.verifyAt();   
    
    //NPA_11
    await mpHeader.accessSettings();
    await mpSettingsPage.verifyAt();

    await mpHeader.accessDashboard();
    await mpDashboardPage.verifyAt();
  });

  test(`@NPA_12 @smoke @mp.nav - sign out`, async ({mpLoginPage, mpDashboardPage, mpHeader, mpMarketingPage}) => {
    await mpLoginPage.loginAs(String(process.env.MP_TEST_USERNAME), String(process.env.MP_TEST_PASSWORD));
    await mpDashboardPage.verifyAt();
    await mpHeader.logout();
    await mpMarketingPage.verifyAt();
    await mpMarketingPage.isElementVisibleWithName('Sign in');
  });

});
