const { execSync } = require('child_process');

console.log('🚀 Running Playwright tests...');

// Run tests - don't stop even if they fail
try {
  execSync('npx playwright test', { stdio: 'inherit' });
  console.log('✅ All tests passed!');
} catch (e) {
  console.log('⚠️ Some tests failed - but generating report anyway!');
}

// Always generate and open report
console.log('📊 Generating Allure report...');
execSync('allure generate allure-results --clean -o allure-report', { stdio: 'inherit' });

console.log('🌐 Opening report in browser...');
execSync('allure open allure-report', { stdio: 'inherit' });