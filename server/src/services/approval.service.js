const httpStatus = require('http-status');
const { Approval } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<Approval>}
 */
const createApproval = async (categoryBody) => {
  return Approval.create(categoryBody);
};

/**
 * Query for approvals
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryApprovals = async (filter, options) => {
  const approvals = await Approval.paginate(filter, options);
  return approvals;
};

/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<Approval>}
 */
const getApprovalById = async (id) => {
  return Approval.findById(id);
};

/**
 * Update category by id
 * @param {ObjectId} categoryId
 * @param {Object} updateBody
 * @returns {Promise<Approval>}
 */
const updateApprovalById = async (categoryId, updateBody) => {
  const category = await getApprovalById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Approval not found');
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

/**
 * Delete category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<Approval>}
 */
const deleteApprovalById = async (categoryId) => {
  const category = await getApprovalById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Approval not found');
  }
  await category.remove();
  return category;
};

module.exports = {
  createApproval,
  queryApprovals,
  getApprovalById,
  updateApprovalById,
  deleteApprovalById,
};
