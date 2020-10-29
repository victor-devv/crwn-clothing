import { UserActionTypes } from "./user.types";

// action files are just functions that return objects. Each object must be in the correct format that the action is expected to be in the reducer.

// this functoin takes one param (user) which can either be the user auth or user snapshot we create in firebase utils

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
