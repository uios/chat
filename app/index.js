auth.config = {
  apiKey: "AIzaSyBxGXe52WtXo_B5iKBo9BQZSfAwYFhLRO8",
  authDomain: "uios-83649.firebaseapp.com",
  projectId: "uios-83649",
  messagingSenderId: "47824486713",
  appId: "1:47824486713:web:51f3a124b42b1080"
};

window.api = {
  endpoint: "https://api.uios.computer"
};

window.cdn = {
  endpoint: "https://cdn.uios.computer/file/share-uios"
};

window.is = {
    json: (text)=>{
        return /^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))
    }
    ,
    local: href=>href.contains(['127.0.0.1', 'about:', 'blob:', 'file:', 'localhost']),
    mobile: ()=>{
        return ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend"in document)
    }
    ,
    touch: ()=>{
        return (('ontouchstart'in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    }
};

window.webcam.constraints.horizontal.video['facingMode'] = "self";

window.onload = () => {
  
  window.dom = {
    body: document.body,
    boot: byId('boot'),
    footer: byId('body-footer')
  };
  
  dom.body.dataset.load = "ing";
  
  window.db.name = "database";
  window.db.schema = {};
  window.db.version = 0;
  window.db.version > 0
    ? window.db
    .open(window.db.name, window.db.version, window.db.schema)
    .then((e) => init())
  : init();
  
  console.log('window.onload',{dom});
  
}

function init() {

  //eruda.init();

  console.log("Initializing...");

  window.rout.ing = (href, GOT, n, m = GOT[n], root = GOT[0]) => {
    return m.includes("#") || (
      (root === 'chat' && n > 0) ||
      (root === 'room' && n === 1) ||
      (root === 'user' && n === 1)
    );
  };

  firebase.initializeApp(auth.config);

  dom.body.dataset.theme = "meridiem";

  touch.events = {
    dbltap: on.touch.dbltap,
    drag: on.touch.drag,
    press: on.touch.press,
    tap: on.touch.tap
  };
  dom.body.addEventListener("touchstart",touch.handler,{passive:true});
  dom.body.addEventListener("touchmove",touch.handler,{passive:true});
  dom.body.addEventListener("touchcancel",touch.handler,false);
  dom.body.addEventListener("touchend",touch.handler,false);

  (dom.boot.dataset.href ? dom.boot.dataset.href : window.location.pathname).router().then(e => {
    firebase.auth().onAuthStateChanged(user => {
      auth.change(user).then(e => {
        dom.body.dataset.load = "ed";
      })
    });
  });
  
  console.log("Initialized");
}
