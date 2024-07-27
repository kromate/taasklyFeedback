import { watchDebounced } from '@vueuse/core'
import { updateFirestoreDocument } from '@/firebase/firestore/edit'
import { getFirestoreCollectionWithWhereQuery } from '@/firebase/firestore/query'
import { useAlert } from '@/composables/core/notification'

const loading = ref(false)
const custom_link = ref('')
const is_editing = ref(false)

export const useEditBoard = () => {
    const updateCustomLink = (id: string) => {
        if (custom_link.value === '') {
            is_editing.value = false
            return
        }
        try {
        loading.value = true
        updateFirestoreDocument('boards', id, { custom_link: custom_link.value })
        is_editing.value = false
        useAlert().openAlert({ type: 'SUCCESS', msg: 'Board Updated successfully' })
        loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }

    return { updateCustomLink, loading, custom_link, is_editing }
}


export const useCheckCustomLink = () => {
	const isCustomLinkAvailable = ref(true)


	const checkCustomLink = async () => {
		loading.value = true
		custom_link.value = custom_link.value.replace(/ /g, '').toLowerCase()
        const exists = ref([])

			await getFirestoreCollectionWithWhereQuery('boards', exists, { name: 'custom_link', operator: '==', value: custom_link.value })


		if (exists.value.length > 0) {
			isCustomLinkAvailable.value = false
		} else {
			isCustomLinkAvailable.value = true
		}
		loading.value = false
	}

	watchDebounced(custom_link, checkCustomLink, { debounce: 500 })

	return { isCustomLinkAvailable, checkCustomLink, loading }
}

