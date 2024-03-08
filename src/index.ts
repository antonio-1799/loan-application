import app from './app';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.port) || 8000;
const HOST = process.env.host || 'localhost';

app.listen(PORT, HOST, () => {
  console.log('Listening on %s:%d...', HOST || '*', PORT);
});
