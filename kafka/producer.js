/*

This is the code for Producer in Kafka's server.
The job of Producer is to accept data from ES and send it to Consumer through the Kafka pipeline

*/

const kafka = require("../kafka");

const producer = kafka.producer();

async function startProducer() {
  await producer.connect();
  console.log("Producer Started");
}

async function sendMessage(topic, payload) {
  try {
    await producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(payload) }],
    });
    console.log(`Message sent to ${topic}:`, payload);
    // await producer.disconnect();
  } catch (error) {
    console.log("Producer error: ", error);
    await producer.disconnect();
  }
}

module.exports = { startProducer, sendMessage };
