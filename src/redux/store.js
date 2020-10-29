import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

// add middlewares to catch actions. middlewares stand between action and root reducers and they are just functions that receive actions and do something with them and then pass them to the root reducer 
const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

// we spread the constant middlewares into applyMiddleware() cos we can decide to add another middleware to the middlewares array and it'll be passed into the function directly by spread. ApplyMiddleware takes an infinite number of middlewares (asides logger)

export default store;
