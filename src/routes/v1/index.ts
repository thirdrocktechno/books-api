import express from "express";
import AuthRoute from "./auth.route";
import BookRoute from "./book.route";
import DocsRoute from "./docs.route"; 

const router = express.Router();

router.use('/auth', AuthRoute);
router.use('/books', BookRoute);
router.use('*/docs', DocsRoute);

export default router;
