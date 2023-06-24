import pino from 'pino'

import configuration from '~/config/configuration'

function getPino() {
  if (!configuration.production) {
    return pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    })
  }
  
  return pino({
    browser: {},
    level: 'debug',
    base: {
      env: process.env.NODE_ENV,
      revision: process.env.BUILD_COMMIT_SHA,
    },
  })
}

export default getPino()
