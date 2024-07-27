
import { increment, arrayUnion, arrayRemove } from 'firebase/firestore'
import { getSingleFirestoreSubDocument } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'
import { updateFirestoreSubDocument } from '@/firebase/firestore/edit'
import { useUser } from '@/composables/auth/user'


const statusKeys = ref([
	{ name: 'New', value: 'NEW' },
	{ name: 'in Progress', value: 'IN_PROGRESS' },
	{ name: 'Completed', value: 'COMPLETED' },
	{ name: 'Closed', value: 'CLOSED' }
])



export const useUpdateBoardFeedback = () => {
	const feedback = ref({} as any)
    const loading = ref(false)
    const { currentUserId } = useUser()

    const upVote = async (board_id: string, feedback_id: string) => {
        loading.value = true
        await updateFirestoreSubDocument('boards', board_id, 'feedbacks', feedback_id, { upvotes: increment(1), updated_at: new Date().toISOString(), upvote_ids: arrayUnion(currentUserId.value) })
        loading.value = false
    }
    const downVote = async (board_id: string, feedback_id: string) => {
        loading.value = true
        await updateFirestoreSubDocument('boards', board_id, 'feedbacks', feedback_id, { upvotes: increment(-1), updated_at: new Date().toISOString(), upvote_ids: arrayRemove(currentUserId.value) })
        loading.value = false
    }

    const updateStatus = async (board_id: string, feedback_id: string, status: string) => {
        loading.value = true
        await updateFirestoreSubDocument('boards', board_id, 'feedbacks', feedback_id, { status, updated_at: new Date().toISOString() })
        useAlert().openAlert({ type: 'SUCCESS', msg: 'Status Updated', addrs: 'updateStatus' })
        loading.value = false
    }

    const onStatusChange = (e: Event, board_id, feedback_id) => {
	const target = e.target as HTMLSelectElement
	const status = target.value
	updateStatus(board_id, feedback_id, status)
}

	return { loading, feedback, upVote, downVote, statusKeys, updateStatus, onStatusChange }
}

