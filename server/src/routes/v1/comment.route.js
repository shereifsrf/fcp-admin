const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
const commentController = require('../../controllers/comment.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), commentController.createComment)
  .get(auth('getUsers'), commentController.getComments)
  .delete(auth('manageUsers'), commentController.deleteManyComments);

router
  .route('/:commentId')
  .get(auth('getUsers'), commentController.getComment)
  .patch(auth('manageUsers'), commentController.updateComment)
  .delete(auth('manageUsers'), commentController.deleteComment);

module.exports = router;
