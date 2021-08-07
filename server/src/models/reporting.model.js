const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const reportingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isChecked: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
reportingSchema.plugin(toJSON);
reportingSchema.plugin(paginate);

const Reporting = mongoose.model('CampaignReporting', reportingSchema);

module.exports = Reporting;
