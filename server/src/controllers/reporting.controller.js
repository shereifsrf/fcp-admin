const httpStatus = require('http-status');
const { isEmpty } = require('lodash');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { reportingService } = require('../services');
const { getQuery } = require('../utils/helper');

const createReporting = catchAsync(async (req, res) => {
  req.body.createdBy = req.user.id;
  const reporting = await reportingService.createReporting(req.body);
  res.status(httpStatus.CREATED).send(reporting);
});

const getReportings = catchAsync(async (req, res) => {
  const query = getQuery(req);
  const result = await reportingService.queryReportings(query.filter, query.options);
  res.send(result);
});

const getReporting = catchAsync(async (req, res) => {
  const reporting = await reportingService.getReportingById(req.params.reportingId);
  if (!reporting) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reporting not found');
  }
  res.send(reporting);
});

const updateReporting = catchAsync(async (req, res) => {
  const reporting = await reportingService.updateReportingById(req.params.reportingId, req.body);
  res.send(reporting);
});

const deleteReporting = catchAsync(async (req, res) => {
  await reportingService.deleteReportingById(req.params.reportingId);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteManyReportings = catchAsync(async (req, res) => {
  const query = getQuery(req);
  let idArr = [];
  const result = await reportingService.queryReportings(query.filter, query.options);
  if (!isEmpty(query.filter) && !isEmpty(query.filter._id)) {
    idArr = query.filter._id.$in;
  }
  await Promise.all(
    // eslint-disable-next-line array-callback-return
    idArr.map((id) => {
      reportingService.deleteReportingById(id);
    })
  );

  res.status(httpStatus.OK).send(result);
});

module.exports = {
  createReporting,
  getReportings,
  getReporting,
  updateReporting,
  deleteReporting,
  deleteManyReportings,
};
