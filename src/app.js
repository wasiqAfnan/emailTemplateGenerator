import express from 'express';
import emailRoutes from './routers/email.routes.js';

const app = express();

app.use(express.json());

app.use('/api/email', emailRoutes);

export default app;