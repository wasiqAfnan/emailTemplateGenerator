import express from 'express';
import emailRoutes from './routers/email.routes.js';
import {requestLogger} from "./middlewares/requestLogger.js";

const app = express();

app.use(express.json());

app.use(requestLogger); // Add request logger middleware

app.use('/api/email', emailRoutes);

export default app;