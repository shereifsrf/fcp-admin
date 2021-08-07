const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
const reportingController = require('../../controllers/reporting.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), reportingController.createReporting)
  .get(auth('getUsers'), reportingController.getReportings)
  .delete(auth('manageUsers'), reportingController.deleteManyReportings);

router
  .route('/:reportingId')
  .get(auth('getUsers'), reportingController.getReporting)
  .patch(auth('manageUsers'), reportingController.updateReporting)
  .delete(auth('manageUsers'), reportingController.deleteReporting);

module.exports = router;
