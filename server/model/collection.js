const mongoose = require("mongoose");

const CollectionSchema = mongoose.Schema({
  banner_image_url: { type: String },
  primary_asset_contracts: { type: mongoose.Schema.Types.Mixed },
  traits: { type: Map },
  stats: { type: Map },
  discord_url: { type: String },
  external_url: { type: String },
  image_url: { type: String },
  twitter_username: { type: String },
  instagram_username: { type: mongoose.Schema.Types.Mixed },
});

module.exports = mongoose.model("collection", CollectionSchema, "Collections");
