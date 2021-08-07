const httpStatus = require('http-status');
const { isEmpty } = require('lodash');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { commentService } = require('../services');
const { getQuery } = require('../utils/helper');

const createComment = catchAsync(async (req, res) => {
  req.body.createdBy = req.user.id;
  const comment = await commentService.createComment(req.body);
  res.status(httpStatus.CREATED).send(comment);
});

const getComments = catchAsync(async (req, res) => {
  const query = getQuery(req);
  const result = await commentService.queryComments(query.filter, query.options);
  res.send(result);
});

const getComment = catchAsync(async (req, res) => {
  const comment = await commentService.getCommentById(req.params.commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  res.send(comment);
});

const updateComment = catchAsync(async (req, res) => {
  const comment = await commentService.updateCommentById(req.params.commentId, req.body);
  res.send(comment);
});

const deleteComment = catchAsync(async (req, res) => {
  await commentService.deleteCommentById(req.params.commentId);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteManyComments = catchAsync(async (req, res) => {
  const query = getQuery(req);
  let idArr = [];
  const result = await commentService.queryComments(query.filter, query.options);
  if (!isEmpty(query.filter) && !isEmpty(query.filter._id)) {
    idArr = query.filter._id.$in;
  }
  await Promise.all(
    // eslint-disable-next-line array-callback-return
    idArr.map((id) => {
      commentService.deleteCommentById(id);
    })
  );

  res.status(httpStatus.OK).send(result);
});

module.exports = {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
  deleteManyComments,
};
