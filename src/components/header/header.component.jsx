import React from "react";
// import { Link } from "react-router-dom";
import { connect } from 'react-redux'; //this is a higher order component that lets you modify the component to have access to redux
//higher order components are funcitons that take components as args and reutns a new suped-up component.

import { createStructuredSelector } from 'reselect';

import { auth } from "../../firebase/firebase.utils";

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUSer } from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from "../../assets/crown.svg";

// import "./header.styles.scss";

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv } from './header.styles'

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to="/shop">
        SHOP
      </OptionLink>
      <OptionLink to="/shop">
        CONTACT
      </OptionLink>
      {currentUser ? (
        <OptionDiv onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionDiv> 
        // could also be <OptionLink as='div>, as={ReactComponent}, etc instead of creating two diff consts
      ) : (
        <OptionLink to="/signin">
          SIGN IN
        </OptionLink>
      )}

      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

//mapStateToProps means put(map) the current app state as a prop to the component
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUSer,
  hidden: selectCartHidden
}) //advance destructuring. From state, destructure user and from user, destructure currentUser...

//pass mapStateToProps to the component via connect() so the component can have access to this.props.currentUser

export default connect(mapStateToProps)(Header);
