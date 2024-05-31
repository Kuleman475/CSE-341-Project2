const Validator = require('validatorjs');

const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
  };

// USER VALIDATION
const userValidate = (req, res, next) => {
const userValidationRules = {
    // username
    username: 'required|string',
    // password must be at least 7 characters long
    password: 'required|string|min:7',
    // first name
    firstName: 'required|string',
    // last name
    lastName: 'required|string',
    // email must be an email
    email: 'required|email',
    // date must be in MM/DD/YYYY format
    birthday: 'required|string',
    // favorite genre
    favoriteGenre: 'string',
}

  validator(req.body, userValidationRules, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

//FILM VALIDATION
const filmValidate = (req, res, next) => {
const filmValidationRules = {
    title: 'required|string',
    genre: 'string',
    rating: 'string',
    length: 'integer',
    year: 'required|string'
};

validator(req.body, filmValidationRules, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
}
module.exports = {
  userValidate,
  filmValidate,
};
