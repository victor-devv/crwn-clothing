import React from 'react';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

// import {
//   firestore,
//   convertCollectionsSnapshotToMap,
// } from "../../firebase/firebase.utils";

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded,
} from "../../redux/shop/shop.selectors";

// import { updateCollections } from "../../redux/shop/shop.actions";

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component {

  // unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
    // console.log(errorMessage);

    // const { updateCollections } = this.props;
    // const collectionRef = firestore.collection("collections");

    //whenever this code gets run for the first time or whenever the collection ref updates

    //OBSERVER + OBSERVABLE PATTERN / METHOD
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
    //   async (snapShot) => {
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
    //     updateCollections(collectionsMap);
    //     this.setState({ loading: false });
    //   }
    // );

    //PROMISE PATTERN / METHOD
    //the only caveat to using this promise method is that the only time we will get new collections data is when we remount  this component. It doesn't use the live update stram style that the observables pattern provides. 
    // this.unsubscribeFromSnapshot = collectionRef.get().then(snapShot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });

    //FETCH API METHOD
    //This code is just to show you how it works. The values are too nested here in firebase so we wont waste our time. But this method is useful when we are calling an API of some sort.
    // fetch(
    //   "https://firestore.googleapis.com/v1/projects/crwn-db-25327/databases/(default)/documents/collections"
    // )
    //   .then(response => response.json())
    //   .then(collections => console.log(collections));
  }

  // componentWillUnmount() {
  //   this.unsubscribeFromSnapshot();
  // }

  render() {
    const { match, isCollectionFetching, isCollectionsLoaded } = this.props;
    // const { loading } = this.state;

    return (
      <div className="shop-page">
        {/* <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} /> */}
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner
              isLoading={isCollectionFetching}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner
              isLoading={!isCollectionsLoaded}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded,
});


const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});


export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
