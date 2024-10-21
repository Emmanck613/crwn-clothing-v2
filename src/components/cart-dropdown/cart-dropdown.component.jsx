import Button from '../button/button.component';

import { useNavigate } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';

import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import {
  CartDropownContainer, 
  EmptyMessage, 
  CartItems
} from './cart-dropdown.styles';


const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckout = () => {
      navigate('/checkout');
    };

    return (
        <CartDropownContainer>
          <cartItems>
            {
              cartItems.length ? (cartItems.map((item) => (
                <CartItem key={item.id} cartItem={item} />
              ))) : (
                <EmptyMessage>Your Cart is Empty</EmptyMessage>
            )}
          </cartItems>
          <Button onClick={goToCheckout}>CHECKOUT</Button>
        </CartDropownContainer>
      );
};

export default CartDropdown;