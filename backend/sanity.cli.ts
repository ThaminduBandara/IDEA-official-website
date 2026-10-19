import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'cqnl8ze1',
    dataset: 'production'
  },
  deployment: {
    appId: 'nct2cbsyhmsotirwtxyc5yoq',
    autoUpdates: false,
  },
})
