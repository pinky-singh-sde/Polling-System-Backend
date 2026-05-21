import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    nomineeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nominee",
      required: true,
    },

    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vote = mongoose.model("Vote", voteSchema);

export default Vote;