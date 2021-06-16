const { Kafka } = require("kafkajs");

async function createPartition() {
  const kafka = new Kafka({
    clientId: "player-jersey",
    brokers: ["127.0.01:9092"],
  });

  const admin = kafka.admin();
  await admin.connect();

  await admin.createTopics({
    topics: [
      {
        topic: "jersey",
        numPartitions: 2,
      },
    ],
  });
  console.log("2 Partitions created");
}

createPartition();
