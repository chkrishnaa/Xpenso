const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            min: 2,
            max: 255,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            min: 10,
            max: 255,
        },
        password: {
            type: String,
            required:true,
            min: 8,
        },
        profileImageUrl: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});


userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);
module.exports = User;