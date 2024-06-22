

import { getFirestoreSubCollection } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'



export const useFetchBoardFeedbacks = () => {
	const feedbacks = ref([] as any)
	const loading = ref(false)

		const fetchBoardFeedbacks = async (id:string) => {
		if (feedbacks.value.length > 0) return
        loading.value = true
        try {
			await getFirestoreSubCollection('boards', id, 'feedbacks', feedbacks)
			loading.value = false
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
		}
	}
	return { loading, feedbacks, fetchBoardFeedbacks }
}

