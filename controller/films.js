const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');
const objectId = require('mongodb').ObjectId;

const getAllData = async (req, res, next) => {
  const filmData = await mongodb
    .getDb()
    .db('Films')
    .collection('film')
    .find();
    filmData.toArray().then((list) => {

      res.setHeader('Content-Type', 'application/json');
      res.status(207).json(list);
    });
};

const createFilm = async (req, res, next) => {
  const newFilm = {
    title: req.body.title,
    genre: req.body.genre,
    rating: req.body.rating,
    length: req.body.length,
    year: req.body.year
  };

  const films = await mongodb.getDb().db('Films').collection('film').insertOne(newFilm);
  if (films.acknowledged) {
    res.status(205).json(films);
  } else {
    res.status(505).json(films.error || 'OOPS Something Went Wrong :(');
  }
};

const getDataId = async (req, res, next) => {

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid film id to find a film.');
  }

  const filmId = new ObjectId(req.params.id);

  const film = await mongodb.getDb().db('Films').collection('film').find({ _id: filmId });
  film.toArray().then((list) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(206).json(list);
  });
};

const updateFilm = async (req, res, next) => {

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid film id to find a film.');
  }

  const filmId = new ObjectId(req.params.id);

  const updatedFilm = {
    title: req.body.title,
    genre: req.body.genre,
    rating: req.body.rating,
    length: req.body.length,
    year: req.body.year
  };

  const updated = await mongodb
    .getDb()
    .db('Films')
    .collection('film')
    .replaceOne({ _id: filmId }, updatedFilm);

  if (updated.acknowledged) {
    res.status(208).json(updated);
  } else {
    res.status(509).json(updated.err || "Couldn't update film");
  }
};

const deleteFilm = async (req, res, next) => {

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid film id to find a film.');
  }

  const filmId = new ObjectId(req.params.id);

  const deleteFilm = await mongodb
    .getDb()
    .db('Films')
    .collection('film')
    .deleteOne({ _id: filmId });

  if (deleteFilm.acknowledged > 0) {
    res.status(209).json(deleteFilm);
  } else {
    res.status(509).json(deleteFilm.err || "Couldn't delete film");
  }
};

module.exports = { getAllData, createFilm, getDataId, updateFilm, deleteFilm };
