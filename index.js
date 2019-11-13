('serviceWorker' in navigator) ? navigator.serviceWorker.register('/chat/url/js/sw.js') : null;
window.addEventListener('onpopstate', e => { e.preventDefault(); e.state.route(); });
String.prototype.route = function(b, a = b ? b : [], state = this.valueOf()) { //window.location.href = state;
  return new Promise(function(resolve, reject) { 
    if(state) {
      var whl, GET = [].hash(state), HKY = [], GUT = [], hash = GET[1];
      GET.forEach((m,n) => {
        whsh = str_replace('#','',m), HKY[n] = GET[n] = whsh;
        if(
          m.includes('#') || (n === 2 && GET[1] === "room")
        ) { HKY[n] = '#'; } GUT[n] = whsh;
      });
      var iHash = '/'+HKY.join('/')+'/', oHash = '/'+GUT.join('/')+'/';
      var logic = {GUT,HKY,iHash,oHash}, container = getId(iHash);
      var href, section, wrapper = byId('wrapper'); button = container;
      if(button === wrapper.dataset.section) { href = '/chat/', section = 'central'; }
      else {
        if(button === 'north') { href = '/chat/live/'; } 
        else if(button === 'east') { href = '/chat/dm/'; } 
        else if(button === 'west') { href = '/chat/room/'; } 
        else if(button === 'south') { href = '/chat/story/'; }    
        section = button;
      }
      wrapper.dataset.section = section;
      var framework = pages[container]["chat"][GET[0] ? iHash : "/"];
      var authState = firebase.auth().currentUser ? 'online' : 'offline', GUT = logic.GUT, hash = GUT[0];
      xhr(authState && framework.protected ? framework.protected : framework.paging, {dataType: 'GET'}).then(data => {          
          getHTML(framework.online && authState === 'online' ? framework.online : framework.offline)
          .then(html => buildPage(container, data, html, state, logic).then(events(state)));    
      }).catch(err => reject(err));
    }
  });
};
function byId(id) { return document.getElementById(id); }
function all(sel) { return document.querySelector(sel); }
function getId(r,s=r==='//' ? '/' : r) {
  var r=[].hash(s)[0], k=0; (s === '/') ? r = '' : null; for(container of Object.keys(pages)) {
    if(Object.keys(Object.values(pages)[k]).includes(r) && Object.keys(Object.values(pages)[k][r]).includes(s)) { return Object.keys(pages)[k]; } k++;
  }
}
function ajax(url, settings, c1 = console.log(url, settings)) {
  return new Promise((resolve, reject) => {
    var req = new XMLHttpRequest();
    var onLoad = function(event) {
      req.status >= 400 ? reject(req) : resolve({'data': JSON.parse(this.responseText), 'status': req.status});
    }, onFail = function(event) { reject(event); };
    req.addEventListener('load', onLoad);
    req.addEventListener('error', onFail);
    req.addEventListener('abort', onFail);
    req.open(settings.dataType, url);
    if(settings.dataType === 'POST') {
      req.setRequestHeader("Content-type", "application/json");
      settings.data ? req.send(JSON.stringify(settings.data)) : req.send();
    }
    else { req.send() }
  });
}
function getHTML(url) {
  return new Promise((resolve, reject) => {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if(this.status == 200) { resolve(this.responseText); }
        else if(this.status == 404) { reject('404'); }
      }
    }
    xhttp.open("GET", url, true); xhttp.send();
  });
}
function xhr(url, settings) {
  return new Promise((resolve, reject) => {
    req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (this.readyState == 4) {
        if(this.status == 200) { resolve(this.responseText); }
        else if(this.status == 404) { reject('404'); }
      }
    }
    req.open(settings.dataType, url);
    if(settings.dataType === 'POST') {
      req.setRequestHeader("Content-type", "application/json");
      settings.data ? req.send(JSON.stringify(settings.data)) : req.send();
    }
    else { req.send() }
  });
}
function init() { 
  window.GET = [].hash(window.location.pathname); //webCam(byId('video-1'), 1);
  webCam(byId('camera'),1);
  dataBase('local').then(schema => buildDB('cache', 1));
  loadScript('https://www.gstatic.com/firebasejs/6.3.5/firebase-app.js', () => {
    firebase.initializeApp({
      apiKey: "AIzaSyBxGXe52WtXo_B5iKBo9BQZSfAwYFhLRO8",
      authDomain: "uios-83649.firebaseapp.com",
      databaseURL: "https://uios-83649.firebaseio.com",
      projectId: "uios-83649",
      storageBucket: "uios-83649.appspot.com",
      messagingSenderId: "47824486713",
      appId: "1:47824486713:web:51f3a124b42b1080"
    });
    loadScript('https://www.gstatic.com/firebasejs/6.3.5/firebase-auth.js', () => {
      firebase.auth().onAuthStateChanged(function(user) { console.log('authUser', user);
        if(user) { 
          //user.updateProfile({displayName: "thebanon", photoURL: 'https://avi.mallzones.com/43.jpg'});
          user.photoURL ? document.querySelector('#dock-avi').style.backgroundImage='url(' + user.photoURL + ')' : null; 
        }
        var href = window.location.pathname+window.location.hash; href.route({reload:true});
      });
    });
  });
}
function buildPage(container, data, html, state, logic) {  console.log(container, logic);
  return new Promise((resolve, reject) => {    
    byId('wrapper').dataset.section = container; byId(container).innerHTML = html;
    if(container === 'west') {
      //loadScript('/chat/url/js/rtc.js', () => {
        if(logic.GUT.length > 2) {
          var room_name = logic.GUT[2];
          //byId('room_name').querySelector('.user').style.backgroundImage = '/chat/url/avatar/';
          byId('room_name').querySelector('.name').textContent = room_name;
          localStorage.setItem(connection.socketMessageEvent, room_name);
          autoRoom(room_name); 
        }
        else {
          byId('webcam').removeAttribute('data-box');
          xhr('/chat/url/json/promo.json', {dataType: 'GET'}).then((data, html = '') => {
              JSON.parse(data).forEach(e => {
                html += '<div class="room" data-before="'+e.name+'" style="'
                    +(e.avatar === null ? 'background-color:#'+Math.floor(Math.random()*16777215).toString(16) : 'background-image:url(/chat/url/avatar/avatar_'+e.id+'.'+e.avatar+')')
                    +'"></div>';
              });
              byId('promo').innerHTML = html;
          });
          xhr('/chat/url/json/rooms.json', {dataType: 'GET'}).then(data => { var html = '';
              shuffle(JSON.parse(data)).forEach(e => {
                html += '<div class="room" data-before="'+e.name+'" data-after="'+e.description+'" style="'
                    +(e.avatar === null ? 'background-color:#'+Math.floor(Math.random()*16777215).toString(16) : 'background-image:url(/chat/url/avatar/avatar_'+e.id+'.'+e.avatar+')')
                    +'"></div>';
              });
              byId('rooms').innerHTML = html;
          });
        }
      //});
    } 

    if(container === 'central') {   
      byId('uios').style.display = isIframe() ? 'none' : 'block';
    }

  });
}
function isIframe() { return window.top===window.self ? false : true; }
function events(state) {
  return new Promise((resolve, reject) => { state.hashBang('Chat | uiOS'); resolve(state); });
}
function loadScript( url, callback ) {
  var script = document.createElement("script"); script.type = "text/javascript";
  (script.readyState) ? script.onreadystatechange = function() {
      if ( script.readyState === "loaded" || script.readyState === "complete" ) { script.onreadystatechange = null; callback(); }
    } : script.onload = function() { callback(); };
  script.src = url; document.getElementsByTagName( "head" )[0].appendChild( script );
}
function navi(target) {
  var href, button = target.closest('.route').dataset.section;
  if(button === byId('wrapper').dataset.section) { href = '/chat/', section = 'central'; }
  else {
    if(button === 'north') { href = '/chat/live/'; } 
    else if(button === 'east') { href = '/chat/dm/'; } 
    else if(button === 'west') { href = '/chat/room/'; } 
    else if(button === 'south') { href = '/chat/story/'; }    
  }
  href.route();
}
function notify(message,counter) {
  return new Promise((resolve, reject) => {
    var notify = byId('notifications');
    $(notify).addClass('push').html(message);
    var interval = setInterval(() => {
      counter--, notify.dataset.cnt = counter, counter === 0 ?
        $(notify).removeClass('push')[0].removeAttribute('data-cnt') : null,
      counter === 0 ? resolve(clearInterval(interval)) : null;
    },1000);
  });
}
function webCam(video,io){
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  if(io===1) {
    navigator.getUserMedia ?
      navigator.getUserMedia(
        { audio: false, video: {width:1920, height:1080} },
        stream => {
          window.localStream = video.srcObject = stream,
          video.onloadedmetadata = e => { video.play(); }
        },
        err => console.log("The following error occurred: "+err.name)
      ) :
      console.log("getUserMedia not supported");
  }
  else{ window.localStream.getTracks()[0].stop(); }
}
function fillScreen(elem) {
  if (elem.requestFullscreen) { elem.requestFullscreen(); }
  else if (elem.mozRequestFullScreen) { elem.mozRequestFullScreen(); }
  else if (elem.webkitRequestFullscreen) { elem.webkitRequestFullscreen(); }
  else if (elem.msRequestFullscreen) { elem.msRequestFullscreen(); }
}