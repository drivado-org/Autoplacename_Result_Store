const { sendMessage } = require("../kafka/producer");
// const { receiveMessage } = require("../consumer/consumer");
const { TOPICS } = require("../topics");

const googleData = async (req, res) => {
  const body = req.body;

  if (!body || !body.success || !body.query || !body.result) {
    return res.status(400).json({ msg: "Missing fields" });
  }

  // console.log(result)
  await sendMessage(TOPICS.GOOGLE_RESULT, body);
  // await receiveMessage(TOPICS.GOOGLE_RESULT);
  return res.status(201).json({ msg: "Success" });
};

module.exports = googleData;
