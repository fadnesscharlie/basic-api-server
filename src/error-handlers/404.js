'use strict';

// module.exports = (req, res, next) => {
//   res.status(404).send({
//     error: 404,
//     route: req.path,
//     message: 'Not Found'
//   })
// }

function handle404( req, res, next) {
  const errorObject = {
    status: 404,
    message: 'Sorry, could not find what you were looking for'
  };
  res.status(404).json(errorObject)
}

module.exports = handle404;
