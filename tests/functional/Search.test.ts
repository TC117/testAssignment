import test from '@lib/BaseTest';
import { expect } from 'allure-playwright';

// We can use Steps like in Cucmber format as shown below

const Jobtitle = 'HR Manager';
const Status = 'Full-Time Permanent'

test.only(`Verify Search`, { tag: '@Smoke' }, async ({ loginPage, PIMPage }) => {
    await test.step(`Navigate to Application`, async () => {
        await loginPage.navigateToURL("/web/index.php/pim/viewEmployeeList");
    });
    await test.step(`Login to App `, async () => {
        await loginPage.loginToApplication();
        await loginPage.verifyProfilePage();
    });
    await test.step(`Search Jobtitle and Employment Status`, async () => {
        await PIMPage.selectJobTitle(Jobtitle);
        await PIMPage.selectEmploymentStatus(Status);
        await PIMPage.clickSeachButton();
    });

    await test.step(`Verify search result`, async () => {
        await PIMPage.verifyResultDisplaysCorrectly(Jobtitle);
        await PIMPage.verifyResultDisplaysCorrectly(Status);
    });
}); 