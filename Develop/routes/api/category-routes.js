const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (e) {
    res.status(500).json(e);
  }
});

// GET category by its id
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (e) {
    res.status(500).json(e);
  }
});

// CREATE a category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      id: req.body.id,
      category_name: req.body.category_name,
    });
    if (!id || !category_name) {
      res.status(404).json({ message: 'You must provide id and category name' });
      return;
    }
    res.status(200).json(newCategory);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
