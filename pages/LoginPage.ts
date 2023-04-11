import { expect, Page, Locator } from '@playwright/test';
import { AbstractPage } from './AbstractPage';

export class LoginPage extends AbstractPage{
    // define selectors
    //readonly page: Page;
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitBtn: Locator;
    readonly errorMsg: Locator;

    // initialize selectors via constructors
    constructor(page: Page){
        //this.page = page;
        super(page);
        this.userNameInput = page.locator('#user_login');
        this.passwordInput = page.locator('#user_password');
        this.submitBtn = page.locator('text=Sign in');
        this.errorMsg = page.locator('.alert-error');
    }

    // login page methods

    async login(userNameInput, passwordInput){
        await this.userNameInput.type(userNameInput);
        await this.passwordInput.type(passwordInput);
        await this.submitBtn.click();
    }

    async assertErrorMessage(){
        await expect(this.errorMsg).toContainText('Login and/or password are wrong.');
    }
}