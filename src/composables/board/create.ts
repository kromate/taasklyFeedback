import { v4 as uuidv4 } from 'uuid'
import { setFirestoreDocument } from '@/firebase/firestore/create'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'


const createReviewForm = {
    title: ref(''),
    desc: ref(''),
    created_at: ref(new Date().toISOString()),
    updated_at: ref(new Date().toISOString())
}


const resetForm = () => {
    createReviewForm.title.value = ''
    createReviewForm.desc.value = ''
}


export const useCreateBoard = () => {
    const { id: user_id, username, user, isLoggedIn, userProfile } = useUser()
    const loading = ref(false)
    const id = uuidv4()

    const create = async () => {
        loading.value = true
        const sentData = {
            ...convertObjWithRefToObj(createReviewForm),
            id,
            user: {
                user_id: user_id.value,
                phone: user.value?.phoneNumber || null,
                email: user.value?.email || null
            },
            userProfile: userProfile.value

        }

        try {
            loading.value = true
            const res = await setFirestoreDocument('boards', id, sentData)
            console.log(res)
            loading.value = false
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Board Created successfully' })
            // useRouter().push(`/main/shop/${data.username}`)
            resetForm()
        } catch (e: any) {
            console.log(e)
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }

    return { create, loading, createReviewForm }
}
