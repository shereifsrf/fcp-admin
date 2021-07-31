const mongoose = require('mongoose');
const moment = require('moment');
const { toJSON, paginate } = require('./plugins');

const campaignSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
    isVerified: {
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
    isVerifyDocument: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
campaignSchema.plugin(toJSON);
campaignSchema.plugin(paginate);

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
