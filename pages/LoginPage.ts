import {type Locator, type Page} from '@playwright/test';
import {metadata} from '../config/metadata';

export class LoginPage {
    readonly page: Page;
    nameInput: Locator;
    emailInput: Locator;
    signUp: Locator;
    consentAcceptButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.locator('input[data-qa="signup-name"]');
        this.emailInput = page.locator('input[data-qa="signup-email"]');
        this.signUp = page.locator('button[data-qa="signup-button"]');
        this.consentAcceptButton = page.locator('button[aria-label="Consent"]');
    }

    async open(): Promise<void> {
        await this.page.goto('/login');
        await this.acceptConsentIfPresent();
    }

    /** Closes the consent popup ("This site asks for consent to use your data") if visible. */
    async acceptConsentIfPresent(): Promise<void> {
        const consentButton = this.consentAcceptButton.first();
        await consentButton
            .waitFor({state: 'visible', timeout: metadata.popupTimeout})
            .then(() => consentButton.click())
            .catch(() => {});
    }

    async fillNewUserSignup(name: string, email: string): Promise<void> {
        await this.nameInput.waitFor({state: 'visible'});
        await this.nameInput.fill(name);
        await this.emailInput.waitFor({state: 'visible'});
        await this.emailInput.fill(email);
    }

    async clickSignup(): Promise<void> {
        await this.signUp.click();
    }

    async startSignup(name: string, email: string): Promise<void> {
        await this.fillNewUserSignup(name, email);
        await this.clickSignup();
    }
}
