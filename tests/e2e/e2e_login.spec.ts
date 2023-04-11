import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';


test.describe.parallel('login and logout scenarios', () => {
    
    let loginPage: LoginPage;
    let homePage: HomePage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await homePage.visit();
        await homePage.clickOnSignIn();
    })

    test('negitive scenrio - login', async ({page}) => {
        await loginPage.login('invalid username','invalid password');
        await loginPage.wait(3000);
        await loginPage.assertErrorMessage();
    })

    test('positive scenario - login and logout', async ({page}) => {
        await loginPage.login('username','password');
        
        //to solve SSL certificate issue
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html');
        
        const accountSummaryTab = await page.locator('#account_summary_tab')
        await expect(accountSummaryTab).toBeVisible()

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})
