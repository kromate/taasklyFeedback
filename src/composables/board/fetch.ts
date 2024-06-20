
import { getFirestoreSubCollection } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'
import { getFirestoreCollectionWithWhereQuery } from '@/firebase/firestore/query'


export const useFetchShopReviews = () => {
	const reviews = ref([] as any)
	const loading = ref(false)

		const fetchShopReviews = async (id:string) => {
		if (reviews.value.length > 0) return
        loading.value = true
        try {
			await getFirestoreSubCollection('businesses', id, 'reviews', reviews)
			loading.value = false
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
		}
	}
	return { loading, reviews, fetchShopReviews }
}

