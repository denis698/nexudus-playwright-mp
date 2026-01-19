export class AddItemPageObjects {
  protected static GENERAL_DETAILS_TAB = `text="General details"`;
  protected static SAVE_ITEM_BUTTON = 'button:has-text("Save changes")';
  protected static SAVE_ITEM_DISABLE_BUTTON = 'button[disabled]:has-text("Save changes")';
  protected static MORE_DETAILS_BUTTON = 'button:has-text("More actions")';
  protected static ITEM_NAME_TEXT_FIELD = `[data-test-subj="floorPlanDeskWithAvailability_Name"]`;
  protected static FLOOR_PLAN_MENU = `[aria-label="Open list of options"]`;
  protected static FLOOR_PLAN_CLOSE_LIST_OF_OPTIONS = `[aria-label="Close list of options"]`;
  protected static FLOOR_PLAN_MENU_OPTION = `[data-test-subj="floorPlanDeskWithAvailability_FloorPlanId"]`;
  protected static NOTE_TEXT_AREA = `[data-test-subj="floorPlanDeskWithAvailability_Notes"]`;
  protected static OCCUPIER_DROPDOWN_MENU = `[data-test-subj="floorPlanDeskWithAvailability_CoworkerId"]`;
  protected static CONNECTED_RESOURCE_DROPDOWN_MENU = `[data-test-subj="floorPlanDeskWithAvailability_ResourceId"]`;
  protected static DELETE_ITEMS_TEXT_FIELD = '[placeholder="Type \'DELETE\' to continue"]';
}
