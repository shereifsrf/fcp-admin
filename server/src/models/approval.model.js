const moment = require('moment');
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const approvalSchema = mongoose.Schema(
  {
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    document: {
      data: Buffer,
      contentType: String,
    },
    isApproved: {
      type: Boolean,
      required: true,
      default: false,
    },
    limit: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
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
    expiresAt: {
      type: Date,
      required: true,
      default: moment().add(30, 'days'),
    },
    remarks: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
approvalSchema.plugin(toJSON);
approvalSchema.plugin(paginate);

const Approval = mongoose.model('CampaignApproval', approvalSchema);

module.exports = Approval;
