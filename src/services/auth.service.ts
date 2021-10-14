import { firebase, auth } from 'config/firebase';
import { ErrorMessage } from 'helpers';
import { AuthCredential } from 'models';

const getAuthUser = async (): Promise<firebase.User | null> => (
  new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      resolve(user);
      unsubscribe();
    }, reject);
  })
);

const signInWithEmailAndPassword = async (credential: AuthCredential): Promise<firebase.User | null> => {
  const { email, password } = credential;

  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    return user;
  } catch (error) {
    throw new Error(ErrorMessage.SIGN_IN);
  }
};

const signOut = async (): Promise<void> => await auth.signOut();

export { getAuthUser, signInWithEmailAndPassword, signOut };
