import { buildLegacyTheme } from 'sanity'

export const ideaTheme = buildLegacyTheme({
  /* Brand colors */
  '--brand-primary': '#00684a',

  /* Top Navigation Bar: Branded Dark Forest Green with crisp white text */
  '--main-navigation-color': '#043927',
  '--main-navigation-color--inverted': '#ffffff',

  /* Component background & text */
  '--component-bg': '#ffffff',
  '--component-text-color': '#0f172a',

  /* Default button colors */
  '--default-button-color': '#64748b',
  '--default-button-primary-color': '#00684a',
  '--default-button-success-color': '#059669',
  '--default-button-warning-color': '#d97706',
  '--default-button-danger-color': '#dc2626',

  /* State colors */
  '--state-info-color': '#00684a',
  '--state-success-color': '#059669',
  '--state-warning-color': '#d97706',
  '--state-danger-color': '#dc2626',

  /* Focus outline color: Emerald focus ring when clicking into text fields */
  '--focus-color': '#00684a',
})
