import { TestInfo, test as baseTest } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { WebActions } from '@lib/WebActions';
import { PIMPage } from '@pages/PIMPage';


const test = baseTest.extend<{
    webActions: WebActions;
    loginPage: LoginPage;
    PIMPage: PIMPage;
    testInfo: TestInfo;
}>({
    webActions: async ({ page, context }, use) => {
        await use(new WebActions(page, context));
    },
    loginPage: async ({ page, context }, use) => {
        await use(new LoginPage(page, context));
    },
    PIMPage: async ({ page, context }, use) => {
        await use(new PIMPage(page, context));
    },
})

export default test;