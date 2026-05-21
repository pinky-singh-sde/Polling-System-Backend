import mongoose from "mongoose";

const nomineeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    party: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    votes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Nominee = mongoose.model("Nominee", nomineeSchema);

export default Nominee;