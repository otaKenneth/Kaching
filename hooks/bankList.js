import app from './firebase';
import {getFirestore, getDocs, collection} from 'firebase/firestore/lite';

const db = getFirestore(app);

async function AccountList () {
    const accountsCol = collection(db, 'accounts');
    const account = await getDocs(accountsCol);
    const accountList = account.docs.map(doc => doc.data());
    return accountList;
}

export default AccountList;