import Router from './router'
window.Ago = Router

new Ago({mode: 'history'}, [
      {
        path: '/blog/:name', 
        handler: function(record){document.getElementsByClassName('view')[0].innerHTML=`<span>${record.params.name}</span>` ; return Promise.resolve(true)}
      },
      {
        path: '/', 
        handler: function(){document.getElementsByClassName('view')[0].innerHTML='<span>index</span>' ; return Promise.resolve(true)}
      },
    ])
