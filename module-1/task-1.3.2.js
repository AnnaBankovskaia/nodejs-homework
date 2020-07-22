import fs from 'fs';
import stream from 'stream';
import csv from 'csvtojson';

if (!fs.existsSync(`./module-1/txt`)) {
  fs.mkdirSync(`./module-1/txt`, console.log);
}

const fromCSV = fs.createReadStream(`./module-1/csv/book-author.csv`);
const toTXT = fs.createWriteStream('./module-1/txt/book-author.txt');

const transform = stream.Transform({
  transform: function(chunk, enc, next) {
    const json = JSON.parse(chunk.toString('utf8'));

    this.push(`${JSON.stringify({
      book: json.Book,
      author: json.Author,
      price: Number(json.Price),
    })}\n`);

    next();
  },
})

stream.pipeline(
  fromCSV,
  csv(),
  transform,
  toTXT,
  error => {
    if (error) console.log(error);
  }
)