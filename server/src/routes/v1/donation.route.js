const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
const donationController = require('../../controllers/donation.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), donationController.createDonation)
  .get(auth('getUsers'), donationController.getDonations)
  .delete(auth('manageUsers'), donationController.deleteManyDonations);

router
  .route('/:donationId')
  .get(auth('getUsers'), donationController.getDonation)
  .patch(auth('manageUsers'), donationController.updateDonation)
  .delete(auth('manageUsers'), donationController.deleteDonation);

module.exports = router;
