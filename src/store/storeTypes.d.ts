/** @format */

declare namespace storeTypes {
  type action = {
    type: string
    [propName in string]: string
  }
  type ReducerType = (state: any, action: action) => any
}
