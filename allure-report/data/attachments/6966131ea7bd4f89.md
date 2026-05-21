# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> SCRUM-5 | User can open login page >> Login form section is visible on the page
- Location: tests\login.spec.ts:55:7

# Error details

```
Error: page.goto: net::ERR_ABORTED at https://www.automationexercise.com/login
Call log:
  - navigating to "https://www.automationexercise.com/login", waiting until "load"

```

```
Error: browserContext.close: Target page, context or browser has been closed
```