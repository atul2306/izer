
const mongoose = require("mongoose");
const bcrypt=require("bcrypt");
const iezarSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  Bio: String,
  confirmed: {
    type: Boolean,
    default: false,
  },
  interest:String
});




iezarSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) return user;
    return "Incorrect Password!!!";
  }
  return "Incorrect Email!!!";
};
const User = mongoose.model("iezarSchema", iezarSchema);
module.exports = User;
