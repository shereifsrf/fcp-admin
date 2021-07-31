const httpStatus = require('http-status');
const { isEmpty } = require('lodash');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { campaignService } = require('../services');

const createCampaign = catchAsync(async (req, res) => {
  req.body.createdBy = req.user.id;
  const campaign = await campaignService.createCampaign(req.body);
  res.status(httpStatus.CREATED).send(campaign);
});

const getCampaigns = catchAsync(async (req, res) => {
  if (!isEmpty(req.query.filter) && !isEmpty(req.query.filter.id)) {
    req.query.filter = JSON.parse(req.query.filter);
    req.query.filter._id = req.query.filter.id;
    delete req.query.filter.id;
  }
  const filter = pick(req.query.filter, ['name', 'role', '_id', 'campaignId']);
  const options = pick(req.query, ['sort', 'limit', 'page']);
  const result = await campaignService.queryCampaigns(filter, options);
  res.send(result);
});

const getCampaign = catchAsync(async (req, res) => {
  const campaign = await campaignService.getCampaignById(req.params.campaignId);
  if (!campaign) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Campaign not found');
  }
  res.send(campaign);
});

const updateCampaign = catchAsync(async (req, res) => {
  const campaign = await campaignService.updateCampaignById(req.params.campaignId, req.body);
  res.send(campaign);
});

const deleteCampaign = catchAsync(async (req, res) => {
  await campaignService.deleteCampaignById(req.params.campaignId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCampaign,
  getCampaigns,
  getCampaign,
  updateCampaign,
  deleteCampaign,
};
