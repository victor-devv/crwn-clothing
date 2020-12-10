import { CartActionTypes } from "./cart.types";

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
  //payload is an optional property. also we don't need to pass any payload cos the state value is a boolean and the reducer sets the value to the opposite since its a TOGGLE action.
});

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
}); //this gets the item that we want to add to the cartItems array and it returns the new action type object which tells the reducer it wants to add an item (payload)
