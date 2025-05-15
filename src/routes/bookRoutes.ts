// routes/bookRoutes.ts
import { Router } from 'express';
import * as bookController from '../controllers/bookController';

const router = Router();

router.get('/books', bookController.getBooks);

export default router;
