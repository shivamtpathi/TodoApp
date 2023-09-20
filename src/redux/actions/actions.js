// import { ADD_ITEM, GET_ITEM } from "./actionType"

// export const get_item=(data)=>({
//     type:GET_ITEM,
//     payload:data
// })
// export const update_item=(data)=>({
//     type:GET_ITEM,
//     payload:data
// })
import { ADD_ITEM, GET_ITEM } from "./actionType";

export const get_item = (data) => ({
  type: GET_ITEM,
  payload: data,
});

