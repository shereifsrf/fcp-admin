const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const categoryRoute = require('./category.route');
const campaignRoute = require('./campaign.route');
const proofRoute = require('./proof.route');
const commentRoute = require('./comment.route');
const donationRoute = require('./donation.route');
const reportingRoute = require('./reporting.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/categories',
    route: categoryRoute,
  },
  {
    path: '/campaigns',
    route: campaignRoute,
  },
  {
    path: '/campaignproofs',
    route: proofRoute,
  },
  {
    path: '/campaignreportings',
    route: reportingRoute,
  },
  {
    path: '/campaigncomments',
    route: commentRoute,
  },
  {
    path: '/campaigndonations',
    route: donationRoute,
  },
  {
    path: '/status',
    route: (req, res) => res.send('OK'),
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
