import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.get('/_ping', (_req, res) => {
  res.send('pong\n');
});

export default app;
