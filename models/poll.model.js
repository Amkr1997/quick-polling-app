const mongoose = require("mongoose");

/*
const pollScehma = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: [
      {
        answer: { type: String, required: true },
        vote: { type: Number, required: true, default: 0 },
      },
    ],
  },
  { timeStamps: true }
);
*/

const pollScehma = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: [
      {
        choice: { type: String, required: true },
      },
    ],
  },
  { timeStamps: true }
);

const Poll = mongoose.model("Poll", pollScehma);
module.exports = Poll;
