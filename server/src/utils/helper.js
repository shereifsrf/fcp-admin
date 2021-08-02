const { isEmpty } = require('lodash');
const pick = require('./pick');

const getQuery = (req) => {
  req.query.filter = JSON.parse(req.query.filter);
  if (!isEmpty(req.query.filter.id)) {
    req.query.filter._id = req.query.filter.id;
    delete req.query.filter.id;
  }
  const filter = pick(req.query.filter, ['name', 'role', '_id', 'campaignId']);
  const options = pick(req.query, ['sort', 'limit', 'page']);
  return { filter, options };
};

module.exports = {
  getQuery,
};
