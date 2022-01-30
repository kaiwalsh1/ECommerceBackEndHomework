const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }],
    })
    res.status(200).json(tags);
  } catch (e) {
    res.json(e);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tags found with that id' });
      return;
    }
    res.status(200).json(tagData);
  } catch (e) {
    res.json(e);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  const { tag_name } = req.body;
  try {
    const newTag = await Tag.create({
      tag_name,
    });
    res.json(newTag);
  } catch (e) {
    res.json(e);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const { tag_name } = req.body;
  try {
    await Tag.update(
      {
        tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
        // individualHooks: true,
      }
    );
    const updatedTag = await Tag.findByPk(req.params.id);
    res.status(200).json(updatedTag);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.findByPk(req.params.id);
    await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTag) {
      res.status(404).json({ message: 'No tag with this id' });
      return;
    }
    res.status(200).json(deleteTag);
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;
