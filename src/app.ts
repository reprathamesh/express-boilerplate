import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import { env } from './config/app.config';
import apiV1 from './api/v1/api.routes';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const limiter = rateLimit({ windowMs: Number(env.RATE_LIMIT_WINDOW_MS), max: Number(env.RATE_LIMIT_MAX) });
app.use(limiter);

app.use(requestLogger);

app.use('/api/v1', apiV1);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
