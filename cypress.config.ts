import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
  viewportWidth: 1280,
  viewportHeight: 800,
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
