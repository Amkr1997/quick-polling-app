const { initialization } = require("./db/db.connect");
const Poll = require("./models/poll.model");

initialization();

const express = require("express");
const cors = require("cors");
const Answer = require("./models/answer.model");

const app = express();
const corsOptions = {
  origin: "*",
  credentials: true,
  openSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => res.send("Express Started"));

// Add Question
app.post("/post/question", async (req, res) => {
  const pollData = req.body;

  try {
    if (!pollData) return res.status(500).json({ error: "Fill Data first" });

    const newPoll = new Poll({
      question: pollData.question,
      options: pollData.options.map((option) => ({
        choice: option,
      })),
    });
    const savedPoll = await newPoll.save();

    if (!savedPoll)
      return res.status(404).json({ message: "Poll cannot get save" });

    return res.status(200).json({ message: "Poll saved", savedPoll });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Get Poll
app.get("/get/poll", async (req, res) => {
  try {
    const allPolls = await Poll.find();

    if (!allPolls)
      return res.status(404).json({ message: "Poll cannot get fetch" });

    return res.status(200).json({ message: "Poll fetched", allPolls });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Post Answer
app.post("/post/answer/:answerId/choice/:choiceId", async (req, res) => {
  const answerId = req.params.answerId;
  const choiceId = req.params.choiceId;
  //const pollData = req.body;

  try {
    if (!answerId || !choiceId)
      return res.status(500).json({ error: "Fill Data first" });

    const foundPoll = await Poll.findById(answerId);
    const answeredPoll = foundPoll.options.find((data) =>
      data._id.equals(choiceId)
    );

    const newAnswer = new Answer({ answer: answeredPoll.choice });
    const savedAnswer = await newAnswer.save();

    if (!savedAnswer)
      return res
        .status(404)
        .json({ message: "Not correct poll Id or choice Id" });

    return res.status(200).json({ message: "Choice saved", savedAnswer });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Get All Answers
app.get("/all/polls/answers", async (req, res) => {
  try {
    const allAnswers = await Answer.find();

    if (!allAnswers)
      return res.status(404).json({ message: "Answer cannot get fetch" });

    return res.status(200).json({ message: "Answers fetched", allAnswers });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log("Server running in PORT", PORT));
