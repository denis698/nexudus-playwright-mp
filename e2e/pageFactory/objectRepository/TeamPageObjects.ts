export class TeamPageObjects {
  protected static URL_TEAMS = `/operations/teams`;
  protected static ADD_TEAMS_BUTTON =
    'button[id="operations_teams_add_button_normal"]';
  protected static MANUAL_ENTRY_BUTTON = 'text="Manual entry"';
  protected static DROPDOWN_TEAMS_TYPES =
    'button[id="operations_teams_segement_menu_button"]';
  protected static SHOW_ALL_TYPES_BUTTON =
    'button.euiContextMenuItem:has-text("Show all")';
  protected static SEARCH_FILTER_INPUT_TEXT_FIELD = 'input[type="search"]';
  protected static SEARCH_OPTION_BY_TEAM_NAME =
    '[role="option"][title="Name = teamNamePlaceHolder"]';
  protected static SEARCH_BY_TEXT = 'strong:has-text("PlaceHolder")';
  //Using the regular expression ^ to be sure the searching text does not have any others symbols
  protected static SEARCH_STRONG_EXACT_MATCH =
    'strong:text-matches("^PlaceHolder$")';
  protected static COMPANY_STRUCTURE_BOTTON = 'text="Company structure"';
  protected static MULTIPLE_CUSTOMERS_BOTTON = 'text="Multiple customers"';
  protected static TEAM_NAME_A = 'a:has-text("teamNamePlaceHolder")';
  protected static TEAM_MEMBERS_BUTTON = 'button:has-text("Members")';
  protected static NUMBER_VISIBLE_ROWS_BUTTON =
    'button[data-test-subj="tablePaginationPopoverButton"]';
  protected static NUMBER_VISIBLE_ROWS_100 =
    'button[data-test-subj="tablePagination-100-rows"]';
  protected static SELECT_ALL_TEAMS_CHECKBOX =
    'input[data-test-subj="checkboxSelectAll"]';
  protected static DELETE_TEAMS_BUTTON ='button[type="button"].css-dmpes-euiButtonDisplay-s-defaultMinWidth-fill-danger';
  protected static CONFIRMATION_BUTTON =
    'button[data-test-subj="confirmModalConfirmButton"]';
  protected static DELETE_ACTION_COMPLETED_TEXT = 'text="Delete completed"';
  protected static NO_TEAMS_LABEL = `text="No items found"`;
  protected static ALL_TEAMS_CHECKBOX = `[data-test-subj="checkboxSelectAll"]`;
  protected static BULK_ACTIONS_BUTTON = '//*[contains(text(),"Text")]';
  protected static DELETE_TEAMS_BUTTON_SIDE_MENU = '//*[contains(text(),"Text")]';
  protected static DELETE_TEAMS_TEXT_FIELD = '[placeholder="Type \'DELETE\' to continue"]';
  protected static CLOSE_NOTIFICATION_TOAST_BUTTON = `[data-test-subj="toastCloseButton"]`;
  protected static NO_TEAMS_CANVAS = `.euiEmptyPrompt__main`;
}
