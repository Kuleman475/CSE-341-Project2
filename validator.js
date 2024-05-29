const { body, validationResult } = require('express-validator');

// USER VALIDATION
const userValidationRules = () => {
  return [
    // username must be an email
    body('username').isLength({ min: 8 }),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
    // first name
    body('firstName').isString(),
    // last name
    body('lastName').isString(),
    // email must be an email
    body('email').isEmail(),
    // date must be in MM/DD/YYYY format
    body('birthday').isDate(str, 'MM/DD/YYYY'),
    // favorite genre
    body('favoriteGenre').isString()
  ];
};

//FILM VALIDATION
const filmValidationRules = () => {
  return [
    body('title'),
    body('genre').isString(),
    body('rating').equals('G', 'PG', 'PG-13', 'PG 13', 'R'),
    body('length').isInt(),
    body('year').isInt({ min: 1888, max: 2029 })
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  userValidationRules,
  filmValidationRules,
  validate
};
