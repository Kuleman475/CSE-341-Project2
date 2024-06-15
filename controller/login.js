const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');
const objectId = require('mongodb').ObjectId;
const readline = require('readline');



const loginUser = async (req, res, next) => {
  const username = 'thanos';
  const password = '6stones';
  
  const userId = new objectId(req.params.id);

  const login = await mongodb
    .getDb()
    .db('Films')
    .collection('user')
    .find({ username: username, password: password });

  login.toArray().then((list) => {
    if (list.length == 0) {
      res.status(507).json('unable to login :(');
    } else {
      res.redirect(`/user/user/${list[0]._id}`);
    }
  });
};

const logoutUser = async (req, res, next) => {
  res.status(202).json('Logged out succesfully');
};

module.exports = { loginUser, logoutUser };
