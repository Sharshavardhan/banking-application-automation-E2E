import { expect, Page, Locator } from '@playwright/test';

export class HomePage {
    // define selectors
    readonly page: Page;
    readonly signinButton: Locator;
    readonly searchBox: Locator;
    readonly linkFeedback: Locator;

    // initialize selectors via constructor
    constructor(page: Page){
        this.page = page;
        this.signinButton = page.locator('#signin_button');
        this.searchBox = page.locator('#searchTerm');
        this.linkFeedback = page.locator('#feedback');
    }

    // page functions
    async visit() {
        await this.page.goto('http://zero.webappsecurity.com');
    }

    async clickOnSignIn(){
        await this.signinButton.click(); 
    }

    async clickOnFeedbackLink(){
        await this.linkFeedback.click();
    }
    async searchFor(phrase: string){
        await this.searchBox.type(phrase);
        await this.page.keyboard.press('Enter');
    }

}