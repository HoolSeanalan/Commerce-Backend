const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        as: 'products',
      },
    ],
  })
    .then((dbTagData) => {
      const tagData = dbTagData.map((tag) => tag.get({ plain: true }));
      res.json(tagData);
    })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        as: 'products',
      },
    ],
  })
    .then((dbTagData) => {
      const tagData = dbTagData.get({ plain: true });
      res.json(tagData);
    })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    name: req.body.name,
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      name: req.body.name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  });
});

module.exports = router;
