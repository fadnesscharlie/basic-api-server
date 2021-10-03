'use strict';

module.exports = (sequelize, DataTypes) => sequelize.define('Food', {
  favDrink: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lovePizza: {
    type: DataTypes.BOOLEAN,
  }
})


