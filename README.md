# 🚀 Mission: Impress HR
## End-to-End Test Automation — Playwright MCP + Jira MCP + POM Framework


---

## 🎯 What this project does

A fully **AI-powered, industry-standard test automation framework** that:

- 📋 Reads requirements directly from **Jira** using MCP (Model Context Protocol)
- 🤖 Uses **Claude AI** to automatically generate Playwright test code from Jira stories
- 🌐 Executes tests on real browsers using **Playwright MCP**
- 🏗️ Follows **Page Object Model (POM)** — industry standard framework design
- 📊 Generates beautiful **Allure reports** with screenshots and traces
- ⚙️ Runs automatically on every code push via **GitHub Actions CI/CD**

---

## 🏗️ Framework Architecture (POM)

```
GIT-JIRA-MCP-Playwright/
│
├── tests/                              ← 1 test file per Jira ticket
│   ├── SCRUM-5_open_login_page.spec.ts
│   ├── SCRUM-6_enter_credentials.spec.ts
│   └── SCRUM-7_click_login_button.spec.ts
│
├── pages/                              ← Page Object classes
│   ├── BasePage.ts                     ← Reusable methods for ALL pages
│   └── LoginPage.ts                    ← Login selectors, actions & assertions
│
├── test-data/                          ← Centralized test data
│   └── loginData.ts                    ← All credentials & test inputs
│
├── utils/                              ← Reusable utilities
│   ├── fixtures.ts                     ← Custom Playwright fixtures
│   └── helpers.ts                      ← Generic helper functions
│
├── .github/
│   └── workflows/
│       └── playwright.yml              ← GitHub Actions CI/CD pipeline
│
├── playwright.config.ts                ← Central config (baseURL, reporters)
├── run-tests.js                        ← Smart test runner (always opens report)
└── package.json
```

---

## 🛠️ Tech Stack

| Tool | Purpose | Version |
|---|---|---|
| **Playwright** | Browser automation & testing | Latest |
| **TypeScript** | Type-safe test code | Latest |
| **Jira MCP** | AI reads requirements from Jira | Latest |
| **Playwright MCP** | AI controls live browser | Latest |
| **Claude AI** | Generates test code from Jira stories | Sonnet |
| **Allure Report** | Beautiful visual test reports | 2.x |
| **GitHub Actions** | Automated CI/CD pipeline | Latest |
| **Node.js** | Runtime | v22 |

---

## 🏆 POM Design Principles followed

| Principle | Implementation |
|---|---|
| **1 Jira ticket = 1 test file** | SCRUM-5, SCRUM-6, SCRUM-7 are separate files |
| **No selectors in test files** | All selectors live in `pages/LoginPage.ts` |
| **No assertions in test files** | All assertions are methods in page classes |
| **Central base URL** | Set once in `playwright.config.ts` |
| **Reusable methods** | `loginWith()`, `dismissCookieBanner()` etc |
| **Custom fixtures** | `loginPage` auto-injected via `fixtures.ts` |
| **Central test data** | All data in `test-data/loginData.ts` |
| **Base class inheritance** | `LoginPage extends BasePage` |

---

## 🏃 How to run locally

### Prerequisites
- Node.js v18+
- Git

### Install dependencies
```bash
npm install
npx playwright install chromium
```

### Run all tests
```bash
npm test
```

### Run tests + open Allure report automatically
```bash
npm run test:report
```

### Run specific test file
```bash
npx playwright test tests/SCRUM-5_open_login_page.spec.ts --project=chromium
```

### Run in headed mode (watch browser)
```bash
npx playwright test --headed
```

### Run in debug mode
```bash
npx playwright test --debug
```

### Open Playwright UI mode
```bash
npm run test:ui
```

---

## 📊 Test Coverage

| Jira Story | Test File | Test Cases |
|---|---|---|
| SCRUM-5 · Open login page | `SCRUM-5_open_login_page.spec.ts` | TC001, TC002, TC003 |
| SCRUM-6 · Enter credentials | `SCRUM-6_enter_credentials.spec.ts` | TC004 – TC009 |
| SCRUM-7 · Click login button | `SCRUM-7_click_login_button.spec.ts` | TC010 – TC013 |

**Total: 13 test cases across 3 Jira stories**

---

## 🔄 CI/CD Pipeline

Every push to `main` branch automatically:

1. ✅ Checks out the code
2. ✅ Sets up Node.js v22
3. ✅ Installs all dependencies
4. ✅ Installs Playwright Chromium browser
5. ✅ Runs all 13 Playwright tests
6. ✅ Generates Allure report
7. ✅ Uploads report as downloadable artifact (kept 30 days)

### View latest test run
👉 [GitHub Actions](https://github.com/gajerabrijesh11/GIT-JIRA-MCP-Playwright/actions)

---

## 🤖 How AI generates tests (The wow factor)

1. Claude AI reads Jira stories via **Jira MCP**
2. Claude opens a real browser via **Playwright MCP**
3. Claude inspects the live website's DOM and finds selectors
4. Claude generates complete POM-structured TypeScript test code
5. Tests are saved, run, and results pushed back to Jira automatically

**Zero manual test writing involved!**

---

## 📁 Reports & Artifacts

After every test run you get:

| Artifact | Location | Contents |
|---|---|---|
| Allure Report | `allure-report/` | Charts, steps, screenshots |
| Playwright Report | `playwright-report/` | Pass/fail, traces, videos |
| Screenshots | `test-results/` | Captured on failures |

---

## 👨‍💻 Author

**Brijesh Gajera**
Built as part of AI-powered QA automation learning — Mission: Self learning 🚀

---
