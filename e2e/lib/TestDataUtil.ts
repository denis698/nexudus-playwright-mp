import { NavigationPanel } from "@pages/NavigationPanel";
import { SettingsInvoicesAndTaxPage } from "@pages/SettingsInvoicesAndTaxPage";
import { SettingsInvoicesAndTaxPageAccountsTab } from "@pages/SettingsInvoicesAndTaxPageAccountsTab";
import { SettingsInvoicesAndTaxPageTaxTab } from "@pages/SettingsInvoicesAndTaxPageTaxTab";
import { SettingsPage } from "@pages/SettingsPage";

export class TestDataUtil {
  getDateTimeSuffix(): string {
    const utcDate = new Date().toISOString(); // format: "2024-04-30T11:32:28.608Z"

    const year = utcDate.slice(0, 4);
    const month = utcDate.slice(5, 7);
    const day = utcDate.slice(8, 10);
    const hours = utcDate.slice(11, 13);
    const minutes = utcDate.slice(14, 16);
    const seconds = utcDate.slice(17, 19);

    //Expected result : " 2024.04.30 11.32.28". The space is added to separate this suffix.
    return ` ${year}.${month}.${day} ${hours}.${minutes}.${seconds}`;
  }

  async setTaxRateSettings(navigationPanel: NavigationPanel,settingsPage: SettingsPage,settingsInvoicesAndTaxPage: SettingsInvoicesAndTaxPage,settingsInvoicesAndTaxPageTaxTab: SettingsInvoicesAndTaxPageTaxTab,setTaxRate: boolean) {
    await navigationPanel.accessSettings();
    await settingsPage.verifyAt();
    await settingsPage.accessInvoicesAndTaxPage();
    await settingsInvoicesAndTaxPage.verifyAt();
    await settingsInvoicesAndTaxPage.accessTaxTab();
    await settingsInvoicesAndTaxPageTaxTab.verifyAt();
    if (setTaxRate != true) {
      await settingsInvoicesAndTaxPageTaxTab.disableTaxRateSettings();
    } else {
      await settingsInvoicesAndTaxPageTaxTab.enableTaxRateSettings();
    }
  }
  
  async setFinantialAccountsSettings(navigationPanel: NavigationPanel,settingsPage: SettingsPage,settingsInvoicesAndTaxPage: SettingsInvoicesAndTaxPage,settingsInvoicesAndTaxPageAccountsTab: SettingsInvoicesAndTaxPageAccountsTab,setFinantialAccounts: boolean) {
    await navigationPanel.accessSettings();
    await settingsPage.verifyAt();
    await settingsPage.accessInvoicesAndTaxPage();
    await settingsInvoicesAndTaxPage.verifyAt();
    await settingsInvoicesAndTaxPage.accessAccountsTab();
    await settingsInvoicesAndTaxPageAccountsTab.verifyAt();
    if (setFinantialAccounts != true) {
      await settingsInvoicesAndTaxPageAccountsTab.disableFinantialAccountsSettings();
    } else {
      await settingsInvoicesAndTaxPageAccountsTab.enableFinantialAccountsSettings();
    }
  }

  /* Defining a custom function which returns a random number 
  between min and max, including min and max */
  generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
