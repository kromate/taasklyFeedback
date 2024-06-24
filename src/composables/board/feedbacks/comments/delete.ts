
import { increment, arrayRemove } from 'firebase/firestore'
import { deleteFirestoreSubSubCollectionDocument } from '@/firebase/firestore/delete'
import { useAlert } from '@/composables/core/notification'
import { updateFirestoreSubDocument } from '@/firebase/firestore/edit'

import { useConfirmationModal } from '@/composables/core/confirmation'

const deleteFeedbackId = ref('')
const deleteBoardId = ref('')
const deleteCommentId = ref('')

export const useDeleteComment = () => {
	const loading = ref(false)


	const setDeleteCommentId = (board_id: string, feedback_id:string, comment_id:string) => {
		deleteBoardId.value = board_id
		deleteFeedbackId.value = feedback_id
		deleteCommentId.value = comment_id
		useConfirmationModal().openAlert({ type: 'ERROR', desc: 'Are you sure you want to delete this comment?', title: 'Delete Comment', call_function: deleteComment, loading })
	}

	const deleteComment = async () => {
		loading.value = true
		try {
			await deleteFirestoreSubSubCollectionDocument('boards', deleteBoardId.value, 'feedbacks', deleteFeedbackId.value, 'comments', deleteCommentId.value)
			await updateFirestoreSubDocument('boards', deleteBoardId.value, 'feedbacks', deleteFeedbackId.value, { comment_count: increment(-1), updated_at: new Date().toISOString(), comment_ids: arrayRemove(deleteCommentId.value) })
			loading.value = false
			useConfirmationModal().closeAlert()
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Feedback Deleted successfully' })
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
		}
	}

	return { loading, deleteComment, setDeleteCommentId }
}
