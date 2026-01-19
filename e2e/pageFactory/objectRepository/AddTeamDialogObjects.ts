export class AddTeamDialogObjects {
  protected static SAVE_TEAM_BUTTON = 'button:has-text("Save changes")';
  protected static LOCATION_BY_DEFAULT =
    'input[data-test-subj="comboBoxSearchInput"]';
  protected static LOCATION_DROPDOWN_MENU =
    'button[aria-label="Open list of options"]';
  protected static LOCATION_MENU_OPTION = `.euiComboBoxOption__content:has-text("locationNamePlaceHolder")`;
  protected static TEAM_NAME_INPUT = 'input[data-test-subj="team_Name"]';
  protected static DESCRIPTION_INPUT =
    'textarea[data-test-subj="team_Description"]';
  protected static STRUCTURE_COMPANY_NAME = `[placeholder="Acme Ltd"]`;
  protected static STRUCTURE_FULL_NAME = `[placeholder="John Doe"]`;
  protected static STRUCTURE_EMAIL = `[placeholder="john@example.net"]`;
  protected static STRUCTURE_SAVE_BUTTON =
    'button[id="operations_teams_wizard_add_button"]';
  protected static COMPANY_STRUCTURE_TITLE = '.euiTitle euiModalHeader__title';
}
