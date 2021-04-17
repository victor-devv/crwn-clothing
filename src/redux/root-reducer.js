// THIS REPS THE OVERALL REDUCERS

import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'

// For Local Storage
import storage from 'redux-persist/lib/storage'

// For session storage
// import storageSession from 'redux-persist/lib/storage/session'

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer"
import shopReducer from "./shop/shop.reducer"

// Define new persist config
const persistConfig = {
  key: 'root', //at what point inside the reducer do we wanna start storing
  storage, //could be storageSession
  whitelist: ['cart'] //array of reducers you wanna store
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
})

export default persistReducer(persistConfig, rootReducer)
