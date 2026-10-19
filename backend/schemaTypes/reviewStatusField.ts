import { defineField } from 'sanity'
import { ReviewStatusInput } from '../ReviewStatusInput'

/**
 * Reusable Review & Approval Workflow field for Sanity Studio.
 * Allows employees to draft content and signal when it's ready for client review.
 */
export const reviewStatusField = defineField({
  name: 'reviewStatus',
  title: 'Workflow / Review Status',
  type: 'string',
  components: {
    input: ReviewStatusInput,
  },
  initialValue: 'inProgress',
  description:
    'Employees: Set to "Ready for Review" when finished. Client / Admin: Review content, set to "Approved", and click the green Publish button.',
})

/**
 * Helper to display the colored review status badge in Studio document lists.
 */
export const formatReviewStatusSubtitle = (
  reviewStatus?: string,
  extraSubtitle?: string
): string => {
  const map: Record<string, string> = {
    inProgress: '🟡 In Progress',
    readyForReview: '🟠 Ready for Review',
    approved: '🟢 Approved',
  }
  const badge = map[reviewStatus || ''] || '🟡 In Progress'
  return extraSubtitle ? `${badge} • ${extraSubtitle}` : badge
}
