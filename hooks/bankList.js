import firebase, { db } from './firebase';
import {getFirestore, getDocs, collection} from 'firebase/firestore';

async function AccountList () {
    const accountsCol = collection(db, 'users.accounts');
    console.log(accountsCol);
    const account = await getDocs(accountsCol);
    const accountList = account.docs.map(doc => doc.data());
    return accountList;
}

export default AccountList;