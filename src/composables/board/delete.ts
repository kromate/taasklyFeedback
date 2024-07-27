
import { deleteFirestoreDocument } from '@/firebase/firestore/delete'
import { useAlert } from '@/composables/core/notification'

import { useConfirmationModal } from '@/composables/core/confirmation'

const deleteBoardId = ref('')

export const useDeleteBoard = () => {
	const loading = ref(false)


	const setDeleteBoardId = (id: string) => {
		deleteBoardId.value = id
		useConfirmationModal().openAlert({ type: 'ERROR', desc: 'Are you sure you want to delete this board?', title: 'Delete Board', call_function: deleteBoard, loading })
	}

	const deleteBoard = async () => {
		loading.value = true
		try {
			await deleteFirestoreDocument('boards', deleteBoardId.value)
			loading.value = false
			useConfirmationModal().closeAlert()
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Board Deleted successfully', addrs: 'deleteBoard' })
			useRouter().push('/dashboard')
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'deleteBoard' })
		}
	}

	return { loading, deleteBoard, setDeleteBoardId }
}
