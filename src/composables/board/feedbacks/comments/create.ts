import { increment, arrayUnion } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { useIP } from '@/composables/core/ip'
import { setFirestoreSubSubDocument } from '@/firebase/firestore/create'
import { updateFirestoreSubDocument } from '@/firebase/firestore/edit'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'


const createCommentForm = {
    comment: ref('')
}


const resetForm = () => {
    createCommentForm.comment.value = ''
}


export const useCreateComment = () => {
    const { id: user_id, username, user, isLoggedIn, userProfile } = useUser()
    const loading = ref(false)



    const create = async (board_id:string, feedback_id:string) => {
        const identity_id = user_id.value || useIP().ip.value

            const id = uuidv4()

        loading.value = true
        const sentData = {
            ...convertObjWithRefToObj(createCommentForm),
            id,
            board_id,
            feedback_id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            user_name: user.value?.displayName || 'Anonymous',
            user_phone: user.value?.phoneNumber || null,
            user_email: user.value?.email || null,
            user_photo: user.value?.photoURL || null,
            user_id: identity_id
        }



        try {
            loading.value = true
            await Promise.all([
                await setFirestoreSubSubDocument('boards', board_id, 'feedbacks', feedback_id, 'comments', id, sentData)
            ])
    await updateFirestoreSubDocument('boards', board_id, 'feedbacks', feedback_id, { comment_count: increment(1), updated_at: new Date().toISOString(), comment_ids: arrayUnion(id) })
            loading.value = false
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Comment Created successfully', addrs: 'createComment' })
            resetForm()
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'createComment' })
        }
    }

    return { create, loading, createCommentForm }
}
