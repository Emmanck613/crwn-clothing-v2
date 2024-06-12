import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains producToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
      );

    //if found, increment quantity
    if(existingCartItem){
        //if cartItem is the same one we are trying to add, return new cartItem
        return cartItems.map((cartItem) => 
        cartItem.id === productToAdd.id 
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem //if it is not the cartItem related to the productToAdd
        );
    }

    //return new array with modified cartitems/new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};


const deleteCartItem = (cartItems, productToDelete) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToDelete.id
      );

    //check if quantity is 1, if it is remove item from cart
    if(existingCartItem.quantity === 1){
        //filter the items that equal false. If the filter statement is true, keep the value
        //if cartItem id is not the one we want to remove, keep value
        return cartItems.filter(cartItem => cartItem.id != productToDelete.id);
    }

    //if cartItem is the same one we are trying to remove, give us a new object with the same
    //cart item property, except reduce by 1.
    return cartItems.map((cartItem) => 
    cartItem.id === productToDelete.id 
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem //if it is not the cartItem related to the productToAdd
    );
};


const clearCartItem = (cartItems, productToClear) => {
    //filter the items that equal false. If the filter statement is true, keep the value
    //if cartItem id is not the one we want to remove, keep value
    return cartItems.filter(cartItem => cartItem.id != productToClear.id);
};

///actual value to access
export const CartContext = createContext( {
    isCartOpen: false,
    setIsOpen: () => {},
    cartItems: [],
    addItemCart: () => {},
    cartCount: 0,
    deleteItemCart: () => {},
    clearItemCart: () => {},
    cartTotal: 0,
});

/*
We are storing a product and quantity inside cartItems
*/

//Provider recieves the contextual value
//Allows any of its child component to access the values inside useState
export const CartProvider = ( { children } ) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    //we are going to setCartItems to the newest up to date array
    const [cartItems, setCartItems] = useState([]);
    //counter for cart
    const [cartCount, setCounter] = useState(0);
    //Total cart
    const [cartTotal, setCartTotal] = useState(0);

    //counter
    useEffect(() => { //we use useEffect each time cartItem changes
       const newCartCount = cartItems.reduce((total, cartItem) =>
            total + cartItem.quantity, 0)
            setCounter(newCartCount);
    }, [cartItems]);

    //total
    useEffect(() => { //we use useEffect each time cartItem changes
        const newCartTotal = cartItems.reduce((total, cartItem) =>
             total + cartItem.quantity * cartItem.price, 0)
            setCartTotal(newCartTotal);
     }, [cartItems]);
    
   
    const addItemCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemCart = (productToDelete) => {
        setCartItems(deleteCartItem(cartItems, productToDelete));
    }

    const clearItemCart = (productToClear) => {
        setCartItems(clearCartItem(cartItems, productToClear));
    }


    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        cartItems, 
        addItemCart, 
        cartCount, 
        removeItemCart,
        clearItemCart,
        cartTotal,
    };
    
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

