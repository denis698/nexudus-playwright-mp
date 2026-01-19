import { expect, request } from "@playwright/test";
import test from '@lib/BaseTest';

let access_token: string;

test.beforeEach(async ({ request }) => {
  const headers = {
                      "accept": "application/json",
                      "Content-Type": "application/x-www-form-urlencoded"
                  }
  const data = 'grant_type=password&username=' + process.env.API_TEST_USERNAME + '&password=' + process.env.API_TEST_PASSWORD;
  const response = await request.post(String(process.env.API_TEST_SPACES_URL), {headers:headers, data:data});
  console.log(response);
  
  expect(response.status()).toBe(200);
  expect(response.json()).not.toBeNull();
  const responceData = await response.json();
  expect(responceData.token).not.toBeNull();
  const response_json = await response.json();
  expect(response_json.token_type).toBe("bearer"); 
  expect(response_json).toHaveProperty("expires_in", 1209599);
  access_token = responceData.access_token;
});

test.describe('API', () => {
  test(`@20000 @smoke @api - fail to login`, async function ({request}) {
    const data = 'grant_type=INVALID&username=INVALID&password=INVALID';
    const response = await request.post(String(process.env.API_TEST_SPACES_URL), {data:data});
    expect(response.status()).toBe(400);
  });

  test.skip(`@20001 @smoke @api - get users`, async function ({request}) {
    const auth_token = {"authorization": "Bearer " + access_token};
    const usersResponse = await request.get(String(process.env.API_TEST_SPACES_USERS_URL), {headers:auth_token});
    expect(usersResponse.status()).toBe(200);
    expect(usersResponse.json()).not.toBeNull();
    console.log(await usersResponse.json());
  });

  test.skip(`@20002 @smoke @api - get user`, async function ({request}) {
    const auth_token = {"authorization": "Bearer " + access_token};
    const usersResponse = await request.get(String(process.env.API_TEST_SPACES_USER_URL), {headers:auth_token});
    expect(usersResponse.status()).toBe(200);
    expect(usersResponse.json()).not.toBeNull();
    console.log(await usersResponse.json());
  });

  test.skip(`@20003 @smoke @api - get bussiness settings`, async function ({request}) {
    const auth_token = {"authorization": "Bearer " + access_token};
    const response = await request.get(String(process.env.API_TEST_SPACES_BUS_SETTINGS_URL), {headers:auth_token});
    expect(response.status()).toBe(200);
    expect(response.json()).not.toBeNull();
    const response_json = await response.json();
    console.log(response_json);
  });

  test.skip(`@20004 @smoke @api - get bussiness setting`, async function ({request}) {
    const auth_token = {"authorization": "Bearer " + access_token};
    const response = await request.get(String(process.env.API_TEST_SPACES_BUS_SETTING_URL + 1417289149), {headers:auth_token});
    expect(response.status()).toBe(200);
    expect(response.json()).not.toBeNull();
    const response_json = await response.json();
    console.log(response_json);
  });

  test(`@20005 @smoke @api - set bussiness settings`, async function ({request}) {
    //get
    const busValue = "Nothing will work unless denis runs e2e "
    const authToken = {"authorization": "Bearer " + access_token};
    const getResponse = await request.get(String(process.env.API_TEST_SPACES_BUS_SETTING_URL + 1417289149), {headers:authToken});
    const getResponseJson = await getResponse.json();
    expect(getResponseJson.Value).toContain(busValue);
    
    //update
    const modifiedValue = busValue  + new Date().toLocaleTimeString();
    const successMessage = "was successfully updated.";
    const payload = {
        "Id": 1417289149,
        "BusinessId": 1414940210,
        "Name": "Footer.SayingText",
        "Value": modifiedValue
    }
    
    const successResponse = await request.put(String(process.env.API_TEST_SPACES_BUS_SETTINGS_URL), {headers:authToken, data:payload});
    const successResponseJson = await successResponse.json();
    expect(successResponseJson.Message).toContain(successMessage);

    //check
    const checkResponse = await request.get(String(process.env.API_TEST_SPACES_BUS_SETTING_URL + 1417289149), {headers:authToken});
    expect(checkResponse.status()).toBe(200);
    expect(checkResponse.json()).not.toBeNull();
    const checkResponseJson = await checkResponse.json();
    console.log(checkResponseJson);
    expect(checkResponseJson).toHaveProperty("Value", modifiedValue);
  });

  });