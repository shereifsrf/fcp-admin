const httpStatus = require('http-status');
const { Reporting } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<Reporting>}
 */
const createReporting = async (categoryBody) => {
  return Reporting.create(categoryBody);
};

/**
 * Query for reportings
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryReportings = async (filter, options) => {
  const reportings = await Reporting.paginate(filter, options);
  return reportings;
};

/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<Reporting>}
 */
const getReportingById = async (id) => {
  return Reporting.findById(id);
};

/**
 * Update category by id
 * @param {ObjectId} categoryId
 * @param {Object} updateBody
 * @returns {Promise<Reporting>}
 */
const updateReportingById = async (categoryId, updateBody) => {
  const category = await getReportingById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reporting not found');
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

/**
 * Delete category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<Reporting>}
 */
const deleteReportingById = async (categoryId) => {
  const category = await getReportingById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reporting not found');
  }
  await category.remove();
  return category;
};

module.exports = {
  createReporting,
  queryReportings,
  getReportingById,
  updateReportingById,
  deleteReportingById,
};
