const httpStatus = require('http-status');
const { isEmpty } = require('lodash');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { getQuery } = require('../utils/helper');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const query = getQuery(req);
  const result = await userService.queryUsers(query.filter, query.options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteManyUsers = catchAsync(async (req, res) => {
  const query = getQuery(req);
  let idArr = [];
  const result = await userService.queryUsers(query.filter, query.options);
  if (!isEmpty(query.filter) && !isEmpty(query.filter._id)) {
    idArr = query.filter._id.$in;
  }
  await Promise.all(
    // eslint-disable-next-line array-callback-return
    idArr.map((id) => {
      userService.deleteCampaignById(id);
    })
  );

  res.status(httpStatus.OK).send(result);
});

module.exports = {
  createUser,
  getUsers,
  deleteManyUsers,
  getUser,
  updateUser,
  deleteUser,
};
