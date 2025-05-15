// controllers/bookController.ts
import { Request, Response, NextFunction } from 'express';
import { getAllBooksFromCSV } from '../services/bookService';

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await getAllBooksFromCSV();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};
