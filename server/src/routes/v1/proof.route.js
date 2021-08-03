const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
const proofController = require('../../controllers/proof.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), proofController.createProof)
  .get(auth('getUsers'), proofController.getProofs)
  .delete(auth('manageUsers'), proofController.deleteManyProofs);

router
  .route('/:proofId')
  .get(auth('getUsers'), proofController.getProof)
  .patch(auth('manageUsers'), proofController.updateProof)
  .delete(auth('manageUsers'), proofController.deleteProof);

module.exports = router;
