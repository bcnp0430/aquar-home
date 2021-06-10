var appEntryDao = (function() {
  const lowdb = require('lowdb')
  const fs = require('fs')
  const FileSync = require('lowdb/adapters/FileSync')
  const DB_PATH = '/var/aquar_data/db/'
  if (!fs.existsSync(DB_PATH+'db.json')){
    var defaultConfig = fs.readFileSync('./db.json','utf8')
    fs.mkdirSync(DB_PATH, { recursive: true });
    fs.writeFileSync(DB_PATH+'db.json',defaultConfig)
  }
  const adapter = new FileSync(DB_PATH+'db.json')
  
  var db = lowdb(adapter)
  // db.defaults({ widgets: [] }).write()

  return {
    saveAppEntry: function(entry) {
      db.get('widgets')
        .push(entry)
        .write()
    },
    findOneById: function(id) {
      var res = db.get('widgets')
        .find({ 'id': id }).value()
      return res
    },
    findAllBySort: function(sortByAsc) {
      return db.get('widgets')
        .sortBy('sort')
      // .sortBy(function(item){return item.sort})
        .value()
    },
    findByPage: function(pageNo, pagesize, sortByAsc) {
      return db.get('widgets')
        .sortBy('sort')
      // .sortBy(function(item){return item.sort})
        .slice((pageNo - 1) * pagesize, pagesize)
        .value()
    },
    updateById: function(id,item) {
      db.get('widgets')
      .find({ id: id })
      .assign(item)
      .write()
    },
    deleteById: function(id) {
      db.get('widgets').remove({'id':id}).write()
    },
    getDbInstance: function() {
      return db
    }
  }
})()

module.exports = appEntryDao