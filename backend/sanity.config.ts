import {defineConfig, DocumentActionComponent} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {StudioIcon} from './StudioIcon'
import {ideaTheme} from './theme'

export default defineConfig({
  name: 'default',
  title: 'IDEA Official Website',

  // Custom Studio Icon (Replaces the generic red "IO" badge in the top bar)
  icon: StudioIcon,

  // Custom Brand Colors Theme
  theme: ideaTheme,

  projectId: 'cqnl8ze1',
  dataset: 'production',

  // Grouped Desk Structure with "Needs Review" Hub and Custom Icons
  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  // Role-Based Publishing Security: Only Administrators can publish to live
  document: {
    actions: (prev, context) => {
      const {currentUser} = context
      const isAdmin = currentUser?.roles?.some(
        (role: any) => role.name === 'administrator' || role.name === 'developer'
      )

      return prev.map((originalAction) => {
        if (originalAction.action === 'publish' && !isAdmin) {
          const RestrictedPublishAction: DocumentActionComponent = (props) => {
            const originalResult = originalAction(props)
            if (!originalResult) return null

            return {
              ...originalResult,
              disabled: true,
              title:
                '🔒 Publishing Locked: Only Administrators (Client / Manager) can publish to the live site. Please request approval.',
            }
          }
          return RestrictedPublishAction
        }
        return originalAction
      })
    },
  },
})
