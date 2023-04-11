import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe.parallel('search automation', () => {
    let homePage: HomePage;
    
    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        await homePage.visit();
    })

    test('search - positive scenario', async ({page}) => {
        await homePage.searchFor('bank');
        await expect(page).toHaveURL('http://zero.webappsecurity.com/search.html?searchTerm=bank');
        await expect(page.locator('li > a')).toHaveCount(2);
    })

    test('search - negitive scenrio', async ({page}) => {
        await homePage.searchFor('asdfghjkl');
        await expect(page.locator('.top_offset')).toContainText('No results were found for the query: asdfghjkl');
    })
})