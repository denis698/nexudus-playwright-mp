import { expect } from "@playwright/test";
import test from '@lib/BaseTest';

let access_token: string;

test.beforeEach(async ({ request }) => {
  const headers = 
  {
    "accept": "application/json",
    "Content-Type": "application/x-www-form-urlencoded"
  }
  const data = 'grant_type=password&username=' + process.env.API_TEST_USERNAME + '&password=' + process.env.API_TEST_PASSWORD;
  const response = await request.post(String(process.env.API_TEST_SPACES_URL), {headers:headers, data:data});
  expect(response.status()).toBe(200);
  expect(response.json()).not.toBeNull();
  const responceData = await response.json();
  expect(responceData.token).not.toBeNull();
  access_token = responceData.access_token;
});

test.describe('API', () => {
  test(`@NFA_04 @smoke @mp.navigation - Footer.SayingText`, async function ({request,mpLoginPage, mpMarketingPage, mpCommonPage}) {
    const authToken = {"authorization": "Bearer " + access_token};
    const footerName = "Nothing will work unless Denis runs AT - "  + new Date().toLocaleTimeString();
    
    //update
    const successMessage = "was successfully updated.";
    const payload = {
        "Id": 1417289149,
        "BusinessId": 1414940210,
        "Name": "Footer.SayingText",
        "Value": footerName
    }
    
    const successResponse = await request.put(String(process.env.API_TEST_SPACES_BUS_SETTINGS_URL), {headers:authToken, data:payload});
    const successResponseJson = await successResponse.json();
    expect(successResponseJson.Message).toContain(successMessage);

    //check api
    const checkResponse = await request.get(String(process.env.API_TEST_SPACES_BUS_SETTING_URL + "/" + 1417289149), {headers:authToken});
    expect(checkResponse.status()).toBe(200);
    expect(checkResponse.json()).not.toBeNull();
    const checkResponseJson = await checkResponse.json();
    expect(checkResponseJson).toHaveProperty("Value", footerName);

    //check UI
    await mpLoginPage.navigateTo(process.env.MP_TEST_MARKETING_PAGE_URL + process.env.MP_TEST_USER);
    await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
    await mpMarketingPage.verifySignInButtonIsVisible();
    const footerNameVisible = await mpCommonPage.isElementVisibleWithName(footerName);
    expect(footerNameVisible).toBeTruthy()

  });

  test(`@NFA_05 @smoke @mp.navigation - Footer.SayingAuthor`, async function ({request, testDataUtil, mpLoginPage, mpMarketingPage, mpCommonPage}) {
    const authToken = {"authorization": "Bearer " + access_token};
    // Generate a random number between 1 and 3 
    //1 - Denis Gershengoren, 2 - Steven Hobbs, 3 - Olena Maistrenko
    const authorType = String(testDataUtil.generateRandomNumber(1, 3));  

    let authorName = '' ; 
    switch (authorType) {
      case "1":  
        authorName = 'Denis Gershengoren'
         break; 
      case "2":
        authorName = 'Steven Hobbs'
        break; 
      case "3":
        authorName = 'Olena Maistrenko'
        break; 
      default:
        throw new Error(`Unknown calendar type: ${authorType}`);
    }

    authorName = authorName + ' - ' + new Date().toLocaleTimeString();

    //update
    const successMessage = "was successfully updated.";
    const payload = {
        "Id": 1417289150,
        "BusinessId": 1414940210,
        "Name": "Footer.SayingAuthor",
        "Value": authorName
    }
    
    const successResponse = await request.put(String(process.env.API_TEST_SPACES_BUS_SETTINGS_URL), {headers:authToken, data:payload});
    const successResponseJson = await successResponse.json();
    expect(successResponseJson.Message).toContain(successMessage);

    //check api
    const checkResponse = await request.get(String(process.env.API_TEST_SPACES_BUS_SETTING_URL + "/" + 1417289150), {headers:authToken});
    expect(checkResponse.status()).toBe(200);
    expect(checkResponse.json()).not.toBeNull();
    const checkResponseJson = await checkResponse.json();
    expect(checkResponseJson).toHaveProperty("Value", authorName);

    //check UI
    await mpLoginPage.navigateTo(process.env.MP_TEST_MARKETING_PAGE_URL + process.env.MP_TEST_USER);
    await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
    await mpMarketingPage.verifySignInButtonIsVisible();
    const authorNameVisible = await mpCommonPage.isElementVisibleWithName(authorName);
    expect(authorNameVisible).toBeTruthy()
  });
    
});
