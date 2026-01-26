const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const googleId = profile.id;

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            fullName: profile.displayName,
            email,
            authProvider: "google",
            googleId: googleId,
            isAccountVerified: true,
            profileImageUrl: profile.photos[0]?.value || null,
          });
        } else {
          if (user.authProvider !== "google" || !user.googleId) {
            user.authProvider = "google";
            user.googleId = googleId;
            if (!user.profileImageUrl && profile.photos[0]?.value) {
              user.profileImageUrl = profile.photos[0].value;
            }
            await User.findOneAndUpdate(
              { _id: user._id },
              {
                authProvider: "google",
                googleId: googleId,
                ...(profile.photos[0]?.value && !user.profileImageUrl
                  ? { profileImageUrl: profile.photos[0].value }
                  : {}),
              },
              { new: true }
            );
            user = await User.findById(user._id);
          }
        }

        const token = generateToken(user._id);
        return done(null, { token });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
