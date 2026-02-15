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
  test(`@RCA_301 @smoke @api - Calendars.DefaultView`, async function ({request, testDataUtil, mpLoginPage, mPBookingsMeetingRoomsPage}) {
    // Generate a random number between 1 and 4 
    //1 - day, 2 - week, 3 - month, 4 - list
    const calendarViewType = String(testDataUtil.generateRandomNumber(1, 4));  
    const authToken = {"authorization": "Bearer " + access_token};

    let name = '' ; 
    switch (calendarViewType) {
      case "1":  
        name = 'Day'
         break; 
      case "2":
        name = 'Week'
        break; 
      case "3":
        name = 'Month'
        break; 
      case "4":
        name = 'List'
        break; 
      default:
        throw new Error(`Unknown calendar type: ${calendarViewType}`);
    }

    //update
    const successMessage = "was successfully updated.";
    const payload = {
        "Id": 1417289008,
        "BusinessId": 1414940210,
        "Name": "Calendars.DefaultView",
        "Value": calendarViewType
    }
    
    const successResponse = await request.put(String(process.env.API_TEST_SPACES_BUS_SETTINGS_URL), {headers:authToken, data:payload});
    const successResponseJson = await successResponse.json();
    expect(successResponseJson.Message).toContain(successMessage);

    //check
    const checkResponse = await request.get(String(process.env.API_TEST_SPACES_BUS_SETTING_URL + "/" + 1417289008), {headers:authToken});
    expect(checkResponse.status()).toBe(200);
    expect(checkResponse.json()).not.toBeNull();
    const checkResponseJson = await checkResponse.json();
    expect(checkResponseJson).toHaveProperty("Value", calendarViewType);
    
    //check UI
    await mpLoginPage.navigateTo(process.env.MP_TEST_MARKETING_PAGE_URL + process.env.MP_TEST_USER + '/bookings/meeting-rooms/calendar');
    await mpLoginPage.login(String(process.env.MP_LOCATION_PASSWORD));
    await mPBookingsMeetingRoomsPage.verifyAt();
    const defaultCalendarView = await mPBookingsMeetingRoomsPage.isCalendarViewVisibleWithName(name);
    expect(defaultCalendarView).toBeTruthy()
  });
  
});
