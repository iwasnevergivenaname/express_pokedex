const express = require('express');
const router = express.Router();
const axios = require("axios");

const db = require("../models");

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // db.pokemon.create({
  //   name: 'Pikachu'
  // }).then(function(poke) {
  //   console.log('Created: ', poke.name)
  // })

  const pokemons = await db.pokemon.findAll();
  // .then(function(poke) {
  // console.log('Found: ', poke.name)
  // })


  // TODO: Get all records from the DB and render to view
  res.send(pokemons.map(p => {
    return {name: p.name};
  }));
});


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  const {body} = req;
  const {url, name} = body;
  const {data: pokeData} = await axios.get(url);
  console.log(pokeData);
  // const insert = await db.pokemon.create({
  //   name: body.name
  // });
  // console.log(insert);
  if (name.toLowerCase() === "charmander") {
   const {data: formData} = await axios.get(pokeData.forms[0].url);
    res.send(formData);
  } else {
    res.send(pokeData);
  }
});

module.exports = router;
