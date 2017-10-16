import C from './constants'
import {store} from './store'
import stylesJSON from '../components/compStyles/compStyles'

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
            classNames: action.classNames
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
          layoutStyles = stylesJSON[compName].Layout

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


//console.log(sort(oldState, sortAction))
