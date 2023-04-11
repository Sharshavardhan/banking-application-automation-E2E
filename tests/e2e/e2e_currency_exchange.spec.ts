import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

test.describe.parallel('currency exchange', () => {
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
        await page.locator('#pay_bills_tab').click();

        await expect(page).toHaveURL('http://zero.webappsecurity.com/bank/pay-bills.html');

        await page.getByText('Purchase Foreign Currency').click();
        //await page.locator('text=Purchase Foreign Currency').click(); 
    })

    test('dollar - australia', async ({page}) => {
        await page.selectOption('#pc_currency', 'AUD');
        await expect(page.locator('#sp_sell_rate')).toContainText('1 dollar (AUD) = 1.0987 U.S. dollar (USD)');
        await page.type('#pc_amount', '1000');
        await page.locator('#pc_inDollars_true').check();
        await page.locator('#pc_calculate_costs').click();
        await expect(page.locator('#pc_conversion_amount')).toContainText('910.17 dollar (AUD) = 1000.00 U.S. dollar (USD)');
        await page.locator('.btn-primary').click();
        await expect(page.locator('#alert_content')).toContainText('Foreign currency cash was successfully purchased.');
    })
})