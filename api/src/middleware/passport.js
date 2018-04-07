const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const appConfig = require('../infrastructure/application-configuration');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: appConfig.JWT_SECRET,
};

passport.use(new JwtStrategy(options, (jwtPayload, done) => {
  return done(null, jwtPayload);
}));

module.exports = passport;
