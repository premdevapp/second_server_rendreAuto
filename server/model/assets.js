const mongoose = require("mongoose");

const AssetsSchema =  mongoose.Schema({
  name: { type: String },
  assets: { type: mongoose.Schema.Types.Mixed },
});

module.exports = mongoose.model("asset", AssetsSchema, "Assets");
