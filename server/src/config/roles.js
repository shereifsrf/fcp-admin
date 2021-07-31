const PUBLIC = 'PUBLIC';
const DONOR = 'DONOR';
const CAMPAIGNER = 'CAMPAIGNER';
const ADMIN = 'ADMIN';

const allRoles = {
  // user: [],
  ADMIN: ['getUsers', 'manageUsers'],
  CAMPAIGNER: [],
  DONOR: [],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
  PUBLIC,
  DONOR,
  CAMPAIGNER,
  ADMIN,
};
