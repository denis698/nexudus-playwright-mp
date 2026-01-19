export class AddInvoicesPageObjects {
  protected static TITLE = `[id="recordDetails"]`;
  protected static CUSTOMER_DROP_DOWN_MENU = `[data-test-subj="coworkerInvoice_CoworkerId"]`;
  protected static SAVE_CHANGES_BUTTON = `text="Save changes"`;
  protected static DELETE_INVOICES_TEXT_FIELD = '[placeholder="Type \'DELETE INVOICE\' to continue"]';
  protected static SAVE_CHANGES_DISABLED_BUTTON = `[title="No changes were made to this record since the last time it was saved."]`;
}