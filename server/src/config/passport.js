const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('./config');
// const { tokenTypes } = require('./tokens');
const { User } = require('../models');
const { ADMIN, MASTER } = require('./roles');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    // if (payload.type !== tokenTypes.ACCESS) {
    //   throw new Error('Invalid token type');
    // }
    const user = await User.findById(payload.sub);

    if (!user) {
      return done(null, false);
    }
    if (![MASTER, ADMIN].includes(user.role)) {
      return done(null, false, 'Not Authorized');
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
