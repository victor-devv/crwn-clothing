import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'; //this is a higher order component that lets you modify the component to have access to redux
//higher order components are funcitons that take components as args and reutns a new suped-up component.

import { auth } from "../../firebase/firebase.utils";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import "./header.styles.scss";

const Header = ({ currentUser }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);

//mapStateToProps means put(map) the current app state as a prop to the component
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
}) //you can also destructure user from state and call user.currentUser directly instead of state.blah blah

//pass mapStateToProps to the component via connect() so the component can have access to this.props.currentUser

export default connect(mapStateToProps)(Header);
