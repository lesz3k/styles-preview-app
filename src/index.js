import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import storeFactory from './store/storeFactory';

window.addEventListener("DOMContentLoaded", ()=> {
  //console.log('DOM loaded')
  if( document.body.className.match('edit') )

      setTimeout(()=>{

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


        document.querySelectorAll('.content-tile').forEach((tile, i) => {

          //get tile's classNames array without 'section' and 'cq-elem' classes
          let classArr = () => [...tile.classList].filter(e =>
            e !== 'section' && e.indexOf('cq-element') === -1
          )

          //get direct path to the elem from the 'script' tag in edit mode beneath the tile
          let script = tile.getElementsByTagName('script'),
              itemPath = () => {
                if (script.length>0){
                  let text = script[0].innerText,
                      start_pos = text.indexOf('"path":"') + 8,
                      end_pos = text.indexOf('","dialog":"',start_pos),
                      path = text.substring(start_pos,end_pos)
                  return path
                }
                else {
                  return null
                }
              }

          //get tile's data
          let tileData = {
            title : findText(tile,'h2'),
            subtitle : findText(tile,'.content-tile-subtitle'),
            text : find(tile,'.content-tile-text').innerHTML,
            //img: find(tile,'img') ? find(tile,'img')['srcset'] : false,
            img : (() => {
                    if (find(tile,'img')){
                      if (find(tile,'img')['srcset']){
                        return find(tile,'img')['srcset']
                      }
                      if (find(tile,'img')['src']){
                        return find(tile,'img')['src']
                      }
                    }
                  })(),
            classNames: classArr(),
            itemPath: itemPath(),
            tileLink: find(tile,'figure > a') ? find(tile,'figure > a')['href'] : false
          }

          //create button container
          let buttonContainer = document.createElement("div")
              buttonContainer.id = 'button-container'
          let btn = document.createElement("button")
              buttonContainer.appendChild(btn)
              btn.innerHTML += 'Show styles';
              tile.appendChild(buttonContainer)

          let thisNode = document.getElementById('reactapp-container'),
              cqSideKick = find(document,'.cq-sidekick');

              btn.onclick = () => {
                const store = storeFactory()
                document.getElementById('overlay').className+='active'
                thisNode.className+=' active'
                ReactDOM.render(<App store={store} compName="contentTile" node={thisNode} {...tileData} />, thisNode)

                cqSideKick ? cqSideKick.setAttribute("style", "visibility:hidden;opacity:0;") : false
              }

        });



//===================********************************* TEXT COMPONENT START***************************************===================//

        document.querySelectorAll('.text').forEach((tile, i) => {

          //get tile's classNames array without 'section' and 'cq-elem' classes
          let classArr = () => [...tile.classList].filter(e =>
            e !== 'section' && e.indexOf('cq-element') === -1
          )

          //get direct path to the elem from the 'script' tag in edit mode beneath the tile
          let script = tile.getElementsByTagName('script'),
              itemPath = () => {
                if (script.length>0){
                  let text = script[0].innerText,
                      start_pos = text.indexOf('"path":"') + 8,
                      end_pos = text.indexOf('","dialog":"',start_pos),
                      path = text.substring(start_pos,end_pos)
                  return path
                }
                else {
                  return null
                }
              }

          //get tile's data
          let tileData = {
            text : tile.innerHTML,
            classNames: classArr(),
            itemPath: itemPath(),
            tileLink: find(tile,'figure > a') ? find(tile,'figure > a')['href'] : false
          }

          //create button container
          let buttonContainer = document.createElement("div")
              buttonContainer.id = 'button-container'
          let btn = document.createElement("button")
              buttonContainer.appendChild(btn)
              btn.innerHTML += 'Show styles';
              tile.appendChild(buttonContainer)

          let thisNode = document.getElementById('reactapp-container'),
              cqSideKick = find(document,'.cq-sidekick');

              btn.onclick = () => {
                const store = storeFactory()
                document.getElementById('overlay').className+='active'
                thisNode.className+=' active'
                ReactDOM.render(<App store={store} compName="text" node={thisNode} {...tileData} />, thisNode)

                cqSideKick ? cqSideKick.setAttribute("style", "visibility:hidden;opacity:0;") : false
              }

        });
//===================********************************* TEXT COMPONENT END***************************************===================//


        registerServiceWorker();

      }, 500);




}, false);
