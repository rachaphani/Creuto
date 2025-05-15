import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bookRoutes from './routes/bookRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/books', bookRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
