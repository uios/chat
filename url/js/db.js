function dataBase(endpoint) {
  return new Promise((resolve, reject) => {
    console.log('Downloading database...');
    xhr('/chat/url/json/tables.json', {dataType: 'GET'}).then(obj => {
        window.tables = {};
        JSON.parse(obj).forEach((table,key) => {
          var endpoints = {
            network: "https://"+str_replace('.com','',window.location.hostname)+"/v1/read/"+table,
            local: "/chat/url/json/"+table+".json"
          }; console.log(endpoints[endpoint]);
          xhr(endpoints[endpoint], {dataType: 'GET'}).then(data => {
              window.tables[table] = data; key === obj.length - 1 ? resolve(tables) : null;
          }).catch(e => reject(e));
        });      
    }).catch(error => reject(error))
  });
}
function tempLate(tables) {
  return new Promise((resolve, reject) => {
    resolve(tables);
  });
}
function buildDB(name, version) { console.log('buildDB', tables);

  return new Promise((resolve, reject) => {

    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

      var schema = lf.schema.create(name, 1);

      schema.createTable("rooms")
        .addColumn('id', lf.Type.STRING)
        .addColumn('avatar', lf.Type.STRING)
        .addColumn('name', lf.Type.STRING)
        .addColumn('description', lf.Type.STRING)
        .addPrimaryKey(['id']);

      schema.createTable("users")
        .addColumn('avi', lf.Type.STRING)
        .addColumn('birthdate', lf.Type.STRING)
        .addColumn('bio', lf.Type.STRING)
        .addColumn('cover', lf.Type.STRING)
        .addColumn('created', lf.Type.STRING)
        .addColumn('fullname', lf.Type.STRING)
        .addColumn('gender', lf.Type.STRING)
        .addColumn('spawned', lf.Type.STRING)
        .addColumn('id', lf.Type.STRING)
        .addColumn('username', lf.Type.STRING)
        .addPrimaryKey(['id']);

      schema.createTable("global")
        .addColumn('init', lf.Type.BOOLEAN);

      schema.connect().then(function(e) { window.db = e; //console.log('schema', e);
        var global = db.getSchema().table('global');
        db.select(global.init).from(global).exec()
        .then(rows => { //console.log(rows);
          if(rows.length === 0) {
            data = {"name": name, "version": version, "tables": tables};
            db.import(data).then(e => {
              console.log(e);
              var global = db.getSchema().table('global'), row = global.createRow({'init': true});
              db.insert().into(global).values([row]).exec()
              .then(rows => { notify('Database succesfully imported', 2); resolve(data); });
            });
          }
          else { resolve(); }
        });
      });


  });

}
