import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import storeFactory from './store/storeFactory';

window.addEventListener("DOMContentLoaded", function() {
  console.log('DOM loaded')
  setTimeout(function(){

    let overlay = document.createElement("div")
        overlay.id = 'overlay'
        document.body.appendChild(overlay)

    //helpers
    const find = (elem, el) => {
      return elem.querySelectorAll(el)[0] ? elem.querySelectorAll(el)[0] : false
    }
    const findText = (elem, el) => {
      return elem.querySelectorAll(el)[0] ? elem.querySelectorAll(el)[0].innerText : false
    }

    //create container elem for different styles
    let reactContainer = document.createElement("div")
        reactContainer.id = 'reactapp-container'
        reactContainer.className = 'react-container'
        document.body.appendChild(reactContainer)

    document.querySelectorAll('.content-tile').forEach(function(tile, i) {
      //get tile's data
      let tileData = {
        title : findText(tile,'h2'),
        subtitle : findText(tile,'.content-tile-subtitle'),
        text : find(tile,'.content-tile-text').innerHTML,
        img : find(tile,'img') ? find(tile,'img')['src'] : false,
        classNames: tile.classList
      }

      //create button container
      let buttonContainer = document.createElement("div")
          buttonContainer.id = 'button-container'
      let btn = document.createElement("button")
          buttonContainer.appendChild(btn)
          btn.innerHTML += 'Show styles';
          tile.appendChild(buttonContainer)

      let thisNode = document.getElementById('reactapp-container')
              //document.querySelectorAll('body').appendChild(overlay)
          btn.onclick = () => {
            const store = storeFactory()
            document.getElementById('overlay').className+='active'
            thisNode.className+=' active'
            ReactDOM.render(<App store={store} compName="contentTile" node={thisNode} {...tileData} />, thisNode);
          }

    });

    registerServiceWorker();

  }, 500);

}, false);
