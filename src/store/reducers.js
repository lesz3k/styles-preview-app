import C from './constants'
import {store} from './store'
import stylesJSON from '../components/compStyles/compStyles'
import designerStylesJSON from '../components/compStyles/designerCompStyles'
import axios from 'axios'
import querystring from 'querystring'
import {setAEMresponse, showLoading} from './actionCreators'


let stylesReplace = (oldArr, oldClasses) => {
  let classNameArr = [...oldClasses]
  const newArr = classNameArr.reduce((total, amount) => {
    if (!oldArr.includes(amount)){
      total.push(amount)
    }
    return total;
  }, []);
  return newArr
}

export const component = (state={}, action)=> {
  switch (action.type) {
    case C.ADD_COMPONENTS:

      switch(action.compName){

        case 'contentTile' :
          return {
            title: action.title,
            subtitle: action.subtitle,
            text: action.text,
            img: action.img,
            classNames: action.classNames,
            tileLink: action.tileLink
          }

        case 'text' :
          return {
            text: action.text,
            classNames: action.classNames,
            tileLink: action.tileLink
          }

        default: return state
      }



    default: return state
  }
}

export const listView = (state=[], action)=> {
  switch (action.type) {
    case C.CHANGE_LIST_VIEW:

      let compName = store.getState().compType,
          //layoutStyles = stylesJSON[compName].Layout
          designer = store.getState().loggedAsDesigner,
          layoutStyles = designer ? designerStylesJSON[compName].Layout : stylesJSON[compName].Layout;

      if (!action.propsObject.isEmpty) {
        let oldClasses = action.propsObject.classNames,
            reducedClasses = stylesReplace(layoutStyles, oldClasses)

        //return component({}, action.propsObject)
        return layoutStyles.map(style =>{
            let newStyle = [...reducedClasses, style]

                return {
                  styleName:style,
                  component: component({}, {...action.propsObject, classNames: newStyle})
                }

        })
      }

      else {
        return state.map(comp =>{
          let oldClasses = comp.component.classNames,
              item = action.val.target.value,
              newArr = stylesReplace(action.arr, oldClasses)
          newArr.push(item)
          return {
            ...comp,
            component: {
              ...comp.component,
              classNames: newArr
            }
          }
        })


      }

    default: return state
  }
}

export const singleView = (state={}, action)=> {
  switch (action.type) {
    case C.CHANGE_SINGLE_VIEW:

      //return component({}, action)
      if (!action.propsObject.isEmpty) {
        return component({}, action.propsObject)
      }
      else {

        let oldObj = state,
            oldClasses = oldObj.classNames,
            item = action.val.target.value,
            newArr = stylesReplace(action.arr, oldClasses)
        newArr.push(item)

        return {
          ...oldObj,
          classNames:newArr
        }

      }

    default: return state
  }
}

export const compType = (state="default", action)=> {
  switch (action.type) {

    case C.ADD_COMP_NAME:

      return action.compName

    default: return state
  }
}

export const itemPath = (state='', action)=> {
  switch (action.type) {

    case C.ADD_ITEM_PATH:

      return action.itemPath

    case C.SET_AEM_STYLES:
      let itemPath = store.getState().itemPath
      console.log(action.styles)

      if(itemPath!==null){
        let newStyles = {'cq:cssClass':action.styles}
        axios.post(itemPath, querystring.stringify(newStyles))
        .then(function (response) {
          console.log(response);
          store.dispatch(setAEMresponse('success'))
          store.dispatch(showLoading(false))
        })
        .catch(function (error) {
          console.log(error);
          store.dispatch(setAEMresponse('fail'))
          store.dispatch(showLoading(false))
        });

      }
    default: return state
  }
}


export const styleChangeAEMresponse = (state={}, action)=> {
  switch (action.type) {

    case C.SET_AEM_RESPONSE:

      const success = {
        error:false,
        succcess:true
      },
      fail = {
        error:true,
        succcess:false
      },
      reset = {
        error:false,
        succcess:false
      }
      return action.response === 'success' ? success : action.response === 'fail' ? fail : reset




    default: return state
  }
}

export const showLoadingIcon = (state={}, action)=> {
  switch (action.type) {
    case C.SHOW_LOADING:
      return action.loading ? true : false

    default: return state
  }
}

export const loggedAsDesigner = (state='designer', action)=> {
  switch (action.type) {

    case C.LOG_AS_DESIGNER:

      //return action.logged
      return action.logged === 'editor' ? false : true

    default: return state
  }
}

//console.log(sort(oldState, sortAction))
