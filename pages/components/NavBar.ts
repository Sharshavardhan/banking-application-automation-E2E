import { expect, Page, Locator } from '@playwright/test';

export class NavBar {
    // define locators
    readonly page: Page;
    readonly accountSummary: Locator;
    readonly accoutActivity: Locator;
    readonly tranferFunds: Locator;
    readonly payBills: Locator;
    readonly myMoneyMap: Locator;
    readonly onlinestatements: Locator;

    // initialize locators via contructors
    constructor(page: Page){
        this.page = page;
        this.accountSummary = page.locator('#account_summary_tab');
        this.accoutActivity = page.locator('#account_activity_tab');
        this.tranferFunds = page.locator('#transfer_funds_tab');
        this.payBills = page.locator('#pay_bills_tab');
        this.myMoneyMap = page.locator('#money_map_tab');
        this.onlinestatements = page.locator('#online_statements_tab');
    }

    // page methods
    async clickOnTab(tabName){
        switch(tabName) {
            case 'Account Summary': 
                await this.accountSummary.click();
                break;
            case 'Account Activity':
                await this.accoutActivity.click();
                break;
            case 'Transfer Funds':
                await this.tranferFunds.click();
                break;
            case 'Pay Bills':
                await this.payBills.click();
                break;
            case 'My Money Map':
                await this.myMoneyMap.click();
                break;
            case 'Online Statements':
                await this.onlinestatements.click();
                break;
            default:
                throw new Error('this tab does not exist');
        }
    }
}