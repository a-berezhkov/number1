const express = require('express');
const Pokemon = require('../models/Pokemon');

const router = express.Router();

// GET все покемоны
router.get('/', async (req, res) => {
  try {
    const pokemons = await Pokemon.findAll();
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET один покемон по ID
router.get('/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findByPk(req.params.id);
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST создание нового покемона
router.post('/', async (req, res) => {
  try {
    const { name, type, power, hp } = req.body;
    
    if (!name || !type || power === undefined || hp === undefined) {
      return res.status(400).json({ 
        error: 'Name, type, power, and hp are required' 
      });
    }

    const pokemon = await Pokemon.create({
      name,
      type,
      power,
      hp
    });
    res.status(201).json(pokemon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT изменение покемона
router.put('/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findByPk(req.params.id);
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }

    const { name, type, power, hp } = req.body;
    
    if (name) pokemon.name = name;
    if (type) pokemon.type = type;
    if (power !== undefined) pokemon.power = power;
    if (hp !== undefined) pokemon.hp = hp;

    await pokemon.save();
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE удаление одного покемона
router.delete('/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findByPk(req.params.id);
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }

    await pokemon.destroy();
    res.json({ message: 'Pokemon deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE удалить всех покемонов
router.delete('/', async (req, res) => {
  try {
    const count = await Pokemon.destroy({ where: {} });
    res.json({ message: `${count} pokemons deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
