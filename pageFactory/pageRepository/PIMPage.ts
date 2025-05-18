import { BrowserContext, expect, Locator, Page } from "@playwright/test";

export class PIMPage {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly RES_ROW: Locator;
  readonly SEARCH_BUTTON: Locator;
  readonly JOBTITLE_SELECTBOX: Locator;
  readonly EMPLOYMENTSTATUS_SELECTBOX: Locator;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    this.RES_ROW = this.page.locator(`//div[@class='oxd-table-card']`);
    this.SEARCH_BUTTON = this.page.locator(`//button[normalize-space()='Search']`);
    this.JOBTITLE_SELECTBOX = this.page
      .getByText('Job Title')
      .locator('xpath=../..')
      .locator('.oxd-select-text-input');
    this.EMPLOYMENTSTATUS_SELECTBOX = this.page
      .getByText('Employment Status')
      .locator('xpath=../..')
      .locator('.oxd-select-text-input');
  }

  async selectJobTitle(title: string): Promise<void> {
    await this.JOBTITLE_SELECTBOX.click();
    await this.page.getByRole('option', { name: title }).click();
  }

  async selectEmploymentStatus(status: string): Promise<void> {
    await this.EMPLOYMENTSTATUS_SELECTBOX.click();
    await this.page.getByRole('option', { name: status }).click();
  }

  async clickSeachButton(): Promise<void> {
    await this.SEARCH_BUTTON.click();
  }

  async verifyResultDisplaysCorrectly(expectedString: string): Promise<void> {
    await this.RES_ROW.first().waitFor({ state: 'visible' });;
    let rowElements = await this.RES_ROW.all();
    for (let row of rowElements) {
      let textContent = await row.textContent();
      expect(textContent).toContain(expectedString);
    }
  }
}