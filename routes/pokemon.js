const express = require('express');
const router = express.Router();
const axios = require("axios");

const db = require("../models");

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {

  const pokemons = await db.pokemon.findAll();

  // TODO: Get all records from the DB and render to view
  res.render("favorites", {pokemons: pokemons});
});


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  const {body} = req;
  const {url, name} = body;
  const {data: pokeData} = await axios.get(url);
  console.log(pokeData);

  // const p = await db.sequelize.query(`INSERT INTO pokedex (name, order) VALUES ("${pokeData.name}", ${pokeData.order})`);
  const insert = await db.pokemon.create({
    name: body.name
  });
  console.log(insert);
  res.redirect("/pokemon");
});

router.get("/:name", (req, res) => {
  // data object
  const poke = req.params.name;
  axios.get(poke)
    .then(response => {
      console.log(response.data);
      let pokemon = response.data.results;
      res.render('details', {pokemon: pokemon});
    });
});

module.exports = router;
