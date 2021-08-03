const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const proofSchema = mongoose.Schema(
  {
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true,
    },
    isChecked: {
      type: Boolean,
      default: false,
      required: true,
    },
    document: {
      data: Buffer,
      contentType: String,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    remark: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
proofSchema.plugin(toJSON);
proofSchema.plugin(paginate);

const Proof = mongoose.model('CampaignProof', proofSchema);

module.exports = Proof;
