import mongoose from "mongoose";
import Logger from "../config/logger";
import Book from "../models/book.model"

const findBooks = async () => {
  try {
    Logger.info('******** INFO :: book helper :: findBooks ********');
    return await Book.find();
  } catch (error) {
    Logger.info('******** ERROR :: book helper :: findBooks ********');
    Logger.info(error);
    return error;
  }
};

const checkValidId = async (id) => {
  try {
    Logger.info('******** INFO :: book helper :: checkValidId ********');
    return await mongoose.Types.ObjectId.isValid(id);
  } catch (error) {
    Logger.info('******** ERROR :: book helper :: checkValidId ********');
    Logger.info(error);
    return error;
  }
};

const findBookById = async (id) => {
  try {
    Logger.info('******** INFO :: book helper :: findBookById ********');
    return await Book.find({ _id: Object(id)});
  } catch (error) {
    Logger.info('******** ERROR :: book helper :: findBookById ********');
    Logger.info(error);
    return error;
  }
};

const deleteBookById = async (id) => {
  try {
    Logger.info('******** INFO :: book helper :: deleteBookById ********');
    return await Book.findOneAndDelete({ _id: Object(id) });
  } catch (error) {
    Logger.info('******** ERROR :: book helper :: deleteBookById ********');
    Logger.info(error);
    return error;
  }
};

const addBook = async (bookData) => {
  try {
    Logger.info('******** INFO :: book helper :: addBook ********');
    const bookObj = new Book(bookData);
    return bookObj.save();
  } catch (error) {
    Logger.info('******** ERROR :: book helper :: addBook ********');
    Logger.info(error);
    return error;
  }
};


export default {
  findBooks,
  findBookById,
  deleteBookById,
  addBook,
  checkValidId
}