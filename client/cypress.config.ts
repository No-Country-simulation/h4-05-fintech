import { defineConfig } from 'cypress'
import fs from 'node:fs';

export default defineConfig({
  e2e: {
    supportFile: false,
    baseUrl: "http://localhost:9000",
    chromeWebSecurity: false,
    video: true,
    videoCompression: true,
    setupNodeEvents(on, _config) {
      on(
        'after:spec',
        (_spec: Cypress.Spec, results: CypressCommandLine.RunResult) => {
          if(results && results.video) {
            const failures = results.tests.some(test => 
              test.attempts.some(attempt => attempt.state === 'failed')
            )
            if (!failures) {
              fs.unlinkSync(results.video);
            }
          }
        }
      )
    }
  },
})