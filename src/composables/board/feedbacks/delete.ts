
import { deleteFirestoreSubCollectionDocument } from '@/firebase/firestore/delete'
import { useAlert } from '@/composables/core/notification'

import { useConfirmationModal } from '@/composables/core/confirmation'

const deleteFeedbackId = ref('')
const deleteBoardId = ref('')

export const useDeleteFeedback = () => {
	const loading = ref(false)


	const setDeleteFeedbackId = (board_id: string, feedback_id:string) => {
		deleteBoardId.value = board_id
		deleteFeedbackId.value = feedback_id
		useConfirmationModal().openAlert({ type: 'ERROR', desc: 'Are you sure you want to delete this feedback?', title: 'Delete Feedback', call_function: deleteFeedback, loading })
	}

	const deleteFeedback = async () => {
		loading.value = true
		try {
			await deleteFirestoreSubCollectionDocument('boards', deleteBoardId.value, 'feedbacks', deleteFeedbackId.value)
			loading.value = false
			useConfirmationModal().closeAlert()
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Feedback Deleted successfully' })
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
		}
	}

	return { loading, deleteFeedback, setDeleteFeedbackId }
}
