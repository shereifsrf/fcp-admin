const { isEmpty } = require('lodash');
const mongoose = require('mongoose');
const pick = require('./pick');

const getQuery = (req) => {
  req.query.filter = JSON.parse(req.query.filter);
  if (!isEmpty(req.query.filter.id)) {
    req.query.filter._id = req.query.filter.id;
    delete req.query.filter.id;
  }
  // req.query.sortBy = JSON.parse(req.query.sortBy);
  // if (!isEmpty(req.query.sortBy)) {
  //   req.query.sortBy._id = req.query.sortBy.id;
  //   delete req.query.sortBy.id;
  // }
  const filter = pick(req.query.filter, ['name', 'role', '_id', 'campaignId']);
  if (!isEmpty(filter.campaignId)) {
    filter.campaignId = mongoose.Types.ObjectId(filter.campaignId);
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  return { filter, options };
};

module.exports = {
  getQuery,
};
