import express from 'express';
import dotenv from 'dotenv';
import { startSendOptConsumer } from './consumer.js';
dotenv.config();
startSendOptConsumer();
const app = express();
app.listen(process.env.PORT, () => {
    console.log(`Server start on port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map