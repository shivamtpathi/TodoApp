import { createStore,combineReducers } from "redux"
import { reducers } from "../reducer/reducers"

const rootReducer = combineReducers({
    newData: reducers, // Add your new reducer to the root state
    // ... Other reducers
  });
export const myStore=createStore(rootReducer)