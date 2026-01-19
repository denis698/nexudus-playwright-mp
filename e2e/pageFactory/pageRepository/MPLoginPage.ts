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
    await webActions.verifyPageElement(MPLoginPageObjects.PORTAL_PASSPORT_TEXT_FIELD);
    await webActions.verifyPageElement(MPLoginPageObjects.PASSPORT_PROTECTION_MESSAGE);
    await webActions.verifyURL(MPLoginPageObjects.LOGIN_PAGE_URL);
  }

  async navigateTo(url:string): Promise<void> {
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

  async verifyLoginError(): Promise<void> {
    await webActions.verifyPageElement(MPLoginPageObjects.SIGNIN_ERROR);
    await webActions.verifyElementText(MPLoginPageObjects.SIGNIN_ERROR, 'The email or password is incorrect.');
  }

  async createAccount(): Promise<void> {
    await webActions.clickElementByRole('button', 'Sign in');
  }
}
