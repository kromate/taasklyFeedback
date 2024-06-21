
import { getSingleFirestoreDocument } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'



export const useFetchUserBoardById = () => {
	const board = ref({} as any)
	const loading = ref(false)

		const fetchUserBoardById = async (id:string) => {
		if (board.value.length > 0) return
        loading.value = true
        try {
			await getSingleFirestoreDocument('boards', id, board)
			loading.value = false
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
		}
	}
	return { loading, board, fetchUserBoardById }
}

