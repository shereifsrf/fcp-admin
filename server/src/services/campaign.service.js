const httpStatus = require('http-status');
const { Campaign } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<Campaign>}
 */
const createCampaign = async (categoryBody) => {
  return Campaign.create(categoryBody);
};

/**
 * Query for campaigns
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCampaigns = async (filter, options) => {
  const campaigns = await Campaign.paginate(filter, options);
  return campaigns;
};

/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<Campaign>}
 */
const getCampaignById = async (id) => {
  return Campaign.findById(id);
};

/**
 * Update category by id
 * @param {ObjectId} categoryId
 * @param {Object} updateBody
 * @returns {Promise<Campaign>}
 */
const updateCampaignById = async (categoryId, updateBody) => {
  const category = await getCampaignById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Campaign not found');
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

/**
 * Delete category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<Campaign>}
 */
const deleteCampaignById = async (categoryId) => {
  const category = await getCampaignById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Campaign not found');
  }
  await category.remove();
  return category;
};

module.exports = {
  createCampaign,
  queryCampaigns,
  getCampaignById,
  updateCampaignById,
  deleteCampaignById,
};
