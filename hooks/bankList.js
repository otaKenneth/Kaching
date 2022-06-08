import app from './firebase';
import {getFirestore} from 'firebase/firestore/lite';

const db = getFirestore(app);

async function AccountList (db) {
    const accountsCol = collection(db, 'accounts');
    const account = await getDocs(accountsCol);
    const accountList = account.docs.map(doc => doc.data());
    return accountList;
}

export default AccountList;