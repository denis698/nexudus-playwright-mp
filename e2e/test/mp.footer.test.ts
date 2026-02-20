import { expect } from "@playwright/test";
import test from '@lib/BaseTest';
import userData from "./testdata/login/mp/user.json"

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

test.describe('Footer', () => {
  test(`@NFA_01 @smoke @mp.footer - Footer.Links`, async function ({ mpLoginPage, mpMarketingPage }) {
    const footerHeaders  = ["Contact", "Services", "Help"];   
    const footerCopyright  = "© Denis Gershengoren [London Office]"; 
    const footerLiks  = ["Contact us", "Book a tour", "Join a plan",
                         "Events", "Bookings", "Day offices",
                         "Event spaces", "Hot desks", "Kitchens", "Labs", "Meeting rooms", "Other", "Storage units", "Treatment rooms",
                         "FAQ", "Help Desk"];    

    await mpLoginPage.navigateTo(process.env.MP_TEST_MARKETING_PAGE_URL + process.env.MP_TEST_USER);
    await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
    await mpMarketingPage.verifyAt();
  
    for (var header of footerHeaders) {
      const isFooterHeaderVisible = await mpMarketingPage.isElementVisibleWithExactName(header);
      expect(isFooterHeaderVisible).toBeTruthy();
    }

    const isFooterCopyrightVisible = await mpMarketingPage.isElementVisibleWithName(footerCopyright);
    expect(isFooterCopyrightVisible).toBeTruthy();

    for (var link of footerLiks) {
      const isFooterLinkVisible = await mpMarketingPage.isElementVisibleByRole('link', link);
      expect(isFooterLinkVisible).toBeTruthy();
    }

  });

  test(`@NFA_02 @smoke @mp.footer - Footer.Login`, async function ({ mpLoginPage, mpMarketingPage, mpDashboardPage }) {
    const footerCopyright  = "© Denis Gershengoren [London Office]"; 
    
    await mpLoginPage.navigateTo(process.env.MP_TEST_MARKETING_PAGE_URL + process.env.MP_TEST_USER);
    await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
    await mpDashboardPage.accessLoginPage();
    await mpLoginPage.loginAs(String(process.env.MP_TEST_USERNAME), String(process.env.MP_TEST_PASSWORD));
    await mpDashboardPage.verifyAt();
    const userLoginName = await mpDashboardPage.getUserLoginStatus(userData.user_name);
    expect(userLoginName).toContain(userData.user_name);
  
    const isFooterCopyrightVisible = await mpMarketingPage.isElementVisibleWithName(footerCopyright);
    expect(isFooterCopyrightVisible).toBeTruthy();

    const languageNameVisible = await mpMarketingPage.isElementVisibleByRole('button', 'Language');
    expect(languageNameVisible).toBeTruthy()
  });
  
  test(`@NFA_03 @smoke @mp.footer - Footer.Language`, async function ({mpLoginPage, mpMarketingPage, testDataUtil}) {
    // Generate a random number between 1 and 4 
    //1 - Spanish, 2 - English (US), 3 - English (int)
    const languageType = String(testDataUtil.generateRandomNumber(1, 3));  
    
    let name = '' ; 
    switch (languageType) {
      case "1":  
        name = 'Spanish'
         break; 
      case "2":
        name = 'English (US)'
        break; 
      case "3":
        name = 'English (Int.)'
        break; 
      default:
        throw new Error(`Unknown language type: ${languageType}`);
    }
    
    //check UI
    await mpLoginPage.navigateTo(process.env.MP_TEST_MARKETING_PAGE_URL + process.env.MP_TEST_USER);
    await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
    await mpMarketingPage.verifyAt();
    await mpMarketingPage.setLanguage(name);
    await mpMarketingPage.delayInTest(1000); // delay for waiting for language change
    const languageNameVisible = await mpMarketingPage.isElementVisibleByRole('button', name);
    expect(languageNameVisible).toBeTruthy()
  });

  test(`@NFA_04 @smoke @mp.footer - Footer.SayingText`, async function ({request,mpLoginPage, mpMarketingPage}) {
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
    await mpMarketingPage.verifyAt();
    const footerNameVisible = await mpMarketingPage.isElementVisibleWithName(footerName);
    expect(footerNameVisible).toBeTruthy()

  });

  test(`@NFA_05 @smoke @mp.footer - Footer.SayingAuthor`, async function ({request, testDataUtil, mpLoginPage, mpMarketingPage}) {
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
    await mpMarketingPage.verifyAt();
    const authorNameVisible = await mpMarketingPage.isElementVisibleWithName(authorName);
    expect(authorNameVisible).toBeTruthy()
  });

  test(`@NFA_06a @smoke @mp.footer - Social.Facebook`, async function ({request, mpLoginPage, mpMarketingPage}) {
    const authToken = {"authorization": "Bearer " + access_token};
    const social = 'http://www.facebook.com';  

    //update
    const successMessage = "was successfully updated.";
    const payload = {
        "Id": 1417289147,
        "BusinessId": 1414940210,
        "Name": "Social.Facebook",
        "Value": social
    }
    
    const successResponse = await request.put(String(process.env.API_TEST_SPACES_BUS_SETTINGS_URL), {headers:authToken, data:payload});
    const successResponseJson = await successResponse.json();
    expect(successResponseJson.Message).toContain(successMessage);

    //check api
    const checkResponse = await request.get(String(process.env.API_TEST_SPACES_BUS_SETTING_URL + "/" + 1417289147), {headers:authToken});
    expect(checkResponse.status()).toBe(200);
    expect(checkResponse.json()).not.toBeNull();
    const checkResponseJson = await checkResponse.json();
    expect(checkResponseJson).toHaveProperty("Value", social);

    //check UI
    await mpLoginPage.navigateTo(process.env.MP_TEST_MARKETING_PAGE_URL + process.env.MP_TEST_USER);
    await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
    await mpMarketingPage.verifyAt();
    const authorNameVisible = await mpMarketingPage.isElementVisible('[href="' + social + '"]');
    expect(authorNameVisible).toBeTruthy()
  });
  
  test(`@NFA_06b @smoke @mp.footer - Social.Flickr`, async function ({request, mpLoginPage, mpMarketingPage}) {
    const authToken = {"authorization": "Bearer " + access_token};
    const social = 'http://www.flickr.com';  

    //update
    const successMessage = "was successfully updated.";
    const payload = {
        "Id": 1417289146,
        "BusinessId": 1414940210,
        "Name": "Social.Flickr",
        "Value": social
    }
    
    const successResponse = await request.put(String(process.env.API_TEST_SPACES_BUS_SETTINGS_URL), {headers:authToken, data:payload});
    const successResponseJson = await successResponse.json();
    expect(successResponseJson.Message).toContain(successMessage);

    //check api
    const checkResponse = await request.get(String(process.env.API_TEST_SPACES_BUS_SETTING_URL + "/" + 1417289146), {headers:authToken});
    expect(checkResponse.status()).toBe(200);
    expect(checkResponse.json()).not.toBeNull();
    const checkResponseJson = await checkResponse.json();
    expect(checkResponseJson).toHaveProperty("Value", social);

    //check UI
    await mpLoginPage.navigateTo(process.env.MP_TEST_MARKETING_PAGE_URL + process.env.MP_TEST_USER);
    await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
    await mpMarketingPage.verifyAt();
    const authorNameVisible = await mpMarketingPage.isElementVisible('[href="' + social + '"]');
    expect(authorNameVisible).toBeTruthy()
  });

  test(`@NFA_06c @smoke @mp.footer - Social.Instagram`, async function ({request, mpLoginPage, mpMarketingPage}) {
    const authToken = {"authorization": "Bearer " + access_token};
    const social = 'http://www.instagram.com';  

    //update
    const successMessage = "was successfully updated.";
    const payload = {
        "Id": 1417289148,
        "BusinessId": 1414940210,
        "Name": "Social.Instagram",
        "Value": social
    }
    
    const successResponse = await request.put(String(process.env.API_TEST_SPACES_BUS_SETTINGS_URL), {headers:authToken, data:payload});
    const successResponseJson = await successResponse.json();
    expect(successResponseJson.Message).toContain(successMessage);

    //check api
    const checkResponse = await request.get(String(process.env.API_TEST_SPACES_BUS_SETTING_URL + "/" + 1417289148), {headers:authToken});
    expect(checkResponse.status()).toBe(200);
    expect(checkResponse.json()).not.toBeNull();
    const checkResponseJson = await checkResponse.json();
    expect(checkResponseJson).toHaveProperty("Value", social);

    //check UI
    await mpLoginPage.navigateTo(process.env.MP_TEST_MARKETING_PAGE_URL + process.env.MP_TEST_USER);
    await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
    await mpMarketingPage.verifyAt();
    const authorNameVisible = await mpMarketingPage.isElementVisible('[href="' + social + '"]');
    expect(authorNameVisible).toBeTruthy()
  });

  test(`@NFA_06d @smoke @mp.footer - Social.Twitter`, async function ({request, mpLoginPage, mpMarketingPage}) {
    const authToken = {"authorization": "Bearer " + access_token};
    const social = 'http://www.x.com';  

    //update
    const successMessage = "was successfully updated.";
    const payload = {
        "Id": 1417289145,
        "BusinessId": 1414940210,
        "Name": "Social.Twitter",
        "Value": social
    }
    
    const successResponse = await request.put(String(process.env.API_TEST_SPACES_BUS_SETTINGS_URL), {headers:authToken, data:payload});
    const successResponseJson = await successResponse.json();
    expect(successResponseJson.Message).toContain(successMessage);

    //check api
    const checkResponse = await request.get(String(process.env.API_TEST_SPACES_BUS_SETTING_URL + "/" + 1417289145), {headers:authToken});
    expect(checkResponse.status()).toBe(200);
    expect(checkResponse.json()).not.toBeNull();
    const checkResponseJson = await checkResponse.json();
    expect(checkResponseJson).toHaveProperty("Value", social);

    //check UI
    await mpLoginPage.navigateTo(process.env.MP_TEST_MARKETING_PAGE_URL + process.env.MP_TEST_USER);
    await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
    await mpMarketingPage.verifyAt();
    const authorNameVisible = await mpMarketingPage.isElementVisible('[href="' + social + '"]');
    expect(authorNameVisible).toBeTruthy()
  });
});
