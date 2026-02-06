import {type Page, type Locator} from '@playwright/test';

export class AccountCreatedPage {
    readonly page: Page;

    readonly headingAccountCreated: Locator;
    readonly textCongratulations: Locator;
    readonly textMemberPrivileges: Locator;
    readonly continueLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.headingAccountCreated = page.getByRole('heading', {
            name: /account created!/i,
        });
        this.textCongratulations = page.getByText(
            /Congratulations! Your new account has been successfully created!/i
        );
        this.textMemberPrivileges = page.getByText(
            /You can now take advantage of member privileges to enhance your online shopping experience with us\./i
        );
        this.continueLink = page.locator('a[data-qa="continue-button"]');
    }

    async expectAccountCreatedHeadingVisible(): Promise<void> {
        await this.headingAccountCreated.waitFor({state: 'visible'});
    }

    async expectSuccessMessagesVisible(): Promise<void> {
        await this.textCongratulations.waitFor({state: 'visible'});
        await this.textMemberPrivileges.waitFor({state: 'visible'});
    }

    async clickContinue(): Promise<void> {
        await this.continueLink.click();
    }
}
