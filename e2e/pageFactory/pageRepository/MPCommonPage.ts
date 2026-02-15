import { MPCommonPageObjects } from '@objects/MPCommonPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class MPCommonPage extends MPCommonPageObjects {
  readonly page: Page;

  static readonly LOCATION_NAME_1: string = 'denis690';

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async navigateToLocation(locationName: string): Promise<void> {
    await webActions.navigate('/' + locationName);
  }

  async verifyProtectionPopup(): Promise<void> {
    await webActions.waitForFinishLoading();
    await webActions.verifyPageElement(MPCommonPageObjects.PROTECTION_POPUP_PASSWORD_INPUT);
    await webActions.verifyPageElement(MPCommonPageObjects.PROTECTION_POPUP__MESSAGE);
  }

  async protectionPopupLocationLogin(password: string): Promise<void> {
    await webActions.enterTextByRole('textbox', 'Password', password);
    await webActions.clickElementByRole('button', 'Submit');
  }

  async isElementVisibleWithName(name:string): Promise<boolean> {
    return await webActions.isVisibleByText(name);
  }
}
