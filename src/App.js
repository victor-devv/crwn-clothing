import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'; //this is a higher order component that lets you modify the component to have access to redux
//higher order components are functions that take components as args and returns a new suped-up component.
import { createStructuredSelector } from "reselect";

//components
import Header from "./components/header/header.component";

//pages
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

//firebase
// , addCollectionAndDocuments 
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

//redux
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
// import { selectCollectionsForPreview } from "./redux/shop/shop.selectors";

//styles
import "./App.css";

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    //Add shop data programmatically to firestore
    //, collectionsArray
    const {setCurrentUser} = this.props;
    
    //using the auth library, whenever the authentication state changes, pass us the user auth object and we
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //if user is authenticated ... else
      if (userAuth) {

        //pass userAuth into the create user profile method, use the object to query the user document, check if the user exists, and create one if it doesnt
        const userRef = await createUserProfileDocument(userAuth);

        //onSnapshot checks whenever the document object snapshot changes based on crud probably, itll pass the snapsht to the method to set the current user in the redux reducer
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      
      setCurrentUser(userAuth);
      // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({ title, items })));
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
          <Route exact path="/checkout" component={CheckoutPage} />
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
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

//pass mapStateToProps to the component via connect() so the component can have access to this.props.currentUser
export default connect(mapStateToProps, mapDispatchToProps)(App);
