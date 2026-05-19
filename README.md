# 🚀 Mission: workflow for E@E Automation
## End-to-End Test Automation — Playwright MCP + Jira MCP

![Playwright Tests](https://github.com/gajerabrijesh11/GIT-JIRA-MCP-Playwright/actions/workflows/playwright.yml/badge.svg)

## 🎯 What this project does
A fully AI-powered test automation pipeline that:
- Reads requirements directly from **Jira** using MCP
- Uses **Claude AI** to automatically generate Playwright test code
- Executes tests on real browsers using **Playwright MCP**
- Generates beautiful **Allure reports** with screenshots
- Runs automatically on every code push via **GitHub Actions CI/CD**

## 🛠️ Tech Stack
| Tool | Purpose |
|---|---|
| Playwright | Browser automation & testing |
| Jira MCP | AI reads requirements from Jira |
| Playwright MCP | AI controls live browser |
| Claude AI | Generates test code automatically |
| Allure Report | Beautiful visual test reports |
| GitHub Actions | Automated CI/CD pipeline |

## 🏃 How to run locally

### Install dependencies
npm install
npx playwright install chromium

### Run tests
npm test

### Run tests + open Allure report
npm run test:report

## 📊 Test Reports
Download the latest Allure report from the Actions tab artifacts section.

## 🔄 CI/CD Pipeline
Every push to main branch automatically:
1. Installs all dependencies
2. Runs all Playwright tests on Ubuntu
3. Generates Allure report
4. Uploads report as downloadable artifact

## 👨‍💻 Author
Brijesh Gajera — Built as part of AI-powered QA automation learning