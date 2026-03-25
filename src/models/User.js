const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: String,
    googleId: String,
    facebookId: String,
    verified: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      default: "user"
    }
  },
  { timestamps: true }
);

userSchema.statics.findOneOrCreateByGoogle = async function (profile) {
  const email = profile.emails?.[0]?.value;

  if (!email) {
    throw new Error("Google profile no trae email");
  }

  let user = await this.findOne({ email });

  if (!user) {
    user = await this.create({
      first_name: profile.name?.givenName || "",
      last_name: profile.name?.familyName || "",
      email,
      googleId: profile.id,
      verified: true
    });
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);