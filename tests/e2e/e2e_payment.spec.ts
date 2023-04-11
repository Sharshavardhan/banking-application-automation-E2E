import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { PaymentPage } from '../../pages/PaymentPage';
import { NavBar } from '../../pages/components/NavBar'

test.describe.parallel('payments', () => {
    let homepage: HomePage;
    let loginPage: LoginPage;
    let paymentPage: PaymentPage;
    let navBar: NavBar;

    test.beforeEach(async ({page}) => {
        homepage = new HomePage(page);
        loginPage = new LoginPage(page);
        paymentPage = new PaymentPage(page);
        navBar = new NavBar(page)

        await homepage.visit();
        await homepage.clickOnSignIn();
        await loginPage.login('username', 'password');
        //to solve SSL certificate issue
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html');
        await page.locator('#pay_bills_tab').click();

        await expect(page).toHaveURL('http://zero.webappsecurity.com/bank/pay-bills.html');
    })

    test('payments - apple', async ({page}) => {
        await navBar.clickOnTab('Pay Bills');
        await paymentPage.createPayment();
        await paymentPage.assertStatusMsg();
    })

})