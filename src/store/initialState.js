let storage = sessionStorage.getItem("designerTemplate")

const stateData = {
    compType : 'default',
    loggedAsDesigner: (storage == 'editor') ? false : true,
    itemPath: '',
    listView: [],
    singleView : {},
    styleChangeAEMresponse: {
      error:false,
      succcess:false
    },
    showLoadingIcon: false
}

//const testing = objectPath.del(stateData.components, [0, 'col1', 1]);

//console.log(testing)

export default stateData
