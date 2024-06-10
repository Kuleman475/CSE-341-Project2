const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');
const objectId = require('mongodb').ObjectId;


const getToken = async (res, req, next) => {
const userId = new objectId(req.params.token);
    console.log(userId)
}

module.exports = {getToken}