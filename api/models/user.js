const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true, min: 3, max: 20 },
    lastName: { type: String, required: true, min: 3, max: 20 },
    email: { type: String, required: true, unique: true, max: 50 },
    password: { type: String, required: true, min: 6 },
    profile_image: { type: String }
}, { timestamps: true });


module.exports = mongoose.model("User", UserSchema);
