import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { testConfig } from '../../testConfig';

let webActions: WebActions;

export class LoginPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly USERNAME_EDITBOX: Locator;
    readonly PASSWORD_EDITBOX: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly SIDEPANEL: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.USERNAME_EDITBOX = this.page.locator("//input[@name='username']");
        this.PASSWORD_EDITBOX = this.page.locator("//input[@name='password']");
        this.LOGIN_BUTTON = this.page.locator("//button[contains(@class,'login-button')]");
        this.SIDEPANEL = this.page.locator(`//aside[@class='oxd-sidepanel']`);
    }

    async navigateToURL(url?: string): Promise<void> {
        await this.page.goto(url ?? "/");
    }

    async clickOnLoginMainButton(): Promise<void> {
        await this.LOGIN_BUTTON.click();
    }

    async loginToApplication(username?: string, password?: string): Promise<void> {
        const user = username ?? testConfig.username;
        const pass = password ?? testConfig.password;
        await this.USERNAME_EDITBOX.fill(user);
        await this.PASSWORD_EDITBOX.fill(pass);
        await this.LOGIN_BUTTON.click();
    }

    async verifyProfilePage(): Promise<void> {
        await expect(this.SIDEPANEL).toBeVisible();
    }
}