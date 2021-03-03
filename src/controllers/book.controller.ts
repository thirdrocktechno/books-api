import httpStatus from "http-status";
import Book from "../helpers/books.helper";
import { bookMessage } from "../config/locales/en.json";
import Logger from "../config/logger";

/**
 * Get books lists
 * @Author
 */

const getBooks = async (req, res, next) => {
  try {
    Logger.info('******** INFO :: book controller :: getBooks :: start ********');
    const booksObj = await Book.findBooks();
    Logger.info('******** INFO :: book controller :: getBooks :: success ********');
    res.status(httpStatus.OK);
    return res.json({
      message: bookMessage.retrieved,
      count: booksObj.length,
      books: booksObj
    });
  } catch (error) {
    Logger.info('******** ERROR :: book controller :: getBooks ********');
    Logger.error(error);
    return next(error);
  }
};

/**
 * Get books by id
 * @Author
 */
const getBookById = async (req, res, next) => {
  try {
    Logger.info('******** INFO :: book controller :: getBookById :: start ********');
    const { id } = req.params;
    const isValidId = await Book.checkValidId(id);
    if (isValidId) {
      const bookObj = await Book.findBookById(id);
      res.status(httpStatus.OK);
      return res.json({
        message: bookMessage.retrieved,
        books: bookObj
      });
    } else {
      res.status(httpStatus.NOT_FOUND);
      Logger.info('******** INFO :: book controller :: getBookById :: success ********');
      res.json({ message: bookMessage.invalidId });
    }
  } catch (error) {
    Logger.info('******** ERROR :: book controller :: getBookById ********');
    Logger.error(error);
    return next(error);
  }
};

/**
 * Delete books by id
 * @Author
 */
const deleteBook = async (req, res, next) => {
  try {
    Logger.info('******** INFO :: book controller :: delete :: start ********');
    const { id } = req.params;
    const isValidId = await Book.checkValidId(id);
    if (isValidId) {
      const book = await Book.findBookById(id);
      Logger.info(book)
      if (book.length === 0) {
        res.status(httpStatus.NOT_FOUND);
        return res.json({ message: bookMessage.notExist });
      } else {
        if (book[0].authorId.toString() === req.user._id.toString()) {
          await Book.deleteBookById(id);
          res.status(httpStatus.OK);
          Logger.info('******** INFO :: book controller :: delete :: success ********');
          res.json({ message: bookMessage.deleted });
        } else {
          res.status(httpStatus.FORBIDDEN);
          return res.json({ message: bookMessage.unAuthorizedAuthor });
        };
      }
    } else {
      res.status(httpStatus.NOT_FOUND);
      res.json({ message: bookMessage.invalidId });
    }
  } catch (error) {
    Logger.info('******** ERROR :: book controller :: delete ********');
    Logger.error(error);
    return next(error);
  }
};

/**
 * Add new book
 * @Author
 */
const create = async (req, res, next) => {
  try {
    Logger.info('******** INFO :: book controller :: create :: start ********');
    const { title, description } = req.body;
    const authorId = req.user._id;
    const bookObj = {
      title,
      description,
      authorId
    };
    await Book.addBook(bookObj);
    res.status(httpStatus.CREATED);
    Logger.info('******** INFO :: book controller :: create :: success ********');
    res.json({ message: bookMessage.created });
  } catch (error) {
    Logger.info('******** ERROR :: book controller :: create ********');
    Logger.error(error);
    return next(error);
  }
};

export default {
  getBooks,
  getBookById,
  create,
  deleteBook
}

