const httpStatus = require('http-status');
const { isEmpty } = require('lodash');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { campaignService, userService } = require('../services');
const { getQuery } = require('../utils/helper');
const { DONOR, CAMPAIGNER } = require('../config/roles');

const createCampaign = catchAsync(async (req, res) => {
  req.body.createdBy = req.user.id;
  const campaign = await campaignService.createCampaign(req.body);
  res.status(httpStatus.CREATED).send(campaign);
});

const getCampaigns = catchAsync(async (req, res) => {
  const query = getQuery(req);
  const result = await campaignService.queryCampaigns(query.filter, query.options);
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
  const { campaignId } = req.params;
  const { userId } = req.body;
  const user = await userService.getUserById(userId);
  if (user.role === DONOR && req.body.isVerified === true) {
    await userService.updateUserById(userId, { role: CAMPAIGNER });
  }
  const campaign = await campaignService.updateCampaignById(campaignId, req.body);
  res.send(campaign);
});

const deleteCampaign = catchAsync(async (req, res) => {
  await campaignService.deleteCampaignById(req.params.campaignId);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteManyCampaigns = catchAsync(async (req, res) => {
  const query = getQuery(req);
  let idArr = [];
  const result = await campaignService.queryCampaigns(query.filter, query.options);
  if (!isEmpty(query.filter) && !isEmpty(query.filter._id)) {
    idArr = query.filter._id.$in;
  }
  await Promise.all(
    // eslint-disable-next-line array-callback-return
    idArr.map((id) => {
      campaignService.deleteCampaignById(id);
    })
  );

  res.status(httpStatus.OK).send(result);
});

module.exports = {
  createCampaign,
  getCampaigns,
  getCampaign,
  updateCampaign,
  deleteCampaign,
  deleteManyCampaigns,
};
