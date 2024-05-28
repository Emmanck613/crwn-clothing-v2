import { ReactComponent as Shoppingicon } from '../../assest/shopping-bag.svg';

import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './cart-icon.styles.scss';

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    //we create a toggle option, where we check the sate of isCartOpen,
    const toggleCart = () => setIsCartOpen(!isCartOpen);

    return (
        <div className='cart-icon-container' onClick={toggleCart}>
            <Shoppingicon className='shopping-icon'></Shoppingicon>
            <span className='item-count'>{cartCount}</span>
        </div>
    );
};

export default CartIcon;