window.mvc ? null : (window.mvc = {});

window.mvc.m
  ? null
: (window.mvc.m = model = {
});

window.mvc.v
  ? null
: (window.mvc.v = view = function (route) {
  return new Promise(async function (resolve, reject) {
    var path = route.path;
    var get = route ? route.GOT : rout.ed.dir(dom.body.dataset.path);
    var root = get[0];
    GET = window.GET ? GET : rout.ed.dir(dom.body.dataset.path);

    if (root) {
      dom.footer.find('card').dataset.width = "240px";
      byId('snap').classList.add('bottom-0');
      //webcam.control.stop();
      if(root === "user") {
        byId('avi').classList.add('hide');
      } else {
        byId('avi').classList.remove('hide');            
      }
      resolve(route);
    } 
    else {
      dom.footer.find('card').dataset.width = "100%-40px";
      byId('snap').classList.remove('bottom-0');
      byId('avi').classList.remove('hide');   
      webcam.stream ? null : webcam.control.play();
      resolve(route);
    }
  });
});

window.mvc.c
  ? null
: (window.mvc.c = controller = {
  shell: {
    snap: e => {
      if(dom.body.dataset.page === "/") {
        
      } 
      else {
        '/'.router();
      }
    }
  }
});
