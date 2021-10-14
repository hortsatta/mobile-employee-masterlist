import { firebase, firestore} from 'config/firebase';

// Batch adding of documents to db.
const addCollectionAndDocuments = async (
  collectionKey: string,
  objectsToAdd: Record<string, unknown>[]
): Promise<void> => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    // Get a new doc with generated id
    // Add to batch for single firebase communication
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return batch.commit();
};

const getDateFromTimestamp = ({ seconds, nanoseconds }: {
  seconds: number,
  nanoseconds: number
}): Date => (
  new firebase.firestore.Timestamp(seconds, nanoseconds).toDate()
);

export { addCollectionAndDocuments, getDateFromTimestamp };
