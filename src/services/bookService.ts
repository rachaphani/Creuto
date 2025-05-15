// services/bookService.ts
import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';

export const getAllBooksFromCSV = (): Promise<any[]> => {
  const books: any[] = [];
  const filePath = path.join(__dirname, '../data/books.csv');

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        // Convert publishedYear to number
        books.push({
          id: row.id,
          title: row.title,
          author: row.author,
          publishedYear: parseInt(row.publishedYear)
        });
      })
      .on('end', () => {
        resolve(books);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};
