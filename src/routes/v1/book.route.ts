import express from "express";
import Validate from "../../middlewares/validate";
import BooksController from "../../controllers/book.controller";
import addBook from "../../validations/book.validation"
import authorize from "../../middlewares/auth";


const router = express.Router();

router
  .route('/')
  .get(authorize(), BooksController.getBooks);

router
  .route('/:id')
  .get(authorize(), BooksController.getBookById);

router
  .route('/:id')
  .delete(authorize(), BooksController.deleteBook);

router
  .route('/')
  .post(authorize(), Validate(addBook), BooksController.create);

export default router;

/**
 * @swagger
 * tags:
 *   name: Book
 */

/**
* @swagger
* path:
*  /books:
*    get:
*      description: Get books lists API
*      tags: [Book]
*      security:
*         - ApiKeyAuth: []
*      responses:
*        '200':
*          description: Success
*        '401':
*          description: Invalid jwt signature / ID found.
*/

/**
* @swagger
* path:
*  /books:
*    post:
*      description:  Create book API
*      tags: [Book]
*      requestBody:
*         content:
*          application/json:
*            schema:
*               $ref: '#/components/schemas/BookRequest'
*      security:
*         - ApiKeyAuth: []
*      responses:
*        '200':
*          description: Success
*        '401':
*          description: Invalid jwt signature / ID found.
*/

/**
* @swagger
* path:
*  /books/{bookId}:
*    get:
*      description: Get specific book API
*      tags: [Book]
*      parameters:
*         - in: path
*           name: bookId
*           type: integer
*           required: true
*           description: get book detail using bookId
*      security:
*         - ApiKeyAuth: []
*      responses:
*        '200':
*          description: Success
*        '401':
*          description: Invalid jwt signature / ID found.
*/

/**
* @swagger
* path:
*  /books/{bookId}:
*    delete:
*      description: Author can delete own book API
*      tags: [Book]
*      parameters:
*         - in: path
*           name: bookId
*           type: integer
*           required: true
*           description: delete book detail using bookId
*      security:
*         - ApiKeyAuth: []
*      responses:
*        '200':
*          description: Success
*        '401':
*          description: Access token is missing or invalid.
*/