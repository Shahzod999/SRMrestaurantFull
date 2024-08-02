const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const menuSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  desc: { type: String, required: true },
  amount: { type: Boolean, required: false },
  foodId: { type: String, required: true },
  createdOn: { type: Date, default: new Date().getTime() },
});

module.exports = mongoose.model("Menu", menuSchema);
