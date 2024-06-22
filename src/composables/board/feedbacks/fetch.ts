

import { getFirestoreSubCollection } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'

	const feedbacks = ref([] as any)
	const loading = ref(false)

export const useFetchBoardFeedbacks = () => {
	const fetchBoardFeedbacks = async (id: string) => {
			if (process.client) return

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

