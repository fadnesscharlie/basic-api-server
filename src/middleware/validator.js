'use strict';

// All middleware has access to request
// Lets simply log out some data

// This is a route middleware

module.exports = (req, res, next) => {
  if (!req.query) {
    next(`Data Required`);
  } else { 
    next(); 
  }
}
