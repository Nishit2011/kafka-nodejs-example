const { Kafka } = require("kafkajs");

async function produce() {
  const kafka = new Kafka({
    clientId: "player-jersey",
    brokers: ["127.0.0.1:9092"],
  });
  //console.log(process.argv);
  const jerseyNumber = process.argv[2];

  const producer = kafka.producer();
  await producer.connect();
  console.log("Producer conected");

  const players = {
    7: "Dhoni",
    18: "Virat",
    10: "Sachin",
    99: "Prithvi",
    45: "Rohit",
  };

  const producedData = await producer.send({
    topic: "jersey",
    messages: [
      { value: players[jerseyNumber], partition: jerseyNumber <= 10 ? 0 : 1 },
    ],
  });
  console.log(`Produced data ${JSON.stringify(producedData)}`);
}

produce();
