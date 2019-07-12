const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const dbobj = require('./../util/db');
const rootDir = require('../util/path');

const p = path.join(rootDir, 'data', 'user.json');
const getFileContent = (callback) => {
  fs.readFile(p, (err, content) => {
    callback(JSON.parse(content));
  })
}
class RegisterUser {
  constructor(obj) {
    this.name = obj.name;
    this.email = obj.email;
    this.password = obj.password;
  }

  save(callback) {
    this.id = Math.random();
    getFileContent(users => {
      const index = users.findIndex(user => { return user.email === this.email; });
      if (index === -1) { users.push(this); fs.writeFile(p, JSON.stringify(users), err => { }); callback(this); return; }
      callback(null);
    })
  }
  getAllUsers() { }
  getUserById() { }

  static isValidUser(credential) {
    getFileContent(users => {
      const obj = users.find(user => {
        return ((user.email === credential.email) && (user.password === credential.password));
      });
      if (obj) {
        const token = RegisterUser.getJWTToken(obj);
        //generate jwt token
        // send token
      }
    });
  }

  static getJWTToken(obj) {
    const token = jwt.sign(obj, 'shhhhhhhhhhhhhhhhh');
    console.log(jwt.verify(token, 'shhhhhhhhhhhhhhhhh'));
  }
}
module.exports = RegisterUser;