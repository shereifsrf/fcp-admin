const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
const categoryController = require('../../controllers/category.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), categoryController.createCategory)
  .get(auth('getUsers'), categoryController.getCategories)
  .delete(auth('manageUsers'), categoryController.deleteManyCategories);

router
  .route('/:categoryId')
  .get(auth('getUsers'), categoryController.getCategory)
  .patch(auth('manageUsers'), categoryController.updateCategory)
  .delete(auth('manageUsers'), categoryController.deleteCategory);

module.exports = router;
