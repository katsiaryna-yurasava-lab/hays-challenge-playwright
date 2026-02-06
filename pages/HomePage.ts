import {expect, type Locator, type Page} from '@playwright/test';

export class HomePage {
    readonly page: Page;
    textLoggedIn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.textLoggedIn = page.getByText(/logged in as/i);
    }

    async expectLoggedInAs(firstName: string, lastName: string): Promise<void> {
        await expect(this.textLoggedIn).toBeVisible();
        const fullLoggedInText = new RegExp(
            `Logged in as\\s+${firstName}\\s+${lastName}`,
            'i'
        );
        await expect(this.textLoggedIn).toContainText(fullLoggedInText);
    }
}
