export class AddCustomerDialogObjects {
  protected static MANUAL_ENTRY_BUTTON = 'button:has-text("Manual entry")';
  protected static FULL_NAME = '[data-test-subj="coworker_FullName"]';
  protected static EMAIL = '[data-test-subj="coworker_Email"]';
  protected static TYPE_OF_CUSTOMER = '[data-test="Contacts"]';
  protected static CLOSE_CUSTOMER_BUTTON = 'button:has-text("Close")';
  protected static SAVE_CUSTOMER_BUTTON = 'button:has-text("Save changes")';
  protected static SAVE_CUSTOMER_DISABLE_BUTTON = 'button[disabled]:has-text("Save changes")';
  protected static MORE_DETAILS_BUTTON = 'button:has-text("More actions")';
  protected static JOINED_AS_A_CUSTOMER_LABEL = 'text="Joined as a customer"';
  protected static PHONE_NUMBER = '[data-test-subj="coworker_LandLine"]';
  protected static MOBILE_NUMBER = '[data-test-subj="coworker_MobilePhone"]';
  protected static COMPANY_NAME = '[data-test-subj="coworker_CompanyName"]';
  protected static COWORKER_TYPE = '[data-test-subj="coworker_CoworkerType"]';
  protected static PRIMARY_CONTACT_LABEL = 'label:has-text("Primary contact")';
  protected static STRUCTURE_COMPANY_NAME = `[placeholder="Acme Ltd"]`;
  protected static STRUCTURE_FULL_NAME = `[placeholder="John Doe"]`;
  protected static STRUCTURE_EMAIL = `[placeholder="john@example.net"]`;
  protected static SAVE_BUTTON = 'button[id="operations_coworkers_wizard_add_button"]';
  protected static TITLE = '.euiTitle euiModalHeader__title';
  protected static EMAILS_TEXT_FIELD = 'textarea';

  protected static TEAM_TEXT_FIELD = 'input[data-test-subj="comboBoxSearchInput"]';
  protected static TEAM_NAME_MARK = 'mark:has-text("Placeholder")';
  protected static TEAM_NAME_STRONG = 'strong:has-text("Placeholder")';
  protected static CONFIRM_BUTTON = '[data-test-subj="confirmModalConfirmButton"]';
  protected static CONFIRM_TITLE = '[data-test-subj="confirmModalTitleText"]';
  protected static TEAM_DROP_DOWN_MENU = '[aria-label="Open list of options"]';
}

export enum Customer {
  Individual = 'Individual',
  Company = 'Company',
}
