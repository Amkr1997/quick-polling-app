const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const initialization = async () => {
  try {
    const dbConnect = await mongoose.connect(process.env.MONGO_URI);

    if (dbConnect) {
      console.log("Connected to mongoDB");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { initialization };
