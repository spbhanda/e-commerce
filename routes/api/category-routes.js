const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
   // find all categories
   // be sure to include its associated Products
   Category.findAll({
      attributes: ["id", "category_name"],
      include: [
         {
            model: Product,
            attributes: ["id", "product_name", "price", "stock"],
         },
      ],
   })
      .then((categories) => res.json(categories))
      .catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

router.get("/:id", (req, res) => {
   // find one category by its `id` value
   // be sure to include its associated Products

   Category.findOne({
      attributes: ["id", "category_name"],
      where: {
         id: req.params.id,
      },
      include: [
         {
            model: Product,
            attributes: ["id", "product_name", "price", "stock"],
         },
      ],
   })
      .then((categories) => {
         if (!categories) {
            res.status(404).json({ message: "No category id found" });
            return;
         }
         res.json(categories);
      })
      .catch((err) => {
         console.log(err);
         res.status(404).json(err);
      });
});

router.post("/", (req, res) => {
   // create a new category
   Category.create({
      category_name: req.body.category_name,
   })
      .then((categories) => res.json(categories))
      .catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

router.put("/:id", (req, res) => {
   // update a category by its `id` value
   Category.update(req.body, {
      individualHooks: true,
      where: {
         id: req.params.id,
      },
   })
      .then((categories) => {
         if (!categories) {
            res.status(400).json({ mesage: "No category id found" });
            return;
         }
         res.json(categories);
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

router.delete("/:id", (req, res) => {
   // delete a category by its `id` value
   Category.destroy({
      where: { id: req.params.id },
   })
      .then((categories) => {
         if (!categories) {
            res.status(404).json({ message: "No category id found" });
         }
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

module.exports = router;
