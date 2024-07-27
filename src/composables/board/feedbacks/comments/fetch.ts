

import { getFirestoreSubSubCollection } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'



export const useFetchFeadbackComments = () => {
	const comments = ref([] as any)
	const loading = ref(false)

		const fetchFeadbackComments = async (board_id:string, feedback_id:string) => {
		if (comments.value.length > 0) return
        loading.value = true
        try {
			await getFirestoreSubSubCollection('boards', board_id, 'feedbacks', feedback_id, 'comments', comments)
			loading.value = false
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'fetchFeadbackComments' })
		}
	}
	return { loading, comments, fetchFeadbackComments }
}

