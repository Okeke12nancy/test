import logger from "../helpers/logger.helpers";
import handleResponse from "../helpers/response.helpers";

import User from "../models/user.models";
import { verifyEmail, passwordChange } from "../services/email.services";
import { hash, verifyHash, deleteFields } from "../helpers/index2.helpers";
import { addMinutes } from "../helpers/date";
import { generateJwtToken } from "../helpers/jwt.helpers";
import { userService } from "../services/user.service";

export class AuthController {
  constructor() {
    this.logger = logger;
    this.handleResponse = handleResponse;
    this.User = userService;
  }

  async login({ data }) {
    logger.debug("Logging in user");
    try {
      const user = await this.User.findOne(
        {
          email: data.email,
        },
        "+password"
      );

      if (!user) {
        return this.handleResponse(400, "invalid email or password");
      }

      const passwordMatch = await verifyHash(user.password, data.password);

      if (!passwordMatch) {
        return this.handleResponse(400, "invalid email or password");
      }

      // generate token
      const token = await generateJwtToken({ ...user["_doc"] });

      // delete hidden fields
      deleteFields(user["_doc"], this.User.getHiddenFields());
      await verifyEmail(body);
      return this.handleResponse(200, "login successful", { user, token });
    } catch (e) {
      this.logger.error(e);
      return this.handleResponse(500, e);
    }
  }

  async changePassword({ user, data }) {
    this.logger.debug("Changing user password");
    try {
      // check if old password is correct
      const isCorrect = await verifyHash(user.password, data.password);

      if (!isCorrect) {
        return this.handleResponse(400, "incorrect password");
      }

      // hash new password
      data.new_password = await hash(data.new_password);

      // update user password
      await this.User.findOneAndUpdate(
        { _id: user._id },
        { password: data.new_password }
      );
      await passwordChange(body);
      return this.handleResponse(200, "password changed successfully");
    } catch (e) {
      this.logger.error(e);
      return this.handleResponse(500, e);
    }
  }
}

export default new authControllers();
