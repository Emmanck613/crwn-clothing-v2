import { createContext, useState, useEffect } from "react";

import SHOP_DATA from '../shop-data.js';

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.util.js";

///actual value to access
export const ProductsContext = createContext( {
    products: [],

})

//Provider recieves the contextual value
//Allows any of its child component to access the values inside useState
export const ProductsProvider = ( { children } ) => {
    const [products, setProducts] = useState([]);

    //allows us to add our shop-data.js object array into firestore
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    useEffect(() => {
        const getCategoriesMao = async () => {
           const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap); 
        }; 

        getCategoriesMao();        
    }, []);

    const value = { products};

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChangedListener((user) => { //returns function that stops listening
    //         if(user) {
    //             createUserDocumentFromAuth(user);
    //         }
    //         setCurrentUser(user); //we set the value to authchange
    //     })
    //     return unsubscribe;
    // }, []);
    
    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};

