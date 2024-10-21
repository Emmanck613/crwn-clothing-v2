
import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import {ShoppingIcon, CartIconContainer, ItemCount} from './cart-icon.styles.jsx';

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    //we create a toggle option, where we check the sate of isCartOpen,
    const toggleCart = () => setIsCartOpen(!isCartOpen);

    return (
        <CartIconContainer  onClick={toggleCart}>
            <ShoppingIcon className='shopping-icon'></ShoppingIcon>
            <ItemCount >{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;