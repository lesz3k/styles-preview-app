import {createStore, combineReducers, applyMiddleware} from 'redux'
import {compType, singleView, listView} from './reducers'
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
  (combineReducers({compType, singleView, listView}),
  /*(localStorage['redux-store']) ?
  JSON.parse(localStorage['redux-store']) : stateData)*/
  stateData)


export default storeFactory