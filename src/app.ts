import express from 'express';
import * as dotenv from 'dotenv';
import router from './routes/BaseRoute';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(process.env.PREFIX || '/v1/api', router);

export default app;
