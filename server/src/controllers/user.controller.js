const httpStatus = require('http-status');
const { isEmpty } = require('lodash');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { getQuery } = require('../utils/helper');
const { ADMIN, MASTER } = require('../config/roles');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  // const userInCharge = req.user;
  const query = getQuery(req);
  const result = await userService.queryUsers(query.filter, query.options);
  // result.results = result.results.filter((r) => userInCharge.id !== r.id);
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
  const userInCharge = req.user;
  const { userId } = req.params;
  const userToUpdate = await userService.getUserById(userId);
  if (userInCharge.role === MASTER || ([ADMIN, MASTER].includes(userToUpdate) && userInCharge.id !== userId)) {
    const user = await userService.updateUserById(userId, req.body);
    res.send(user);
  } else {
    res.status(httpStatus.UNAUTHORIZED).send();
  }
});

const deleteUser = catchAsync(async (req, res) => {
  const userInCharge = req.user;
  const { userId } = req.params;
  const userToUpdate = await userService.getUserById(userId);
  if (userInCharge.role === MASTER || ([ADMIN, MASTER].includes(userToUpdate) && userInCharge.id !== userId)) {
    await userService.deleteUserById(req.params.userId);
    res.status(httpStatus.NO_CONTENT).send();
  } else {
    res.status(httpStatus.UNAUTHORIZED).send();
  }
});

const deleteManyUsers = catchAsync(async (req, res) => {
  const userInCharge = req.user;
  const query = getQuery(req);
  const { filter } = query;
  let idArr = [];
  const checkUICExist = (d) => d === userInCharge.id;
  if (filter._id && filter._id.$in && filter._id.$in.some(checkUICExist)) {
    filter._id = filter._id.$in.pop(userInCharge.id);
  }
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
