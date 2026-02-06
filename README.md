# Hays Challenge — Playwright

Test automation for [Automation Exercise](https://automationexercise.com): user signup (Task 1) with saved user data for later use (Task 2).

## Requirements

- Node.js 18+
- npm 8+

## Installation

```bash
npm install
npx playwright install
```

## Running tests

```bash
npx playwright test
```

Chromium only:

```bash
npx playwright test --project=chromium
```

View report after a run:

```bash
npx playwright show-report
```

## Project structure

| Path | Description |
|------|-------------|
| `tests/` | Test specs (e.g. signup scenario) |
| `pages/` | Page Object Model: LoginPage, SignupPage, AccountCreatedPage, HomePage |
| `utils/userData.ts` | Data generation (Faker) and save/load user helpers |
| `playwright.config.ts` | Playwright config and custom settings (metadata, paths) |
| `data/` | Artifacts: `registered-user.json` is written here after successful signup |

## Signup scenario (Task 1)

1. Open the login/signup page.
2. Enter name and email, proceed to the signup form.
3. Fill account and address details, create account.
4. Assert success message and logged-in state (Logged in as FirstName LastName).
5. Save user data to `data/registered-user.json` (name, email, password, etc.) for Task 2.

User data is generated with Faker; baseURL, consent popup timeout, and artifact filename are set in the config.
