import { useUser } from '@/composables/auth/user'

import { getFirestoreCollection } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'
import { getFirestoreCollectionWithWhereQuery } from '@/firebase/firestore/query'


export const useFetchUserBoards = () => {
	const { id } = useUser()
	const boards = ref([] as any)
	const loading = ref(false)

		const fetchUserBoards = async () => {
		if (boards.value.length > 0) return
        loading.value = true
        try {
			await getFirestoreCollectionWithWhereQuery('boards', boards, { name: 'user_id', operator: '==', value: id.value })
			loading.value = false
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
		}
	}
	return { loading, boards, fetchUserBoards }
}

