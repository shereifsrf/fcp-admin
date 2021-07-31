const Joi = require('joi');
const { CAMPAIGNER, DONOR, ADMIN } = require('../config/roles');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid(ADMIN, CAMPAIGNER, DONOR),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    filter: Joi.string(),
    name: Joi.string(),
    role: Joi.string(),
    sort: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    range: Joi.string(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      rating: Joi.number(),
      isEmailVerified: Joi.boolean(),
      isActive: Joi.boolean(),
      role: Joi.string(),
      updatedBy: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
