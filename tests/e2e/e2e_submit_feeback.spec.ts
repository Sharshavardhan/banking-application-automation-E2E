import {test, expect} from '@playwright/test';
import { FeedbackPage } from '../../pages/FeedbackPage';
import { HomePage } from '../../pages/HomePage';

test.describe.parallel('feedback form - reset and submit', () => {
    let feedbackPage: FeedbackPage;
    let homePage: HomePage;
    test.beforeEach(async ({page}) => {
        feedbackPage = new FeedbackPage(page);
        homePage = new HomePage(page);

        await homePage.visit();
        await homePage.clickOnFeedbackLink();
        await expect(page).toHaveURL('http://zero.webappsecurity.com/feedback.html');
    })

    test('feedback form - fill and reset', async ({page}) => {
        await feedbackPage.fillForm('some name', 'someemail@email.com', 'subject', 'some comment');
        await feedbackPage.clearBtn.click();
        await feedbackPage.assertReset();
    })

    test('feedback form - fill and submit', async ({page}) => {
        await feedbackPage.fillForm('some name', 'someemail@email.com', 'subject', 'some comment');
        await feedbackPage.submitBtn.click();
        await feedbackPage.assertSubmit();
        
        // waitForSelector is a combination of locate, wait and assert
        await page.waitForSelector('#feedback-title');
    })
})
