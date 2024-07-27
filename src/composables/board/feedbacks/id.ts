
import { getSingleFirestoreSubDocument } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'



export const useFetchBoardFeedbackById = () => {
	const feedback = ref({} as any)
	const loading = ref(false)

		const fetchBoardFeedbackById = async (board:Record<string, any>, id:string) => {
        loading.value = true
        try {
			await getSingleFirestoreSubDocument('boards', board.id, 'feedbacks', id, feedback)
			loading.value = false
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'fetchBoardFeedbackById' })
		}
	}
	return { loading, feedback, fetchBoardFeedbackById }
}

