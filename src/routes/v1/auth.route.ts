import express from "express";
import Validate from "../../middlewares/validate";
import AuthController from "../../controllers/auth.controller";
import login from "../../controllers/auth.controller";

const router = express.Router();

router
  .route('/login')
  .post(Validate(login), AuthController);

export default router;

/**
 * @swagger
 * tags:
 *   name: Author
 */

/**
* @swagger
* path:
*  /auth/login:
*    post:
*      description: Author login API
*      tags: [Author]
*      requestBody:
*         content:
*          application/json:
*            schema:
*               $ref: '#/components/schemas/LoginRequest'
*      security:
*         - bearerAuth: []
*      responses:
*        '200':
*          description: Success
*        '404':
*          description: Incorrect email or password
*/