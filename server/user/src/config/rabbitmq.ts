import amql from 'amqplib'

let chennel : amql.Channel;

export const connectRabbitMQ = async() => {
  try {
    const connection = await amql.connect({
      protocol:"amqp",
      hostname:process.env.Rabbitm_Host,
      port:5672,
      username:process.env.Rabbitmq_username,
      password:process.env.Rabbitmq_password
    });
    chennel = await connection.createChannel()
    console.log("✅ Connected to rabbitMq")
    
  } catch (error) {
    console.log("Failed to connect to rabbitMq",error)
  }
};


export const publishToQueue = async (queueName:string, message:any) => {
if(!chennel) {
  console.log("Rabbitmq Channel is not initailized");
  return;
}

await chennel.assertQueue(queueName,{durable:true});
chennel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)),{
  persistent:true,
})

}