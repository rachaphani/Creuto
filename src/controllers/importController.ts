import { Request, Response } from 'express';
import * as bookService from '../services/bookService';
import fs from 'fs';
import readline from 'readline';

export const importBooks = async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ message: 'CSV file is required' });

  const filePath = req.file.path;
  const stream = fs.createReadStream(filePath);
  const rl = readline.createInterface({ input: stream });

  const errorRows: string[] = [];
  let addedBooksCount = 0;
  let rowNumber = 1;

  for await (const line of rl) {
    const [title, author, yearStr] = line.split(',');
    const publishedYear = parseInt(yearStr);
    if (!title || !author || isNaN(publishedYear)) {
      errorRows.push(`Row ${rowNumber}: Invalid or missing fields`);
    } else {
      bookService.addBook({ title, author, publishedYear });
      addedBooksCount++;
    }
    rowNumber++;
  }

  fs.unlinkSync(filePath);
  res.json({ addedBooksCount, errorRows });
};
