const httpStatus = require('http-status');
const { Proof } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<Proof>}
 */
const createProof = async (categoryBody) => {
  return Proof.create(categoryBody);
};

/**
 * Query for proofs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProofs = async (filter, options) => {
  const proofs = await Proof.paginate(filter, options);
  return proofs;
};

/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<Proof>}
 */
const getProofById = async (id) => {
  return Proof.findById(id);
};

/**
 * Update category by id
 * @param {ObjectId} categoryId
 * @param {Object} updateBody
 * @returns {Promise<Proof>}
 */
const updateProofById = async (categoryId, updateBody) => {
  const category = await getProofById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Proof not found');
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

/**
 * Delete category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<Proof>}
 */
const deleteProofById = async (categoryId) => {
  const category = await getProofById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Proof not found');
  }
  await category.remove();
  return category;
};

module.exports = {
  createProof,
  queryProofs,
  getProofById,
  updateProofById,
  deleteProofById,
};
