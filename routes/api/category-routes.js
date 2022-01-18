const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
        as: 'products',
      },
    ],
  })
    .then((dbCategoryData) => {
      const categoryData = dbCategoryData.map((category) => category.get({ plain: true }));
      res.json(categoryData);
    })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
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
    .then((dbCategoryData) => {
      const categoryData = dbCategoryData.get({ plain: true });
      res.json(categoryData);
    })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    name: req.body.name,
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
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
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
});

module.exports = router;
