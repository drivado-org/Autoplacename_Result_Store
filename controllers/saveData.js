const { clickValue, googleValue } = require("../models/schema");

const { TOPICS } = require("../topics");

async function saveData(topic, messages) {

  if (topic == TOPICS.CLICKED_VALUE) {
    await clickValue.create({
      query: messages.query,
      result: messages.result,
      source: messages.source,
    });
    console.log("Saved click data to MongoDB");

  } 
  else if (topic == TOPICS.GOOGLE_RESULT){
    await googleValue.create({
      success: messages.success,
      query: messages.query,
      count: messages.count,
      result: messages.result,
      source: messages.source,
    });

    console.log("Saved google data to MongoDB");
  }
}

module.exports = { saveData };
