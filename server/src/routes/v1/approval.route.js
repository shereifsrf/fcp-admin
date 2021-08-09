const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
const approvalController = require('../../controllers/approval.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), approvalController.createApproval)
  .get(auth('getUsers'), approvalController.getApprovals)
  .delete(auth('manageUsers'), approvalController.deleteManyApprovals);

router
  .route('/:approvalId')
  .get(auth('getUsers'), approvalController.getApproval)
  .patch(auth('manageUsers'), approvalController.updateApproval)
  .delete(auth('manageUsers'), approvalController.deleteApproval);

module.exports = router;
