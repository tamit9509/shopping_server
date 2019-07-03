const dbobj = require('./../util/db');

class RegisterUser {
  constructor(obj) {
    this.name = obj.name;
    this.email = obj.email;
    this.password = obj.password;
  }
  save() {
    const _db = dbobj.getdbobj();
    _db.collection('users').insertOne(this).
      then(result => {
        return result;
      }).
      catch(err => {
        _db.close();
      })
  }
  getAllUsers() { }
  getUserById() { }
}
module.exports = RegisterUser;