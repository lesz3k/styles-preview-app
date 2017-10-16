import storeFactory from './storeFactory'
import {changeStyle, addComponents, addCompName, changeSingleView, changeListView} from './actionCreators';

export const store = storeFactory(true)

//store.dispatch(removeComponent('b2'))
