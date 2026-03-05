/*

This is the code for Consumer in Kafka's server
The job of Consumer is to accpet data from the Kafka pipeline and save it into MongoDB

*/

// const {kafka} = require("../kafka");
const { TOPICS } = require("./topics");
const { saveData } = require("../controllers/saveData");


// async function startConsumer() {
//   await consumer.connect();

//   console.log("Consumer connected");
// }

async function runConsumer({kafka, groupId, topic}) {
  try {
    const consumer = kafka.consumer({ groupId })
    await consumer.connect()
    console.log (`Consumer receiving topic ${topic} started`)
    await consumer.subscribe({
      topic,
      fromBeginning: false,
    });
    await consumer.run({
      eachMessage: (async ({ topic, partition, message }) => {
        console.log(`Recieved message: ${topic} ${partition} ${message.toString()}`);
        await saveData(topic, JSON.parse(message.value));
      }),
    });
    
  } catch (error) {
    console.error(`Consumer running ${topic} ran into an error`, error);
  }
}

module.exports = { runConsumer };











  // console.log("I am here")
    
    // const { events } = consumer;
    // consumer.on(events.GROUP_JOIN, e => {
    //   console.log("GROUP JOINED");
    //   console.log("Assigned topics and partitions:");
    //   console.log(JSON.stringify(e.payload));
    // });

    // const admin = kafka.admin();
    // await admin.connect();

    // const meta = await admin.fetchTopicMetadata({ topics: ["drivado.search.clicked.topic", "drivado.search.backup.topic"] });
    // for (const t of meta.topics) {
    //   console.log(t.name, "partitions:", t.partitions.length);
    //   console.log(t)
    // }

    // await admin.disconnect();



    // const { events } = consumer;
    // consumer.on(events.GROUP_JOIN, e => {
    //   console.log("GROUP JOINED");
    //   console.log("Assigned topics and partitions:");
    //   console.log(JSON.stringify(e.payload));
    // });

    // const admin = kafka.admin();
    // await admin.connect();
    // console.log("Admin connected")
    // const list = await admin.listTopics()
    // console.log(list)
    // const meta = await admin.fetchTopicMetadata({ topics: ["drivado.search.clicked.topic", "drivado.search.backup.topic", "drivado.search.ors.topic"] });
    // for (const t of meta.topics) {
    //   console.log(t.name, "partitions:", t.partitions.length);
    //   console.log(t)
    // }