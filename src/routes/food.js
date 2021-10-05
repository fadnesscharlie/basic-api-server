'use strict';

const express = require('express');

const { Food } = require('../models/index');

const router = express.Router();

// RESTful Route Declaration

router.get('/food', getFood);
router.get('/food/:id', getIdFood);
router.post('/food', createFood);
router.put('/food/:id', updateFood);
router.delete('/food/:id', deleteFood);

// RESTful Router Handlers

async function getFood (req, res) {
  let allFood = await Food.findAll();
  res.status(200).json(allFood);
}

async function getIdFood (req, res) {
  const id = parseInt(req.params.id);
  let oneFood = await Food.findOne({ where: { id: id}});
  res.status(200).json(oneFood)
}

async function createFood (req, res) {
  let createFood = req.body;
  let postFood = await Food.create(createFood);
  res.status(200).json(postFood);
}

async function updateFood (req, res) {

  let id = req.params.id;
  let foodData = req.body;
  let food = await Food.findOne({ where: { id: id}});
  let updatedFood = await food.update(foodData);
  res.status(200).json(updatedFood);
}

async function deleteFood (req, res) {
  try {
    let id = req.params.id;
    let deletedFood = await Food.destroy({where: {id : id}})
    res.status(200).json(deletedFood)
  } catch (error) {
    res.status(500).send(console.log('Error on delete: 500',error))
  }
}

module.exports = router

