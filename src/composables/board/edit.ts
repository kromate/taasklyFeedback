import { watchDebounced } from '@vueuse/core'
import { updateFirestoreDocument } from '@/firebase/firestore/edit'
import { getFirestoreCollectionWithWhereQuery } from '@/firebase/firestore/query'
import { useAlert } from '@/composables/core/notification'

const loading = ref(false)
const is_editing = ref(false)
const isTitleEditing = ref(false)
const isDescEditing = ref(false)

export const useEditBoard = () => {
    const isCustomLinkAvailable = ref(true)
    const custom_link = ref('')
    const editedTitle = ref('')
    const editedDesc = ref('')

    const updateCustomLink = (id: string) => {
        if (custom_link.value === '') {
            is_editing.value = false
            return
        }
        try {
        loading.value = true
        updateFirestoreDocument('boards', id, { custom_link: custom_link.value })
        is_editing.value = false
        useAlert().openAlert({ type: 'SUCCESS', msg: 'Board Updated successfully', addrs: 'updateCustomLink' })
        loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'updateCustomLink' })
        }
    }
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

    const updateBoardTitle = async (id: string, newTitle: string) => {
        if (!newTitle.trim()) return

        try {
            loading.value = true
            await updateFirestoreDocument('boards', id, { title: newTitle.trim() })
            isTitleEditing.value = false
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Title updated successfully', addrs: 'updateBoardTitle' })
        } catch (e: any) {
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'updateBoardTitle' })
        } finally {
            loading.value = false
        }
    }

    const updateBoardDesc = async (id: string, newDesc: string) => {
        if (!newDesc.trim()) return

        try {
            loading.value = true
            await updateFirestoreDocument('boards', id, { desc: newDesc.trim() })
            isDescEditing.value = false
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Description updated successfully', addrs: 'updateBoardDesc' })
        } catch (e: any) {
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'updateBoardDesc' })
        } finally {
            loading.value = false
        }
    }

    return {
        updateCustomLink,
        loading,
        custom_link,
        is_editing,
        isCustomLinkAvailable,
        isTitleEditing,
        isDescEditing,
        editedTitle,
        editedDesc,
        updateBoardTitle,
        updateBoardDesc
    }
}


