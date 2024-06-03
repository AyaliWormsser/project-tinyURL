import mongoose from "mongoose";

const clickSchema = new mongoose.Schema(
  {
    insertedAt: {
      type: Date,
      default: Date.now,
    },
    ipAddress: {
      type: String,
      default: "0.0.0.0",
    },
    targetParamValue: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const LinkSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },

  clicks: [clickSchema],
  targetParamName: String, // Add the targetParamName field
  targetValues: [
    {
      name: String,
      value: String,
    },
  ],
});
const Link = mongoose.model("Link", LinkSchema);

export { LinkSchema };
export default Link;
