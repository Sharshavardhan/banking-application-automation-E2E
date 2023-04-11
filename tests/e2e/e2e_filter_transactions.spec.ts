import {test, expect} from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

test.describe.parallel('filter transactions', () => {
    let homepage: HomePage;
    let loginPage: LoginPage;
    //login
    test.beforeEach(async ({page}) => {
        homepage = new HomePage(page);
        loginPage = new LoginPage(page);
        await homepage.visit();
        await homepage.clickOnSignIn();
        await loginPage.login('username', 'password');
        //to solve SSL certificate issue
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html');
        await page.locator('#account_activity_tab').click();

        await expect(page).toHaveURL('http://zero.webappsecurity.com/bank/account-activity.html');
        await expect(page.locator('#ui-tabs-1')).toContainText('Show Transactions');
    })

    test('transactions - savings', async ({page}) => {
        await page.selectOption('#aa_accountId', '1');
        const allSavingsTns = await page.locator('#all_transactions_for_account tbody tr')

        await expect(allSavingsTns).toHaveCount(3);
    })

    test('transactions - loan', async ({page}) => {
        await page.selectOption('#aa_accountId', '4');
        const allSavingsTns = await page.locator('#all_transactions_for_account tbody tr')

        await expect(allSavingsTns).toHaveCount(2);
    })

    test('transactions - credit card', async ({page}) => {
        await page.selectOption('#aa_accountId', '5');
        const allSavingsTns = await page.locator('#all_transactions_for_account')

        await expect(allSavingsTns).toContainText('No results.');
    })
})