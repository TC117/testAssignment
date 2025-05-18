import test from '@lib/BaseTest';

// We can use Steps like in Cucmber format as shown below

test(`Verify Book Store Login`, { tag: '@Smoke'}, async ({ loginPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await loginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await loginPage.loginToApplication();
    });
    await test.step(`Verify User is logged in and navigated to Profile page`, async () => {
        await loginPage.verifyProfilePage();
    });
}); 