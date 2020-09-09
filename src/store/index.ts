/** @format */

import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from '@store/reducers'

const composeEnhancers = window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middlewareEnhancer = applyMiddleware(thunk)

const store = createStore(reducers, composeEnhancers(middlewareEnhancer))

export default store
