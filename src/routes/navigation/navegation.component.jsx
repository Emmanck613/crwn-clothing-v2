import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {ReactComponent as CrwnLogo } from '../../assest/crown.svg';
import { UserContext } from "../../contexts/user.context";
import { CartContext } from '../../contexts/cart.context';

import { signOutUser } from "../../utils/firebase/firebase.util";

import { NavigationContainer, NavLink,NavLinks, LogoContainer } from "./navigation.styles";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    //display sign out link when sign in      
    const { isCartOpen} = useContext(CartContext);

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className="logo"></CrwnLogo>
            </LogoContainer>
            <NavLinks>
                <NavLink to='/shop '>
                    SHOP
                </NavLink>
                {
                    currentUser ? (//with as="span" we rendener the component style as a span
                        <NavLink as='span' onClick={signOutUser}>
                            SIGN OUT
                        </NavLink>
                    ) : (
                        <NavLink to='/auth'>
                            SIGN IN
                        </NavLink>
                    )
                }
                <CartIcon/>
            </NavLinks>
            {isCartOpen && <CartDropdown/> }
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    );
  };

  export default Navigation;