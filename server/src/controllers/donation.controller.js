const httpStatus = require('http-status');
const { isEmpty } = require('lodash');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { donationService } = require('../services');
const { getQuery } = require('../utils/helper');

const createDonation = catchAsync(async (req, res) => {
  req.body.createdBy = req.user.id;
  const donation = await donationService.createDonation(req.body);
  res.status(httpStatus.CREATED).send(donation);
});

const getDonations = catchAsync(async (req, res) => {
  const query = getQuery(req);
  const result = await donationService.queryDonations(query.filter, query.options);
  res.send(result);
});

const getDonation = catchAsync(async (req, res) => {
  const donation = await donationService.getDonationById(req.params.donationId);
  if (!donation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Donation not found');
  }
  res.send(donation);
});

const updateDonation = catchAsync(async (req, res) => {
  const donation = await donationService.updateDonationById(req.params.donationId, req.body);
  res.send(donation);
});

const deleteDonation = catchAsync(async (req, res) => {
  await donationService.deleteDonationById(req.params.donationId);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteManyDonations = catchAsync(async (req, res) => {
  const query = getQuery(req);
  let idArr = [];
  const result = await donationService.queryDonations(query.filter, query.options);
  if (!isEmpty(query.filter) && !isEmpty(query.filter._id)) {
    idArr = query.filter._id.$in;
  }
  await Promise.all(
    // eslint-disable-next-line array-callback-return
    idArr.map((id) => {
      donationService.deleteDonationById(id);
    })
  );

  res.status(httpStatus.OK).send(result);
});

module.exports = {
  createDonation,
  getDonations,
  getDonation,
  updateDonation,
  deleteDonation,
  deleteManyDonations,
};
