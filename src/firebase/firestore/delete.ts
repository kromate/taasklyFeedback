import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../init'

export const deleteFirestoreDocument = async (
	collection: string,
	id: string
) => {
	await deleteDoc(doc(db, collection, id))
}
export const deleteFirestoreSubCollectionDocument = async (
	collectionName: string,
	documentName: string,
	subCollectionName: string,
	id: string
) => {
	await deleteDoc(doc(db, collectionName, documentName, subCollectionName, id))
}

export const deleteFirestoreSubSubCollectionDocument = async(
	collectionName: string,
	documentName: string,
	subCollectionName: string,
	subDocumentName: string,
	subSubCollectionName: string,
	id: string
) => {
	await deleteDoc(doc(db, collectionName, documentName, subCollectionName, subDocumentName, subSubCollectionName, id))
}
