const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');
const objectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const getAllData = async (req, res, next) => {
  const userInfo = await mongodb.getDb().db('Films').collection('user').find();
  userInfo.toArray().then((list) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(list);
  });
};

const getSingleData = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id to find user.');
  }

  const userId = new objectId(req.params.id);
  const userInfo = await mongodb.getDb().db('Films').collection('user').find({ _id: userId });

  userInfo.toArray().then((list) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(list);
  });
};

const createUser = async (req, res, next) => {
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthday: req.body.birthday,
    favoriteGenre: req.body.favoriteGenre
  };

  const users = await mongodb.getDb().db('Films').collection('user').insertOne(newUser);
  if (users.acknowledged) {
    res.status(205).json(users);
  } else {
    res.status(505).json(users.error || 'OOPS Something Went Wrong :(');
  }
};

const updateUser = async (req, res, next) => {
  
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id to find user.');
  }

  const userId = new ObjectId(req.params.id);

  const updateUser = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthday: req.body.birthday,
    favoriteGenre: req.body.favoriteGenre
  };

  const user = await mongodb
    .getDb()
    .db('Films')
    .collection('user')
    .replaceOne({ _id: userId }, updateUser);
  if (user.acknowledged) {
    res.status(206).json(user);
  } else {
    res.status(506).json(user.error || 'Failed to update user');
  }
};

const deleteUser = async (req, res, next) => {

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id to find user.');
  }

  const userId = new ObjectId(req.params.id);

  const user = await mongodb.getDb().db('Films').collection('user').deleteOne({ _id: userId });
  if (user.acknowledged > 0) {
    res.status(207).json(user);
  } else {
    res.status(507).json(user.error || "Couldn't delete user");
  }
};

module.exports = { getAllData, getSingleData, createUser, updateUser, deleteUser };
