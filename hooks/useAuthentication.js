import React from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth();

export function useAuthentication () {
    const [user, setUser] = React.useState(undefined);

    React.useEffect(() => {
        const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser("none pulled")
            }
        })

        return unsubscribeFromAuthStatusChanged;
    }, [])
    
    return user;
}
