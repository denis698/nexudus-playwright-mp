import { LoginPageObjects } from '@objects/LoginPageObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class LoginPage extends LoginPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(LoginPageObjects.EMAIL_TEXT_FIELD);
    await webActions.verifyPageElement(LoginPageObjects.PASSWORD_TEXT_FIELD);
    await webActions.verifyPageElement(LoginPageObjects.SIGN_IN_BUTTON);
    await webActions.verifyURL(LoginPageObjects.LOGIN_PAGE_URL);
    await webActions.verifyTitle(LoginPageObjects.LOGIN_PAGE_TITLE);
  }

  async navigateToURL(): Promise<void> {
    await webActions.navigate(`/`);
  }

  async navigateTo(url:string): Promise<void> {
    await webActions.navigate(url);
  }

  async loginAs(userName: string, password: string): Promise<void> {
    await webActions.enterElementText(LoginPageObjects.EMAIL_TEXT_FIELD, userName);
    await webActions.enterElementText(LoginPageObjects.PASSWORD_TEXT_FIELD, password);
    await webActions.clickElement(LoginPageObjects.SIGN_IN_BUTTON);
  }

  async verifyLoginError(): Promise<void> {
    await webActions.verifyPageElement(LoginPageObjects.SIGNIN_ERROR);
    await webActions.verifyElementText(
      LoginPageObjects.SIGNIN_ERROR,
      'The email or password is incorrect.'
    );
  }
}
