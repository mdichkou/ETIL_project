const mongoose = require("mongoose");

const { Schema } = mongoose;

const ArticleSchema = new Schema({
  name: String,
  serie: String,
  author: String,
  place: String,
  image: String,
  audio: String,
  description: String,
  created_at: Date
});

mongoose.model("Article", ArticleSchema);
