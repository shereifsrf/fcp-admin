const httpStatus = require('http-status');
const { Donation } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<Donation>}
 */
const createDonation = async (categoryBody) => {
  return Donation.create(categoryBody);
};

/**
 * Query for donations
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryDonations = async (filter, options) => {
  const donations = await Donation.paginate(filter, options);
  return donations;
};

/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<Donation>}
 */
const getDonationById = async (id) => {
  return Donation.findById(id);
};

/**
 * Update category by id
 * @param {ObjectId} categoryId
 * @param {Object} updateBody
 * @returns {Promise<Donation>}
 */
const updateDonationById = async (categoryId, updateBody) => {
  const category = await getDonationById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Donation not found');
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

/**
 * Delete category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<Donation>}
 */
const deleteDonationById = async (categoryId) => {
  const category = await getDonationById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Donation not found');
  }
  await category.remove();
  return category;
};

module.exports = {
  createDonation,
  queryDonations,
  getDonationById,
  updateDonationById,
  deleteDonationById,
};
