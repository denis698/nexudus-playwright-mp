export class DashboardPageObjects {
  protected static DASHBOARD_PAGE_URL = `/dashboards/now`;
  protected static DASHBOARD_PAGE_TITLE = `QA Global`;
  protected static DASHBOARD_PAGE_SECTION = `.euiPage`;
  protected static DASHBOARD_GRAPH = `.recharts-surface`;
  protected static HEADER_LOGIN_ACCOUNT_NAME = `[aria-label="userName"]`;
  protected static LOGOUT_MENU = `.euiAvatar--user`;
  protected static LOGOUT_BUTTON = `button:has-text("Log out")`;
  protected static EMAIL_NOTIFICATIONS_TEXT = `text="Email notifications are disabled in your account."`;
  protected static NOTIFICATION_LINK = `[href="/settings/5/0/0"]`;
  protected static NOTIFICATIOB_LINK_TEXT = `text="Notifications settings"`;
  protected static CLOSE_SIDE_PANEL_BUTTON = `text="Close"`;
  protected static RECENT_UPDATES_SIDE_PANEL = `#headerFlyoutUpdates`;
  protected static CLOSE_RECENT_UPDATES_SIDE_PANEL_BUTTON = `[aria-label="Close this dialog"]`;
}
