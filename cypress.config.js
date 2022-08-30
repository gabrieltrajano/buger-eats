const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    video: false,
    reporter: 'cypress-mochawesome-reporter',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'https://buger-eats.vercel.app',
    viewportWidth: 1366,
    viewportHeight: 768
  },
});
