import Author from '../author.model';
import Book from '../book.model';
import { Constants } from "./../../config/environment"
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
let BooksData = require('./book.seeder');
let AuthorData  = require('./author.seeder')

mongoose.connect(Constants.env.MONGO_URL, {
  keepAlive: 1,
  useNewUrlParser: true,
});
// Exit application on error
mongoose.connection.on('error', (err) => {
  process.exit(-1);
});
mongoose.set('debug', true);
const formateBookObj = async (ids) => {
  let updateBookData = [];
  BooksData = BooksData.default
  
  for (let i = 0; i < BooksData.length; i++) {
    if (i < 5) {
      BooksData[i].authorId = ids[0];
      updateBookData.push(BooksData[i]);
    } else {
      BooksData[i].authorId = ids[1];
      updateBookData.push(BooksData[i]);
    }
  }
  return updateBookData;
};
const addAuthor = async (authors) => {
  try {
    let authorsArr = [];
    for (const author of authors) {
      author.password = await bcrypt.hash(author.password, 10);
      authorsArr.push(author);
    }
    const authorObj = await Author.insertMany(authorsArr);
    let ids = [];
    authorObj.map((author) => {
      ids.push(author._id);
    });
    let books = await formateBookObj(ids);
    await Book.insertMany(books);
    return mongoose.disconnect();
  } catch (error) {
    return error;
  }
};
addAuthor(AuthorData.default);
