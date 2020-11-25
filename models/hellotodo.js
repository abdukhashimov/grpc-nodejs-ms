const mongoose = require("mongoose");
const Joi = require("joi");

const HelloSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const helloValidationSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  body: Joi.string().min(3).max(100).required(),
}).options({ allowUnknown: true });

module.exports.helloValidationSchema = helloValidationSchema;
module.exports.Hello = mongoose.model("Hello", HelloSchema);
