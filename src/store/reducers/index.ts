/** @format */
import {combineReducers} from 'redux'
import commonReducer from './common'

export default combineReducers(Object.assign(commonReducer))
