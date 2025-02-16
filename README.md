API Endpoints

1. Add Question
   Endpoint: POST /post/question

2. Get Polls
   Endpoint: GET /get/poll

3. Post Answer
   Endpoint: POST /post/answer/:answerId/choice/:choiceId

4. Get All Answers
   Endpoint: GET /all/polls/answers

Poll Schema-:

const mongoose = require("mongoose");

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

Answer Schema-:

const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
answer: { type: String, required: true },
});

const Answer = mongoose.model("PollAnswer", answerSchema);
module.exports = Answer;
