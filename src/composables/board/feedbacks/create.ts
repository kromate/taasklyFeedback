import { v4 as uuidv4 } from 'uuid'
import { setFirestoreSubDocument } from '@/firebase/firestore/create'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'


const createFeedbackForm = {
    title: ref(''),
    desc: ref(''),
    created_at: ref(new Date().toISOString()),
    updated_at: ref(new Date().toISOString())
}


const resetForm = () => {
    createFeedbackForm.title.value = ''
    createFeedbackForm.desc.value = ''
}


export const useCreateFeedback = () => {
    const { id: user_id, username, user, isLoggedIn, userProfile } = useUser()
    const loading = ref(false)


    const create = async (board_id:string) => {
            const id = uuidv4()
        loading.value = true
        const sentData = {
            ...convertObjWithRefToObj(createFeedbackForm),
            id,
            board_id,
            user_name: user.value?.displayName || 'Anonymous',
            user_phone: user.value?.phoneNumber || null,
            user_email: user.value?.email || null,
            user_photo: user.value?.photoURL || null,
            user_id: user_id.value,
            userProfile: userProfile.value,
            upvotes: 0,
            status: 'NEW',
            upvote_ids: [],
            comment_count: 0,
            comment_ids: []

        }

        try {
            loading.value = true
            const res = await setFirestoreSubDocument('boards', board_id, 'feedbacks', id, sentData)

            loading.value = false
            const type = useRoute().params.type as string
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Feedback Created successfully' })
            useRouter().push(`/${type}/${board_id}/${id}`)
            resetForm()
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }

    return { create, loading, createFeedbackForm }
}
