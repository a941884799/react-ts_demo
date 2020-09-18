/** @format */

declare namespace storeTypes {
  type action = {
    type: string
    [propName in string]: string
  }
  type Reducer = (state: any, action: action) => any
}
