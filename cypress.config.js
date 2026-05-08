const { defineConfig } = require("cypress");
const webpack = require("@cypress/webpack-preprocessor");
const path = require("path");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://teste-colmeia-qa.colmeia-corp.com/',
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: {
          resolve: {
            alias: {
              "@fixtures": path.resolve(__dirname, "cypress/fixtures"),
              "@pages": path.resolve(__dirname, "cypress/support/pages"),
              "@support": path.resolve(__dirname, "cypress/support"),
            },
          },
        },
      };
      on("file:preprocessor", webpack(options));
    },
  },
});