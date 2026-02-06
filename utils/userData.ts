import * as fs from 'fs';
import * as path from 'path';
import {faker} from '@faker-js/faker';
import {paths} from '../playwright.config';

export interface StoredUserData {
    name: string;
    email: string;
    password: string;
    title: 'Mr' | 'Mrs';
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    address2?: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
    day?: number;
    month?: number;
    year?: number;
}

/** Countries available in the signup form dropdown. */
const SIGNUP_COUNTRIES = [
    'India',
    'United States',
    'Canada',
    'Australia',
    'Israel',
    'New Zealand',
    'Singapore',
] as const;

export function generateUserData(): StoredUserData {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const birthdate = faker.date.birthdate({min: 18, max: 65, mode: 'age'});

    return {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({firstName, lastName}),
        password: faker.internet.password({length: 12}),
        title: faker.helpers.arrayElement(['Mr', 'Mrs'] as const),
        firstName,
        lastName,
        company: faker.company.name(),
        address: faker.location.streetAddress(),
        address2: faker.location.streetAddress(),
        country: faker.helpers.arrayElement(SIGNUP_COUNTRIES),
        state: faker.location.state(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        mobileNumber: faker.string.numeric(10),
        day: birthdate.getDate(),
        month: birthdate.getMonth() + 1,
        year: birthdate.getFullYear(),
    };
}

const DEFAULT_ARTIFACT_PATH = path.join(process.cwd(), 'data', paths.registeredUserFileName);

export function saveUserData(data: StoredUserData, filePath: string = DEFAULT_ARTIFACT_PATH): void {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
