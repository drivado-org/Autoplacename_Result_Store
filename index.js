/*

This server acts as the convergence point for all that is happening in this kafka_test folder

*/
const express = require("express");
const { connectMongoDB } = require("./connections");
const router = require("./router/routes");
const { startProducer } = require("./kafka/producer");
const { startConsumer } = require("./kafka/consumer");
// const {
//   MONGO_HOST,
//   MONGO_INITDB_ROOT_USERNAME,
//   MONGO_INITDB_ROOT_PASSWORD,
//   MONGO_DB
//   } = require("./env")
// const { TOPICS } = require("./topics");
const { receiveMessage } = require("./kafka/consumer");

require("dotenv").config()
const app = express();
// const app2 = express();


app.use(express.json());
app.use("/results", router);
// app.listen(process.env.PORT, () => console.log("Server Started"));
app.listen(process.env.PORT, '0.0.0.0', () => console.log("Server Started"));

(async () => {
  await startProducer();
  await startConsumer();
})();

// const mongourl = "mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}"+"@${MONGO_HOST}/${MONGO_DB}?authSource=admin"
// const mongourl = "mongodb://mongo:27017/user-database"
const mongourl = process.env.MONGO_URL 
connectMongoDB(mongourl).then(() => {
  console.log("MongoDB connected");
});

(async () => {
  await receiveMessage();
})();
