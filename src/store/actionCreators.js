import C from './constants';
import {store} from './store';
//import { v4 } from 'uuid';

export const changeSingleView = (propsObject, arr, val, compName, classNames, title, subtitle, text, img) =>
({
  type:C.CHANGE_SINGLE_VIEW,
  propsObject: {
    ...propsObject,
    type:C.ADD_COMPONENTS
  },
  arr,
  val,
  compName,
  classNames,
  title,
  subtitle,
  text,
  img
})

export const changeListView = (propsObject, arr, val, compName, classNames, title, subtitle, text, img) =>
({
  type:C.CHANGE_LIST_VIEW,
  propsObject: {
    ...propsObject,
    type:C.ADD_COMPONENTS
  },
  arr,
  val,
  compName,
  classNames,
  title,
  subtitle,
  text,
  img
})

export const addCompName = compName =>
({
  type: C.ADD_COMP_NAME,
  compName
})

export const addItemPath = itemPath =>
({
  type: C.ADD_ITEM_PATH,
  itemPath
})

export const setNewAEMstyle = styles =>
({
  type:C.SET_AEM_STYLES,
  styles
})

export const setAEMresponse = response =>
({
  type:C.SET_AEM_RESPONSE,
  response
})
