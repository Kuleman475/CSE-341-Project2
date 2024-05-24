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
    const newUser = {   
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        favoriteGenre: req.body.favoriteGenre
    };

    const users = await mongodb.getDb().db("Films").collection("user").insertOne(newUser);
    if (users.acknowledged) {
        res.status(205).json(users);
    } 
    else {
        res.status(505).json(users.error || "OOPS Something Went Wrong :(")
    }
}

const updateUser = async (req, res, next) => { 
    res.status(302).json(err);
}

const deleteUser = async (req, res, next) => {
    res.status(303).json(err);
}

module.exports = {getAllData, getSingleData, createUser, updateUser, deleteUser}