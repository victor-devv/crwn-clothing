import { UserActionTypes } from "./user.types";

// state is passed by the redux store when an action is fired, and the state would be what the state is currently when the action gets fired.

// For the first action, there would be no state, so we need to set the initial state, which would be an object that reps the initial state of this reducer
const INITIAL_STATE = {
  currentUser: null,
};


const userReducer = (state = INITIAL_STATE, action) => {
  // we need to return the actual state we want based on whatever action
  // note that every single reducer gets every action that ever gets fired even if they aren't related to the reducer. This is why we set a default state to return when no action we want for the reudcer is sent.

  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
// then import in root reducer