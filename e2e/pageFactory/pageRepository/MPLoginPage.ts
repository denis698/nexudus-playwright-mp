import { MPLoginPageObjects } from '@objects/MPLoginPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class MPLoginPage extends MPLoginPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.waitForFinishLoading();
    await webActions.verifyPageElement(MPLoginPageObjects.EMAIL_TEXT_FIELD);
    await webActions.verifyPageElement(MPLoginPageObjects.PASSWORD_TEXT_FIELD);
    await webActions.verifyURL(MPLoginPageObjects.LOGIN_PAGE_URL);
  }

  async navigateTo(url: string): Promise<void> {
    await webActions.navigate(url);
  }

  async login(password: string): Promise<void> {
    await webActions.enterTextByRole('textbox', 'Password', password);
    await webActions.clickElementByRole('button', 'Submit');
  }

  async loginAs(userName: string, password: string): Promise<void> {
    await webActions.enterElementText(MPLoginPageObjects.EMAIL_TEXT_FIELD, userName);
    await webActions.enterElementText(MPLoginPageObjects.PASSWORD_TEXT_FIELD, password);
    await webActions.clickElementByRole('button', 'Login');
  }

  async enterEmail(userName: string): Promise<void> {
    await webActions.enterElementText(MPLoginPageObjects.EMAIL_TEXT_FIELD, userName);
  }

  async enterPassword(password: string): Promise<void> {
    await webActions.enterElementText(MPLoginPageObjects.PASSWORD_TEXT_FIELD, password);
  }

  async clickOnLogin(): Promise<void> {
    await webActions.clickElementByRole('button', 'Login');
  }

  async verifyLoginError(): Promise<void> {
    await webActions.waitForVisibleElementText('Invalid email/password');
  }

  async createAccount(): Promise<void> {
    await webActions.clickElementByRole('button', 'Sign in');
  }
}
