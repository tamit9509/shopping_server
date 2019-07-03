const mongodb = require('mongodb');
const url = require('../config.json');

let _db;
const dbConnection = callback => {
  mongodb.MongoClient.connect(url.connectionUrl, { useNewUrlParser: true })
    .then(client => {
      _db = client.db();
      console.log('db connected');
      callback();
    }).catch(err => {
      console.error(err)
    })
}
const getdb = () => {
  if (_db) {
    return _db;
  }
  throw 'No Database found';
}

module.exports = {
  connection: dbConnection,
  getdbobj: getdb
}
