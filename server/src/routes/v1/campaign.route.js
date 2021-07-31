const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
const campaignController = require('../../controllers/campaign.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), campaignController.createCampaign)
  .get(auth('getUsers'), campaignController.getCampaigns);

router
  .route('/:campaignId')
  .get(auth('getUsers'), campaignController.getCampaign)
  .patch(auth('manageUsers'), campaignController.updateCampaign)
  .delete(auth('manageUsers'), campaignController.deleteCampaign);

module.exports = router;
