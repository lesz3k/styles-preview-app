import {createStore, combineReducers, applyMiddleware} from 'redux'
import {compType, itemPath, singleView, listView, styleChangeAEMresponse, showLoadingIcon} from './reducers'
import stateData from './initialState'

const logger = store => next => action => {
  let result
  console.groupCollapsed("dispatching", action.type)
  console.log(' prev state', store.getState())
  console.log(' action', action)
  result = next(action)
  console.log(' next state', store.getState())
  console.groupEnd()
}

const saver = store => next => action => {
  let result = next(action)
  localStorage['redux-store'] = JSON.stringify(store.getState())
  return result
}

const storeFactory = (initialState = stateData) =>
  applyMiddleware(logger, saver)(createStore)
  (combineReducers({compType, itemPath, singleView, listView, styleChangeAEMresponse, showLoadingIcon}),stateData)
  /*(localStorage['redux-store']) ?
  JSON.parse(localStorage['redux-store']) : stateData)*/



export default storeFactory
