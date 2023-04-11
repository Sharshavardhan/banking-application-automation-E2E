import { expect, Page, Locator } from '@playwright/test';

export class PaymentPage {
    // defining locators
    readonly page: Page;
    readonly payeeSelectionBtn: Locator;
    readonly getPayeeDetails: Locator;
    readonly payeeDetails: Locator;
    readonly accountType: Locator;
    readonly amount: Locator;
    readonly date: Locator;
    readonly description: Locator;
    readonly submitPaymentBtn: Locator;
    readonly statusMsg: Locator;

    // initialization of selectors through constructor
    constructor(page: Page){
        this.page = page;
        this.payeeSelectionBtn = page.locator('#sp_payee');
        this.getPayeeDetails = page.locator('#sp_get_payee_details');
        this.payeeDetails = page.locator('#sp_payee_details');
        this.accountType = page.locator('#sp_account');
        this.amount = page.locator('#sp_amount');
        this.date = page.locator('#sp_date');
        this.description = page.locator('#sp_description');
        this.submitPaymentBtn = page.locator('.btn-primary');
        this.statusMsg = page.locator('#alert_content');
    }

    // page methods
    async createPayment(){
        await this.payeeSelectionBtn.selectOption('apple');
        await this.getPayeeDetails.click();
        await expect(this.payeeDetails).toBeVisible();
        await this.accountType.selectOption('Brokerage');
        await this.amount.type('1000');
        await this.date.type('2023-05-09');
        await this.description.type('random description');
        await this.submitPaymentBtn.click();
    }

    async assertStatusMsg(){
        await expect(this.statusMsg).toContainText('The payment was successfully submitted.');
    }
}
