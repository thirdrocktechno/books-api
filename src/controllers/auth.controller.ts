import httpStatus from "http-status";
import Author from "../helpers/auth.helper";
import messages from "../config/locales/en.json";
import Logger from "../config/logger";
import util from "util";

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let authorObj = await Author.findByEmailId(email);
    if (!authorObj) {
      res.status(httpStatus.NOT_FOUND)
      res.json({ message: util.format(messages.userMessage.notExist, email) });
    } else {
      const { user, accessToken } = await Author. login(authorObj, password)
      res.status(httpStatus.OK);
      return res.json({ accessToken, data: user });
    }
  } catch (error) {
    return next(error);
  }
};

export default login;