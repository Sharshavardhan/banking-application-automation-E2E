import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

test.describe.parallel('funds transfer', () => {
    let homepage: HomePage;
    let loginPage: LoginPage;
    test.beforeEach(async ({page}) => {
        homepage = new HomePage(page);
        loginPage = new LoginPage(page);
        await homepage.visit();
        await homepage.clickOnSignIn();
        await loginPage.login('username', 'password');
        //to solve SSL certificate issue
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html');
        await page.locator('#transfer_funds_tab').click();

        await expect(page).toHaveURL('http://zero.webappsecurity.com/bank/transfer-funds.html');
    })

    test('transaction - cancel', async ({page}) => {
        await page.selectOption('#tf_fromAccountId', '1');
        await page.selectOption('#tf_toAccountId', '3');
        await page.type('#tf_amount', '10000');
        await page.type('#tf_description', 'ghtih');
        await page.locator('#btn_submit').click();

        await page.locator('#btn_cancel').click();
        await expect(page).toHaveURL('http://zero.webappsecurity.com/bank/transfer-funds.html');
        await expect(page.locator('.board-header')).toContainText('Transfer Money & Make Payments');
    })

    test('transaction - success', async ({page}) => {
        await page.selectOption('#tf_fromAccountId', '1');
        await page.selectOption('#tf_toAccountId', '3');
        await page.type('#tf_amount', '10000');
        await page.type('#tf_description', 'ghtih');
        await page.locator('#btn_submit').click();

        await expect(page.locator('.board-header')).toContainText('Transfer Money & Make Payments - Verify');
        await expect(page).toHaveURL('http://zero.webappsecurity.com/bank/transfer-funds-verify.html');
        
        await page.locator('#btn_submit').click();
        
        await expect(page.locator('.alert-success')).toHaveText('You successfully submitted your transaction.');
    })

})