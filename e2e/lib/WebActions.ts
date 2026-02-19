import fs from 'fs';
import type { Locator, Page } from '@playwright/test';
import { BrowserContext, expect } from '@playwright/test';
import path from 'path';

export class WebActions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.retry(
      async () =>
        Promise.all([
          await this.page.goto(url, {waitUntil: "commit"}),
        ]),
      5 // retry
    );
  }

  async retry(promiseFactory: () => any, retryCount: number) {
    try {
      return await promiseFactory();
    } catch (error) {
      if (retryCount <= 0) {
        throw error;
      }
      return await this.retry(promiseFactory, retryCount - 1);
    }
  }

  async verifyURL(url: string): Promise<void> {
    await expect(this.page.url()).toContain(url);
  }

  async waitForURL(url: string): Promise<void> {
    await this.page.waitForURL(url);
  }

  async waitForFinishLoading() {
    await this.page.waitForLoadState('networkidle');
  }

  async verifyTitle(title: string): Promise<void> {
    expect(await this.page.title()).toContain(title);
  }

  async verifyPageElement(selector: string): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible' });
    await expect(this.page.locator(selector)).toHaveCount(1);
  }

  async verifyPageElementByRole(role: any, roleName: string): Promise<void> {
    await expect(this.page.getByRole(role, { name: roleName })).toHaveCount(1);
  }

  async waitForPageElement(locator: string): Promise<void> {
    await expect(this.page.locator(locator)).toBeVisible();
  }

  async waitForPageEnabledElement(locator: string): Promise<void> {
    await expect(this.page.locator(locator)).toBeEnabled();
  }

  async waitForPageEdiableElement(locator: string): Promise<void> {
    await expect(this.page.locator(locator)).toBeEditable();
  }

  async waitForElement(locator: string): Promise<void> {
    await this.page.waitForSelector(locator, {
      timeout: 30 * 1000,
      state: 'visible',
    });
  }

  async verifyPageElements(
    firstLocator: string,
    secondLocator: string
  ): Promise<void> {
    await this.page.waitForSelector(firstLocator, { state: 'visible' });
    await this.page.waitForSelector(secondLocator, { state: 'visible' });

    await expect(this.page.locator(firstLocator)).toHaveCount(1);
    await expect(this.page.locator(secondLocator)).toHaveCount(1);
  }

  async verifyThreePageElements(
    firstLocator: string,
    secondLocator: string,
    thirdLocator: string
  ): Promise<void> {
    await this.page.waitForSelector(firstLocator, { state: 'visible' });
    await this.page.waitForSelector(secondLocator, { state: 'visible' });
    await this.page.waitForSelector(thirdLocator, { state: 'visible' });

    await expect(this.page.locator(firstLocator)).toHaveCount(1);
    await expect(this.page.locator(secondLocator)).toHaveCount(1);
    await expect(this.page.locator(thirdLocator)).toHaveCount(1);
  }

  async verifyDashboardPageElements(
    pageSectionLocator: string,
    graphLocator: string
  ): Promise<void> {
    await this.page.waitForSelector(pageSectionLocator, { state: 'visible' });
    await expect(this.page.locator(pageSectionLocator)).toHaveCount(1);

    await this.page.waitForSelector(graphLocator, { state: 'visible' });
    await expect(this.page.locator(graphLocator)).toHaveCount(2);
  }

  async verifyLoginStatus(userStatusLocator: string): Promise<void> {
    await this.page.waitForSelector(userStatusLocator, { state: 'visible' });
    await expect(this.page.locator(userStatusLocator)).toHaveCount(1);
  }

  async verifyElementCount(locator: string, count: number): Promise<void> {
    await this.page.waitForSelector(locator, { state: 'visible' });
    await expect(this.page.locator(locator)).toHaveCount(count);
  }

  async verifyElementNotPresent(locator: string): Promise<void> {
    await expect(this.page.locator(locator)).toHaveCount(0, { timeout: 5000 });
  }

  async waitUntilElementNotPresent(locator: string, timeout: number): Promise<void> {
    await expect(this.page.locator(locator)).toHaveCount(0, {timeout: timeout,});
  }

  async waitUntilElementIsHidden(locator: string, timeout: number): Promise<void> {
    await expect(this.page.locator(locator)).toBeHidden({timeout: timeout,});
  }

  async verifyProductPageElements(addProductButtonLocator: string,productTableLocator: string): Promise<void> {
    await this.page.waitForSelector(addProductButtonLocator, { state: 'visible', });
    await this.page.waitForSelector(productTableLocator, { state: 'visible' });
    await expect(this.page.locator(addProductButtonLocator)).toHaveCount(1);
  }

  async waitForPageNavigation(event: string): Promise<void> {
    switch (event.toLowerCase()) {
      case `networkidle`:
        await this.page.waitForNavigation({
          waitUntil: `networkidle`,
          timeout: 30000,
        });
        break;
      case `load`:
        await this.page.waitForNavigation({
          waitUntil: `load`,
          timeout: 30000,
        });
        break;
      case `domcontentloaded`:
        await this.page.waitForNavigation({
          waitUntil: `domcontentloaded`,
          timeout: 30000,
        });
    }
  }

  async delay(time: number): Promise<void> {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  async selectText(locator: string): Promise<void> {
    await this.page.locator(locator).selectText();
  }

  async clickElement(locator: string): Promise<void> {
    await this.page.click(locator, { timeout: 30000 });
  }

  async forceClickElement(locator: string): Promise<void> {
    await this.page.click(locator, { force: true });
  }

  async numberOfClicksOnElement(locator: string,numberOfClicks: number): Promise<void> {
    await this.page.click(locator, { clickCount: numberOfClicks });
  }

  async doubleClickElement(locator: string): Promise<void> {
    await this.page.dblclick(locator, { force: true });
  }

  async clickElementJS(locator: string): Promise<void> {
    await this.page.$eval(locator, (element: HTMLElement) => element.click());
  }

  async boundingBoxClickElement(locator: string): Promise<void> {
    const elementHandle = await this.page.$(locator);
    const box = await elementHandle.boundingBox();
    await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  }

  async enterElementText(locator: string, text: string): Promise<void> {
    await this.page.fill(locator, text);
    await this.delay(1000); // we will wait until text is enterred
  }

  async enterTextByLabel(label: string, text: string): Promise<void> {
    await this.page.getByLabel(label).fill(text);
  }

  async enterTextByExactLabel(label: string, text: string): Promise<void> {
    await this.page.getByLabel(label, { exact: true }).fill(text);
  }

    async enterTextByRole(role:any, roleName:string, text: string): Promise<void> {
    await this.page.getByRole(role, { name: roleName }).fill(text);
  }

  async keyboardEnter(action: string): Promise<void> {
    await this.page.keyboard.press(action);
    await this.delay(1000);
  }

  async typeElementTextByNth(locator: string,index: number,text: string): Promise<void> {
    await this.page.locator(locator).nth(index).type(text);
  }

  async clearElementText(locator: string): Promise<void> {
    await this.page.fill(locator, '');
  }

  async typeElementByLabel(label: string, text: string): Promise<void> {
    await this.page.getByLabel(label).fill('');
    await this.page.getByLabel(label).type(text, { delay: 10 });
  }

  async focusOnElement(element: string): Promise<void> {
    await this.page.focus(element);
  }

  async hoverOverElement(element: string): Promise<void> {
    await this.page.hover(element, { force: true });
  }

  async clickElementByFirstRole(role: any, roleName: string): Promise<void> {
    await this.page
      .getByRole(role, { name: roleName })
      .first()
      .click({ force: true });
  }

  async findElementByLabelClickByRole(label:string, role: any, name: string): Promise<void> {
    await this.page.getByLabel(label).getByRole(role, { name: name }).click();
  }

  async clickElementByRole(role: any, name: string): Promise<void> {
    await this.page.getByRole(role, { name: name }).click();
  }

  async clickElementByExactRole(role: any, name: string): Promise<void> {
    await this.page.getByRole(role, { name: name, exact: true }).click();
  }

  async clickElementByNthRole(role:any, name:string): Promise<void> {
    await this.page.getByRole(role, { name: name }).nth(1).click();
  }

  async clickElementByLabel(label: string): Promise<void> {
    await this.page.getByLabel(label).click();
  }

  async clickElementByExactLabel(label: string): Promise<void> {
    await this.page.getByLabel(label, { exact: true }).click();
  }

  async clickElementByNthLabel(label: string, index: number,): Promise<void> {
    await this.page.getByLabel(label).nth(index).click();
  }

  async clickElementByLabelAndByRole(label: string,role: any,name: string): Promise<void> {
    await this.page.getByLabel(label).getByRole(role, { name: name }).click();
  }

  async clickElementByLocatorAndFilter(label: string,name: string): Promise<void> {
    await this.page.locator(label).filter({ hasText: name }).click();
  }

  async dragAndDrop(dragElementLocator: string,dropElementLocator: string): Promise<void> {
    await this.page.dragAndDrop(dragElementLocator, dropElementLocator);
  }

  async selectOptionFromDropdown(locator: string,option: string): Promise<void> {
    const selectDropDownLocator = await this.page.$(locator);
    await selectDropDownLocator.type(option);
  }

  async setOptionForSelectByLabel(locator: string,label: string): Promise<void> {
    const selectLocator = await this.page.$(locator);
    await selectLocator.selectOption({ label: label });
  }

  async getTextFromWebElements(locator: string): Promise<string[]> {
    return this.page.$$eval(locator, (elements) =>
      elements.map((item) => item.textContent.trim())
    );
  }

  async getTextFromElementByRole(role, name:string): Promise<string> {
    return this.page.getByRole(role, {name: name}).textContent();
  }

  async getValueFromElementByRole(role, name:string): Promise<string> {
    return this.page.getByRole(role, {name: name}).inputValue();
  }

  async getTextFromElementByLabel(label:string): Promise<string> {
    return this.page.getByLabel(label).textContent();
  }

  async getTextFromElement(locator:string): Promise<string> {
    return this.page.locator(locator).textContent();
  }

  //need to rewrite this method, to check what element is currently selected/visible
  async getTextFromMenuElement(locator:string): Promise<string> {
    return this.page.getByLabel('Product kind').filter({ visible: true }).textContent();
  }

  async downloadFile(locator: string): Promise<string> {
    const [download] = await Promise.all([
      this.page.waitForEvent(`download`),
      this.page.click(locator),
    ]);
    await download.saveAs(path.join(__dirname, `../Downloads`,download.suggestedFilename()));
    return download.suggestedFilename();
  }

  async keyPress(locator: string, key: string): Promise<void> {
    this.page.press(locator, key);
  }

  async readValuesFromTextFile(filePath: string): Promise<string> {
    return fs.readFileSync(`${filePath}`, `utf-8`);
  }

  async writeDataIntoTextFile(
    filePath: number | fs.PathLike,
    data: string | NodeJS.ArrayBufferView
  ): Promise<void> {
    fs.writeFile(filePath, data, (error) => {
      if (error) throw error;
    });
  }

  async verifyElementText(locator: string, text: string): Promise<void> {
    const textValue = await this.page.textContent(locator, { timeout: 10000 });
    expect(textValue.trim()).toBe(text);
  }

  async verifyNewWindowUrlAndClick(
    context: BrowserContext,
    newWindowLocator: string,
    urlText: string,
    clickOnNewWindowLocator: string
  ): Promise<void> {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      this.page.click(newWindowLocator),
    ]);
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain(urlText);
    await newPage.click(clickOnNewWindowLocator);
    await newPage.close();
  }

  async verifyElementContainsText(locator: string,text: string): Promise<void> {
    await expect(this.page.locator(locator)).toContainText(text, {timeout: 20000});
  }

  async verifyJSElementValue(locator: string, text: string): Promise<void> {
    const textValue = await this.page.$eval(
      locator,
      (element: HTMLInputElement) => element.value
    );
    expect(textValue.trim()).toBe(text);
  }

  async verifyElementAttribute(
    locator: string,
    attribute: string,
    value: string
  ): Promise<void> {
    await expect(this.page.locator(locator)).toHaveAttribute(attribute, value, {
      timeout: 5000,
    });
  }

  async verifyElementIsDisplayed(locator: string, errorMessage: string): Promise<void> {
    await this.page.waitForSelector(locator, { state: `visible`, timeout: 30000 })
      .catch(() => { 
        throw new Error(`${errorMessage}`);
       });
  }

  async expectToBeTrue(status: boolean, errorMessage: string): Promise<void> {
    expect(status, `${errorMessage}`).toBe(true);
  }

  async expectToBeValue(expectedValue: string,actualValue: string,errorMessage: string): Promise<void> {
    expect(expectedValue.trim(), `${errorMessage}`).toBe(actualValue);
  }

  async reload(): Promise<void> {
    this.page.reload({ waitUntil: 'load' });
  }

  async getNumberOfElements(element: string): Promise<number> {
    return await this.page.locator(element).count();
  }

  async clickElementByPlaceholder(holder: string): Promise<void> {
    await this.page.getByPlaceholder(holder).click();
  }

  async clickElementByText(text: string): Promise<void> {
    await this.page.getByText(text, { exact: true }).click();
  }

  async waitForVisibleElementText(text: string): Promise<void> {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async waitForVisibleFirstElementText(text: string): Promise<void> {
    await expect(this.page.getByText(text).first()).toBeVisible();
  }

  async clickElementByLabelAndByOption(label: string, kind: string): Promise<void> {
    await this.page.getByLabel(label).selectOption(kind);
  }

  async isVisibleByRole(role: any, calendarName: string): Promise<boolean> {
    return await this.page.getByRole(role, { name: calendarName }).isVisible();
  }

  async isVisibleByText(text:string): Promise<boolean> {
    return await this.page.getByText(text).isVisible();
  }

  async isVisibleByExactText(text:string): Promise<boolean> {
    return await this.page.getByText(text, { exact: true }).isVisible();
  }

  async isVisible(selector:string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

}
