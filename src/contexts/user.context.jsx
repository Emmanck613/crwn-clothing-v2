import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener, signOutUser, createUserDocumentFromAuth } from "../utils/firebase/firebase.util";

///actual value to access
export const UserContext = createContext( {
    currentUser: null,
    setCurrentUser: () => null,
})

//Provider recieves the contextual value
//Allows any of its child component to access the values inside useState
export const UserProvider = ( { children } ) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => { //returns function that stops listening
            if(user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user); //we set the value to authchange
        })
        return unsubscribe;
    }, []);
    
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

