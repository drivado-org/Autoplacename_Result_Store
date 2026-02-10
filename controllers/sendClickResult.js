const { sendMessage } = require("../kafka/producer");
// const { receiveMessage } = require("../consumer/consumer");
const { TOPICS } = require("../topics");

const clickData = async (req, res) => {
  const body = req.body;
  if (!body || !body.query || !body.result) {
    return res.status(400).json({ msg: "Missing fields" });
  }

  await sendMessage(TOPICS.CLICKED_VALUE, body);
  // await receiveMessage(TOPICS.CLICKED_VALUE);
  return res.status(201).json({ msg: "Success" });
};

module.exports = clickData;
