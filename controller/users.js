const mongodb = require("../db/connect");
const objectId = require("mongodb").ObjectId;

const getAllData = async (req, res, next) => {
    const userInfo = await mongodb.getDb().db("Films").collection("user").find();
    userInfo.toArray().then((list) => {    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(list);
})
}

const getSingleData = async (req, res, next) => {
    const userId = new objectId(req.params.id);
    const userInfo = await mongodb.getDb().db("Films").collection("user").find({_id: userId});
    userInfo.toArray().then((list) => {    
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(list);
})
}

const createUser = async (req, res, next) => {
    res.status(301).json(err)
}

const updateUser = async (req, res, next) => { 
    res.status(302).json(err)
}

const deleteUser = async (req, res, next) => {
    res.status(303).json(err)
}

module.exports = {getAllData, getSingleData, createUser, updateUser, deleteUser}