const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

// GET все элементы
router.get('/', async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET один элемент по ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST создание нового элемента
router.post('/', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const item = await Item.create({
      name,
      description,
      price
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT изменение элемента
router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const { name, description, price } = req.body;
    
    if (name) item.name = name;
    if (description !== undefined) item.description = description;
    if (price !== undefined) item.price = price;

    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE удаление одного элемента
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    await item.destroy();
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE удалить все элементы
router.delete('/', async (req, res) => {
  try {
    const count = await Item.destroy({ where: {} });
    res.json({ message: `${count} items deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
