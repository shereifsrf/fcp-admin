const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const donationSchema = mongoose.Schema(
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
    amount: {
      type: Number,
      min: [1, 'Min donation is 1'],
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
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
donationSchema.plugin(toJSON);
donationSchema.plugin(paginate);

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
