
import { getSingleFirestoreSubDocument } from '@/firebase/firestore/fetch'
import { getFirestoreCollectionWithWhereQuery } from '@/firebase/firestore/query'
import { useAlert } from '@/composables/core/notification'



const currentCustomerId = ref('')
const customerIdDetails = ref({} as Record<string, any>)
const customerOrders = ref([] as Record<string, any>[])

export const useFetchCustomerById = () => {
    const selectedBusiness = ''
    const loading = ref(false)

     const business_id = selectedBusiness
    const fetchCustomerById = async (loadOrders = false) => {
        loading.value = true
        try {
            const customer = ref()
                await getSingleFirestoreSubDocument('businesses', business_id, 'customers', currentCustomerId.value, customer)
            if (customer) customerIdDetails.value = customer.value
            else customerIdDetails.value = {}
            if (loadOrders) await fetchCustomerOrdersById()
            loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: '' })
        }
    }

    const fetchCustomerOrdersById = async () => {
        loading.value = true
        try {
            await getFirestoreCollectionWithWhereQuery('orders', customerOrders, { name: 'business_id', operator: '==', value: business_id }, { name: 'customer_id', operator: '==', value: currentCustomerId.value })
            loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: '' })
        }
    }

    return { fetchCustomerById, customerIdDetails, loading, currentCustomerId, fetchCustomerOrdersById, customerOrders }
}

