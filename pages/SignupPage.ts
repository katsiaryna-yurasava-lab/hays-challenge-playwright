import {type Page} from '@playwright/test';

export interface FullSignupFormData {
    name: string;
    email: string;
    password: string;
    title: 'Mr' | 'Mrs';
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
    day: number;
    month: number;
    year: number;
}

export class SignupPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForAccountInformationForm(): Promise<void> {
        await this.page.getByRole('heading', {name: /enter account information/i}).waitFor({state: 'visible'});
    }

    async fillAccountInformation(data: FullSignupFormData): Promise<void> {
        await this.waitForAccountInformationForm();

        await this.page.locator(`input[value="${data.title}"]`).first().check();
        await this.page.locator('input[data-qa="password"]').fill(data.password);

        await this.page.locator('select[data-qa="days"]').selectOption(String(data.day));
        await this.page.locator('select[data-qa="months"]').selectOption(String(data.month));
        await this.page.locator('select[data-qa="years"]').selectOption(String(data.year));
    }

    async fillAddressInformation(data: FullSignupFormData): Promise<void> {
        await this.page.locator('input[data-qa="first_name"]').fill(data.firstName);
        await this.page.locator('input[data-qa="last_name"]').fill(data.lastName);
        await this.page.locator('input[data-qa="company"]').fill(data.company);
        await this.page.locator('input[data-qa="address"]').fill(data.address);
        await this.page.locator('input[data-qa="address2"]').fill(data.address2);
        await this.page.locator('select[data-qa="country"]').selectOption({label: data.country});
        await this.page.locator('input[data-qa="state"]').fill(data.state);
        await this.page.locator('input[data-qa="city"]').fill(data.city);
        await this.page.locator('input[data-qa="zipcode"]').fill(data.zipcode);
        await this.page.locator('input[data-qa="mobile_number"]').fill(data.mobileNumber);
    }

    async submitCreateAccount(): Promise<void> {
        await this.page.locator('button[data-qa="create-account"]').click();
    }

    async fillAndSubmitSignup(data: FullSignupFormData): Promise<void> {
        await this.fillAccountInformation(data);
        await this.fillAddressInformation(data);
        await this.submitCreateAccount();
    }
}
