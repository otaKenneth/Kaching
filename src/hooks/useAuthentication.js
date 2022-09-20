import React from 'react';
import firebase from '@app/api/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

const useAuthentication = () => {
    const [user, setUser] = React.useState(undefined);

    React.useEffect(() => {
        const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null);
            }
        })

        return unsubscribeFromAuthStatusChanged;
    }, [])

    return user;
};

export default useAuthentication;