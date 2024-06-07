const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');
const objectId = require('mongodb').ObjectId;

const loginUser = async (req, res, next) => {

    username = process.env.LOGIN_USERNAME
    password = process.env.LOGIN_PASSWORD

   const login = await mongodb.getDb().db('Films').collection('user').find({ username: username, password: password });
   
   login.toArray().then((list) => {
    if (list.length == 0) {
        res.status(507).json("unable to login :(")
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json("You are logged in");
 });

}

module.exports = {loginUser}
