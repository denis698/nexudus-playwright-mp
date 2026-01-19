## To Install and run Playwright Tests ⚡
1. - run: npm install    
   - run: npm install --save dotenv
   - run: npm i -D monocart-reporter
   - run: npx playwright install --with-deps
   - run: npm install -D @playwright/test@latest
2. run tests: npm test:chrome
    - i.e. npx playwright test -g"@smoke" --project="firefox"
