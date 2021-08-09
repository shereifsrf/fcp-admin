const httpStatus = require('http-status');
const { isEmpty, omit } = require('lodash');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { approvalService, campaignService, userService, emailService } = require('../services');
const { getQuery } = require('../utils/helper');

const createApproval = catchAsync(async (req, res) => {
  req.body.createdBy = req.user.id;
  const approval = await approvalService.createApproval(req.body);
  res.status(httpStatus.CREATED).send(approval);
});

const getApprovals = catchAsync(async (req, res) => {
  const query = getQuery(req);
  const result = await approvalService.queryApprovals(query.filter, query.options);
  res.send(result);
});

const getApproval = catchAsync(async (req, res) => {
  const approval = await approvalService.getApprovalById(req.params.approvalId);
  if (!approval) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Approval not found');
  }
  approval.remarks = '';
  res.send(approval);
});

const updateApproval = catchAsync(async (req, res) => {
  const campaign = await campaignService.getCampaignById(req.body.campaignId);
  const user = await userService.getUserById(campaign.userId);

  if (req.body.isDelete === true && req.body.isApproved === true) {
    const approval = await approvalService.getApprovalById(req.params.approvalId);
    await campaignService.deleteCampaignById(req.body.campaignId);
    await approvalService.deleteApprovalById(req.params.approvalId);
    await emailService.sendCampaignDeleteEmail(user.email, req.body.name);

    res.send(approval);
  } else {
    if (req.body.isReject) {
      await emailService.sendCampaignUpdateEmail(user.email, req.body.remarks, 'Changes Rejected', req.body.name);
    } else await emailService.sendCampaignUpdateEmail(user.email, req.body.remarks, 'Changes Approved', req.body.name);

    if (campaign && campaign.isVerified && req.body.isApproved) {
      await campaignService.updateCampaignById(
        req.body.campaignId,
        omit(req.body, ['isApproved', 'campaignId', 'updatedAt', 'updatedBy'])
      );
    }
    const approval = await approvalService.updateApprovalById(req.params.approvalId, {
      ...req.body,
      isApproved: true,
      isDelete: false,
    });
    res.send(approval);
  }
});

const deleteApproval = catchAsync(async (req, res) => {
  await approvalService.deleteApprovalById(req.params.approvalId);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteManyApprovals = catchAsync(async (req, res) => {
  const query = getQuery(req);
  let idArr = [];
  const result = await approvalService.queryApprovals(query.filter, query.options);
  if (!isEmpty(query.filter) && !isEmpty(query.filter._id)) {
    idArr = query.filter._id.$in;
  }
  await Promise.all(
    // eslint-disable-next-line array-callback-return
    idArr.map((id) => {
      approvalService.deleteApprovalById(id);
    })
  );

  res.status(httpStatus.OK).send(result);
});

module.exports = {
  createApproval,
  getApprovals,
  getApproval,
  updateApproval,
  deleteApproval,
  deleteManyApprovals,
};
