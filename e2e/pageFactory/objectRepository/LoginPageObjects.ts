export class LoginPageObjects {
  protected static LOGIN_PAGE_URL = `/login`;
  protected static LOGIN_PAGE_TITLE = `Nexudus Platform`;
  protected static EMAIL_TEXT_FIELD = `input[name="Email"]`;
  protected static PASSWORD_TEXT_FIELD = `input[name="Password"]`;
  protected static SIGN_IN_BUTTON = `text=Sign in`;
  protected static SIGNIN_ERROR = `.euiPanel--danger`;
  protected static GOT_IT_BUTTON = `text=Got it`; //TEMP CODE: wrong page for the element
}
