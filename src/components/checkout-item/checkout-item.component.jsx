import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';


import './checkout-item.styles.scss';

export const CheckoutItem = ( {cartItem} ) => {
    const {name, imageUrl, price, quantity } = cartItem;

    const { clearItemCart, addItemCart, removeItemCart } = useContext(CartContext);

    const clearItemHandler = () => clearItemCart(cartItem);

    const addItem = () => addItemCart(cartItem);

    const removeItem = () => removeItemCart(cartItem);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}  />
            </div>
            <span className='name' > {name} </span>
            <div className='quantity' >
                <button className="arrow" onClick={removeItem}>
                    &#10094;
                </button>

                <span className='value'>{quantity}</span>

                <button className="arrow" onClick={addItem}>
                    &#10095;
                </button>
            </div>
            <span className='price' >{price}</span>
            <div className='remove-button' onClick={clearItemHandler} >
                &#10005;
            </div>
        </div>
    )
}

export default CheckoutItem;