
import { increment, arrayUnion, arrayRemove } from 'firebase/firestore'
import { getSingleFirestoreSubDocument } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'
import { updateFirestoreSubDocument } from '@/firebase/firestore/edit'
import { useUser } from '@/composables/auth/user'




export const useUpdateBoardFeedback = () => {
	const feedback = ref({} as any)
    const loading = ref(false)
    const { currentUserId } = useUser()

    const upVote = async (board_id: string, feedback_id: string) => {
        await updateFirestoreSubDocument('boards', board_id, 'feedbacks', feedback_id, { upvotes: increment(1), updated_at: new Date().toISOString(), upvote_ids: arrayUnion(currentUserId.value) })
    }
    const downVote = async (board_id: string, feedback_id: string) => {
        await updateFirestoreSubDocument('boards', board_id, 'feedbacks', feedback_id, { upvotes: increment(-1), updated_at: new Date().toISOString(), upvote_ids: arrayRemove(currentUserId.value) })
    }

	return { loading, feedback, upVote, downVote }
}

