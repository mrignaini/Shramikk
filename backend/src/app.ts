import express from 'express';
import cors from 'cors';
import { config } from './config';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import { requestLogger } from './middleware/request-logger.middleware';

import healthRoutes from './routes/health.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import workerRoutes from './routes/worker.routes';
import hirerRoutes from './routes/hirer.routes';
import skillRoutes from './routes/skill.routes';
import jobRoutes from './routes/job.routes';
import applicationRoutes from './routes/application.routes';
import schemeRoutes from './routes/scheme.routes';
import insuranceRoutes from './routes/insurance.routes';
import notificationRoutes from './routes/notification.routes';
import paymentRoutes from './routes/payment.routes';
import aiRoutes from './routes/ai.routes';

const app = express();

app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  })
);

app.use(express.json());
app.use(requestLogger);

// Mount foundational REST API routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/hirers', hirerRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/ai', aiRoutes);


app.use(notFoundHandler);
app.use(errorHandler);

export default app;
