const mongoose = require("mongoose");

const { Schema } = mongoose;

const PlaceSchema = new Schema({
  name: String,
  address: String,
  serie: String,
  author: String,
  city: String,
  latitude: String,
  longitude: String,
  image: String,
  image360: String,
  description: String,
  created_at: Date
});

mongoose.model("Place", PlaceSchema);
