const httpStatus = require('http-status');
const { isEmpty } = require('lodash');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');
const { getQuery } = require('../utils/helper');

const createCategory = catchAsync(async (req, res) => {
  req.body.createdBy = req.user.id;
  const category = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(category);
});

const getCategories = catchAsync(async (req, res) => {
  req.query.filter = JSON.parse(req.query.filter);
  if (!isEmpty(req.query.filter.id)) {
    req.query.filter._id = req.query.filter.id;
    delete req.query.filter.id;
  }
  const filter = pick(req.query.filter, ['name', 'role', '_id']);
  const options = pick(req.query, ['sort', 'limit', 'page']);
  const result = await categoryService.queryCategories(filter, options);
  res.send(result);
});

const getCategory = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  res.send(category);
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategoryById(req.params.categoryId, req.body);
  res.send(category);
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategoryById(req.params.categoryId);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteManyCategories = catchAsync(async (req, res) => {
  const query = getQuery(req);
  let idArr = [];
  const result = await categoryService.queryCategories(query.filter, query.options);
  if (!isEmpty(query.filter) && !isEmpty(query.filter._id)) {
    idArr = query.filter._id.$in;
  }
  await Promise.all(
    // eslint-disable-next-line array-callback-return
    idArr.map((id) => {
      categoryService.deleteCampaignById(id);
    })
  );

  res.status(httpStatus.OK).send(result);
});

module.exports = {
  createCategory,
  getCategories,
  deleteManyCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
