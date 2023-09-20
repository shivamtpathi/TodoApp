
import {  GET_ITEM } from "../actions/actionType";

const initialState = {
  items: [], // An array for managing a list of items
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEM:
      return {
       
        items: action.payload,
      };
    
    default:
      return state;
  }
};
