const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://job-portal-user-dev-skx7zw44dq-et.a.run.app",
    specPattern: "cypress/integration/**/*.spec.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // Implementasikan event listener jika diperlukan
    },
  },
});
