import { MPCreateAccountDialogObjects } from '@objects/MPCreateAccountDialogObjects';
import { WebActions } from '@lib/WebActions';
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class MPCreateAccountDialog extends MPCreateAccountDialogObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async verifyAt(): Promise<void> {
    await webActions.verifyPageElement(MPCreateAccountDialogObjects.FULL_NAME_TEXT_FIELD);
    await webActions.verifyPageElement(MPCreateAccountDialogObjects.EMAIL_TEXT_FIELD);
  }

  async createAccount(fullname:string, email:string): Promise<void> {
    await webActions.clickElementByRole('textbox', 'Full name*');
    await webActions.enterTextByRole('textbox', 'Full name*', fullname);

    await webActions.clickElementByRole('textbox', 'Email*');
    await webActions.enterTextByRole('textbox', 'Email*', email);

    await webActions.clickElementByRole('button', 'Create account and continue');
  }

}
