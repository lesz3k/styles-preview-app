import C from './constants';
//import { v4 } from 'uuid';

export const changeStyle = (compName, list, arr, classNames, title, subtitle, text, img) =>
({
  type:C.CHANGE_STYLE,
  compName,
  classNames,
  title,
  subtitle,
  text,
  img,
  arr,
  list //true or false
})

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
