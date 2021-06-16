const { Kafka } = require("kafkajs");

async function consume() {
  const kafka = new Kafka({
    clientId: "test-app-client",
    brokers: ["localhost:9092"],
  });

  const consumer = kafka.consumer({ groupId: "test-app-group" });
  await consumer.connect();
  console.log("Consumer conected");

  await consumer.subscribe({
    topic: "hello.topic",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async (ans) => {
      console.log(ans);
    },
  });
}

consume();
