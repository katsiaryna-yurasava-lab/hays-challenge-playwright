import {test, expect} from '@playwright/test';
import {AccountCreatedPage} from '../pages/AccountCreatedPage';
import {HomePage} from '../pages/HomePage';
import {LoginPage} from '../pages/LoginPage';
import {SignupPage} from '../pages/SignupPage';
import {
    generateUserData,
    saveUserData,
    type StoredUserData,
} from '../utils/userData';

test.describe('User Signup', () => {
    let userData: StoredUserData;

    test.beforeEach(() => {
        userData = generateUserData();
    });

    test('Signup with dynamic data, validate success, and store user data', async ({
        page,
    }) => {
        const loginPage = new LoginPage(page);
        const signupPage = new SignupPage(page);
        const accountCreatedPage = new AccountCreatedPage(page);
        const homePage = new HomePage(page);

        await test.step('1. Navigate to the signup page', async () => {
            await loginPage.open();
        });

        await test.step('2. Start signup with name and email', async () => {
            await loginPage.startSignup(userData.name, userData.email);
        });

        await test.step('3. Fill all mandatory signup details and complete registration', async () => {
            await signupPage.fillAndSubmitSignup({
                name: userData.name,
                email: userData.email,
                password: userData.password,
                title: userData.title,
                firstName: userData.firstName,
                lastName: userData.lastName,
                company: userData.company,
                address: userData.address,
                address2: userData.address2,
                country: userData.country,
                state: userData.state,
                city: userData.city,
                zipcode: userData.zipcode,
                mobileNumber: userData.mobileNumber,
                day: userData.day,
                month: userData.month,
                year: userData.year
            });
        });

        await test.step('4. Validate that the account is created successfully', async () => {
            await expect(accountCreatedPage.headingAccountCreated).toBeVisible();
            await expect(accountCreatedPage.formSection).toBeVisible();
            await expect(accountCreatedPage.formSection).toContainText(
                'Congratulations! Your new account has been successfully created!'
            );
            await expect(accountCreatedPage.formSection).toContainText(
                'You can now take advantage of member privileges to enhance your online shopping experience with us.'
            );

            await accountCreatedPage.clickContinue();

            await homePage.expectLoggedInAs(userData.firstName, userData.lastName);
        });

        await test.step('5. Store user data in shared artifact', async () => {
            saveUserData(userData);
        });
    });
});
