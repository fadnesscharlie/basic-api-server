'use strict';

// DEMO

const express = require('express');
const { People } = require('../models/index.js');

const router = express.Router();

// RESTful Route Declarations

router.get('/people', getPeople);
router.get('/people:/id', getOnePerson);
router.post('/people', createPerson);
router.put('/people:/id', updatePerson);
router.delete('/people:/id', deletePerson);

// RESTful Router Handlers

async function getPeople (req, res) {
  let allPeople = await People.findAll();
  res.status(200).json(allPeople);
}

async function getOnePerson ( req, res) {
  const id = parseInt(req.params.id);
  let onePerson = await People.findOne({ where: { id: id}});
  res.status(200).json(onePerson);

}

async function createPerson(req, res) {
  let personData = req.body;
  let person = await People.create(personData);
  res.status(200).json(person);
}

async function updatePerson(req, res) {
  const id = parseInt(req.params.id);
  const personData = req.body; 
  let person = await People.findOne({ where: { id: id}})
  let updatedPerson = await person.update(personData);
  res.status(200).json(updatedPerson)
}

async function deletePerson(req, res) {
  let id = parseInt(req.params.id);
  let deletedPerson = await People.destroy({ where: { id: id}})
  res.status(200).json(deletedPerson);
}

module.exports = router
