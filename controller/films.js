const mongodb = require("../db/connect");
// const objectId = require("mongodb").ObjectId;

const getAllData = async (req, res, next) => {
    const filmData = await mongodb.getDb().db("Films").collection("film").find();
    filmData.toArray().then((list) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(207).json(list);
    })
}

const createFilm = async (req, res, next) => {
    const newFilm = {   
        title: req.body.title,
        genre: req.body.genre,
        rating: req.body.rating,
        length: req.body.length,
        year: req.body.year
    };

    const films = await mongodb.getDb().db("Films").collection("film").insertOne(newFilm);
    if (films.acknowledged) {
        res.status(205).json(films)
    } 
    else {
        res.status(505).json(films.error || "OOPS Something Went Wrong :(")
    }
}

const getDataId = async (req, res, next) => {
    res.status(321).json(err)
}

const updateFilm = async (req, res, next) => {
    res.status(322).json(err)
}

const deleteFilm = async (req, res, next) => {
    res.status(323).json(err)
}
    


module.exports = {getAllData, createFilm, getDataId, updateFilm, deleteFilm}