import ampq from 'amqplib';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
export const startSendOptConsumer = async () => {
    try {
        const connection = await ampq.connect({
            protocol: "amqp",
            hostname: process.env.Rabbitm_Host,
            port: 5672,
            username: process.env.Rabbitmq_username,
            password: process.env.Rabbitmq_password
        });
        const channel = await connection.createChannel();
        const queueName = 'send-otp';
        await channel.assertQueue(queueName, { durable: true });
        console.log("✅ Mail service to consumer started , listing for opt emails");
        channel.consume(queueName, async (msg) => {
            if (msg) {
                try {
                    const { to, subject, body } = JSON.parse(msg.content.toString());
                    const transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        auth: {
                            user: process.env.USER,
                            pass: process.env.PASSWORD,
                        }
                    });
                    await transporter.sendMail({
                        from: "Chat App",
                        to,
                        subject,
                        text: body,
                    });
                    console.log(`OTP mail send to ${to}`);
                    channel.ack(msg);
                }
                catch (error) {
                    console.log("Failed to send otp", error);
                }
            }
        });
    }
    catch (error) {
        console.log("Failed to start rabbitMq consumer", error);
    }
};
//# sourceMappingURL=consumer.js.map