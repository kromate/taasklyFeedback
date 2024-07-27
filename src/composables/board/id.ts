
import { getSingleFirestoreDocument } from '@/firebase/firestore/fetch'
import { getFirestoreCollectionWithWhereQuery } from '@/firebase/firestore/query'
import { useAlert } from '@/composables/core/notification'



export const useFetchUserBoardById = () => {
	const board = ref({} as any)
	const loading = ref(false)
	const boardArr = ref([] as any[])

	const fetchUserBoardById = async (id: string) => {
		if (board.value.length > 0) return
		loading.value = true
		const type = useRoute().params.type

		if (type === 'b') {
			    try {
			await getSingleFirestoreDocument('boards', id, board)
			loading.value = false
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'fetchUserBoardById' })
		}
		} else {
			    try {
			await getFirestoreCollectionWithWhereQuery('boards', boardArr, { name: 'custom_link', operator: '==', value: id })
			if (boardArr.value.length > 0) {
				board.value = boardArr.value[0]
			} else {
				// throw createError({ statusCode: 404, statusMessage: 'Board Not Found' })
			}
			loading.value = false
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'fetchUserBoardById' })
		}
		}
	}
	return { loading, board, fetchUserBoardById }
}


export const useFetchUserDoashboardBoardById = () => {
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
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'fetchUserBoardById' })
		}
	}
	return { loading, board, fetchUserBoardById }
}

