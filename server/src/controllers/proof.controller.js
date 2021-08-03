const httpStatus = require('http-status');
const { isEmpty } = require('lodash');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { proofService } = require('../services');
const { getQuery } = require('../utils/helper');

const createProof = catchAsync(async (req, res) => {
  req.body.createdBy = req.user.id;
  const proof = await proofService.createProof(req.body);
  res.status(httpStatus.CREATED).send(proof);
});

const getProofs = catchAsync(async (req, res) => {
  const query = getQuery(req);
  const result = await proofService.queryProofs(query.filter, query.options);
  res.send(result);
});

const getProof = catchAsync(async (req, res) => {
  const proof = await proofService.getProofById(req.params.proofId);
  if (!proof) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Proof not found');
  }
  res.send(proof);
});

const updateProof = catchAsync(async (req, res) => {
  const proof = await proofService.updateProofById(req.params.proofId, req.body);
  res.send(proof);
});

const deleteProof = catchAsync(async (req, res) => {
  await proofService.deleteProofById(req.params.proofId);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteManyProofs = catchAsync(async (req, res) => {
  const query = getQuery(req);
  let idArr = [];
  const result = await proofService.queryProofs(query.filter, query.options);
  if (!isEmpty(query.filter) && !isEmpty(query.filter._id)) {
    idArr = query.filter._id.$in;
  }
  await Promise.all(
    // eslint-disable-next-line array-callback-return
    idArr.map((id) => {
      proofService.deleteProofById(id);
    })
  );

  res.status(httpStatus.OK).send(result);
});

module.exports = {
  createProof,
  getProofs,
  getProof,
  updateProof,
  deleteProof,
  deleteManyProofs,
};
