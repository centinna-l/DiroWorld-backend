const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const promptSchema = mongoose.Schema(
  {
    prompt_id: { type: String },
    data: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prompt", promptSchema);
