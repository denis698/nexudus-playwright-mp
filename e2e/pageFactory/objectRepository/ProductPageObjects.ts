export class ProductPageObjects {
  protected static PRODUCT_PAGE_URL = `/billing/products`;
  protected static ADD_PRODUCT_BUTTON = `text=Add product`;
  protected static PRODUCT_TABLE = `.euiTableRow`;
  protected static PRODUCT_NAME = `text="productName"`;
  protected static PRODUCT_OUT_OF_STOCK = `text="Out of stock [stockLevel units]"`;
  protected static PRODUCT_STOCK_LEVEL = `text="In stock [stockLevel units]"`;
  protected static PRODUCT_STOCK_LOW_LEVEL = `text="Low stock [stockLevel units]"`;
  protected static PRODUCT_CHECK_BOX = `[aria-label="Select row 1"]`;
  protected static ARCHIVE_PRODUCT_BUTTON = `text="Archive 1 record"`;
  protected static RESTORE_PRODUCT_BUTTON = `text="Restore 1 record"`;
  protected static DELETE_PRODUCT_BUTTON = `text="Delete 1 record"`;
  protected static SEARCH_MENU = `#billing_products_segement_menu_button`;
  protected static SEARCH_MENU_ARCHIVED_OPTION = `text="Archived products"`;
  protected static SEARCH_MENU_PUBLISHED_OPTION = `text="Published products"`;
  protected static SEARCH_MENU_INTERNAL_OPTION = `text="Internal products"`;
  protected static SEARCH_MENU_AVAILABLE_OPTION = `text="Available products"`;
  protected static SEARCH_MENU_SHOW_ALL_OPTION = `text="Show all"`;
  protected static CONFIRMATION_BUTTON = `text="Yes, do it"`;
  protected static CLOSE_NOTIFICATION_TOAST_BUTTON = `[data-test-subj="toastCloseButton"]`;
  protected static AVAILABILITY_TAB = `text="Availability"`;
  protected static PREVENT_NEGATIVE_STOCK_BUTTON = `[aria-checked="false"][data-test-subj="product_AllowNegativeStock"]`;
  protected static DROPDOWN_TEAMS_TYPES = 'button[id="billing_products_segement_menu_button"]';
  protected static SHOW_ALL_TYPES_BUTTON = 'button.euiContextMenuItem:has-text("viewType")';
  protected static SEARCH_FILTER_INPUT_TEXT_FIELD = 'input[type="search"]';
  protected static SEARCH_OPTION_BY_TEAM_NAME = '[role="option"][title="Name = teamNamePlaceHolder"]';
  //Using the regular expression ^ to be sure the searching text is located at the start of the expression
  protected static SEARCH_RESULTS_BY_TEAM_NAME = 'strong:text-matches("^teamNamePlaceHolder")';
  protected static DELETE_PRODUCTS_BUTTON_SIDE_MENU = '//*[contains(text(),"Text")]';
  protected static NO_PRODUCTS_CANVAS = `.euiEmptyPrompt__main`;
  protected static NO_PRODUCTS_LABEL = `text="No items found"`;
  protected static ALL_PRODUCTS_CHECKBOX = `[data-test-subj="checkboxSelectAll"]`;
  protected static VISIBLE_ROWS_BUTTON = 'button[data-test-subj="tablePaginationPopoverButton"]';
  protected static VISIBLE_ROWS_100_OPTION = 'button[data-test-subj="tablePagination-100-rows"]';
  protected static PRODUCT_PUBLISHED_TAG = '[title="Published"]';
  protected static PRODUCT_INTERNAL_TAG = '[title="Internal"]';
  protected static DELETE_PRODUCTS_TEXT_FIELD = '[placeholder="Type \'DELETE\' to continue"]';
  protected static BULK_ACTIONS_BUTTON = '//*[contains(text(),"Text")]';
}
