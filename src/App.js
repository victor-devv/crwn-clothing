import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'; //this is a higher order component that lets you modify the component to have access to redux
//higher order components are functions that take components as args and returns a new suped-up component.
import { createStructuredSelector } from "reselect";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import { setCurrentUser } from './redux/user/user.actions';

import { selectCurrentUSer } from "./redux/user/user.selectors";

import "./App.css";

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;
    
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //if user is authenticated ... else
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />{" "}
          <Route path="/shop" component={ShopPage} />{" "}
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

//SINCE WE NEED THE CURRENT USER STATE TO KNOW WHETHER TO DISPLAY THE SIGNIN PAGE OR NOT, WE  NEED TO MAP THE STATE TO THE COMPONENT TO GET ACCESS TO THE USER OBJECT

//destructure user reducer from state
const mapStateToProps = createStructuredSelector({
  //return currentUser prop
  currentUser: selectCurrentUSer,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

//pass mapStateToProps to the component via connect() so the component can have access to this.props.currentUser
export default connect(mapStateToProps, mapDispatchToProps)(App);
