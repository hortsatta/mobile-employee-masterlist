import { firestore, FirestoreCollectionName } from 'config/firebase';
import { ErrorMessage } from 'helpers';
import { User, UserRole } from 'models';

const getUserById = async (id: string): Promise<User | null> => {
  try {
    const userSnapshot =
      await firestore.collection(FirestoreCollectionName.USERS).doc(id).get();

    const user: any = { ...userSnapshot.data(), id };
    return user;
  } catch (error) {
    throw new Error(ErrorMessage.SERVER);
  }
};

const getAllUserRoles = async (isActive = true): Promise<UserRole[]> => {
  try {
    const snapshots = await firestore
      .collection(FirestoreCollectionName.USER_ROLES)
      .where('isActive', '==', isActive)
      .orderBy('value')
      .get();

    const userRoles: any = snapshots.docs.map(snapshot => ({
      ...snapshot.data(),
      id: snapshot.id
    }));

    return userRoles;
  } catch (error) {
    throw new Error(ErrorMessage.SERVER);
  }
};

export { getUserById, getAllUserRoles };
