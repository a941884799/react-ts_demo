/** @format */
import {batch} from 'react-redux'
// todos
const ADD_TODO = 'ADD_TODO'

// counter
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'

export const add = async (dispatch, getState) => {
  await new Promise(resolve => setTimeout(() => resolve(dispatch({type: INCREMENT})), 1000))
  batch(async () => {
    dispatch({type: INCREMENT})
    dispatch({type: INCREMENT})
    dispatch({type: ADD_TODO, text: getState().counter})
  })
}

export const Types = {
  ADD_TODO,
  INCREMENT,
  DECREMENT,
}
