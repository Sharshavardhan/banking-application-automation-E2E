import { expect, Page, Locator } from '@playwright/test';

export class FeedbackPage {
    // define locators
    readonly page: Page;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly commentInput: Locator;
    readonly clearBtn: Locator;
    readonly submitBtn: Locator;
    readonly feedbackTitle: Locator;

    // initializing locators via constructor
    constructor(page: Page){
        this.page = page;
        this.nameInput = page.locator('#name');
        this.emailInput = page.locator('#email');
        this.subjectInput = page.locator('#subject');
        this.commentInput = page.locator('#comment');
        this.clearBtn = page.locator('input[name="clear"]');
        this.submitBtn = page.locator('input[name="submit"]');
        this.feedbackTitle = page.locator('#feedback-title');
    }

    // page methods
    async fillForm (name: string, email: string, subject: string, comment: string){
        await this.nameInput.type(name);
        await this.emailInput.type(email);
        await this.subjectInput.type(subject);
        await this.commentInput.type(comment);
    }

    async resetForm(){
        await this.clearBtn.click();
    }

    async submitForm(){
        await this.submitBtn.click();
    }

    async assertReset(){
        await expect(this.nameInput).toBeEmpty;
        await expect(this.emailInput).toBeEmpty;
        await expect(this.commentInput).toBeEmpty;
        await expect(this.subjectInput).toBeEmpty;
    }

    async assertSubmit(){
        await expect(this.feedbackTitle).toBeVisible();
    }
}
