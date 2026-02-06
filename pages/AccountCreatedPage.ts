import {expect, type Page, type Locator} from '@playwright/test';

export class AccountCreatedPage {
    readonly page: Page;

    readonly headingAccountCreated: Locator;
    readonly formSection: Locator;
    readonly continueLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.headingAccountCreated = page.getByRole('heading', {
            name: /account created!/i,
        });
        this.formSection = page.locator('section#form');
        this.continueLink = page.locator('a[data-qa="continue-button"]');
    }

    async expectAccountCreatedHeadingVisible(): Promise<void> {
        await this.headingAccountCreated.waitFor({state: 'visible'});
    }

    async expectSuccessMessagesInFormSection(): Promise<void> {
        await expect(this.formSection).toBeVisible();
        await expect(this.formSection).toContainText(
            'Congratulations! Your new account has been successfully created!'
        );
        await expect(this.formSection).toContainText(
            'You can now take advantage of member privileges to enhance your online shopping experience with us.'
        );
    }

    async clickContinue(): Promise<void> {
        await this.continueLink.click();
    }
}
