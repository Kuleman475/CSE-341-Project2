const mongodb = require("../db/connect");
// const objectId = require("mongodb").ObjectId;

const getAllData = async (req, res, next) => {
    const filmData = await mongodb.getDb().db("Films").collection("film").find();
    filmData.toArray().then((list) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(207).json(list);
    })
}

module.exports = {getAllData}