import { Document, Model, model, Schema, set } from "mongoose";

set('useCreateIndex', true);

export interface IBook extends Document {
  authorId: Object;
  title: String;
  description: String;
}

/**
 * Book Schema
 * @private
 */
const BookSchema = new Schema({
  title: {
    type: String,
    maxlength: 128,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    required: true
  },
}, {
  timestamps: true,
});

BookSchema.index({ title: 1 });

const Book: Model<IBook> = model("Book", BookSchema);

export default Book;


