import logger from "../config/logger.config";
import handleResponse from "../helpers/response.helpers";
import { User } from "../models/user.models";
import UserController from  ("../services/email.services")
import {generateRandomAvatar} from  "../middlewares/avatar.middlewares"
export class UserController {
  constructor() {
    this.logger = logger;
    this.handleResponse = handleResponse;
    this.User = userService;
  }

  async createUser({ data }) {
        this.logger.debug("Creating user");
        try {
            // check if email exists
            const checkEmail = await this.User.findOne({
                email: data.email,
            });

            if (checkEmail) {
                return this.handleResponse(400, "email already exists");
            }

            // check if phone number exists
            const checkPhone = await this.User.findOne({
                phone: data.phone,
            });

            if (checkPhone) {
                return this.handleResponse(400, "phone number already exists");
            }

            // hash password
            data.password = await hash(data.password);

            // create user
            const user = await this.User.create(this.UserFilter.createUserData({ data }));
                 // delete hidden fields
            deleteFields(user["_doc"], this.User.getHiddenFields());
await generateRandomAvatar(email)

            return this.handleResponse(200, "user created successfully", { user });
        } catch (e) {
            this.logger.error(e);
            return this.handleResponse(500, e);
        }
    }


 async updateUser({ user, data }) {
        logger.debug("Updating user");
        try {
            // check if email exists
            const checkEmail = await this.User.findOne({
                email: data.email,
            });

            if (checkEmail && user._id.toString() !== checkEmail._id.toString()) {
                return this.handleResponse(400, "user with that email already exists");
            }

            // check if phone number exists
            const checkPhone = await this.User.findOne({
                phone: data.phone,
            });

            if (checkPhone && user._id.toString() !== checkPhone._id.toString()) {
                return this.handleResponse(400, "user with that phone number already exists");
            }

            // update user
            const updatedUser = await this.User.findOneAndUpdate(
                { _id: user._id },
                this.UserFilter.updateUserData({ data, user }),
            );

            return this.handleResponse(200, "user update successfully", { user: updatedUser });
        } catch (e) {
            this.logger.error(e);
            return this.handleResponse(500, e);
        }
    }
 
  async find({ user }) {
    this.logger.debug("Getting all users");
    try {
       Reflect.deleteProperty(user, "password");
      const user = await this.Post.find({
        createdBy: req.user,
      });

      return this.handleResponse(200, "user fetched successfully", { user });
    } catch (e) {
      this.logger.error(e);
      return this.handleResponse(500, e);
    }
  }
    async findOneUser({ data, id }) {
    this.logger.debug("getting one user");
    try {
      const user = await this.User.findById({
        createdBy: req.user,
      }).populate();

      return this.handleResponse(200, "User found successfully", { user });
    } catch (e) {
      this.logger.error(e);
      return this.handleResponse(500, e);
    }
  }

   async deleteOneUser({ data, id }) {
    this.logger.debug("Deleting User");
    try {
      // const category = await req.category.findOne({
      //   _id: req.params.categoryId,
      //   deleted: false,
      //   deletedAt: false,
      // });

      const findId = await this.User.findOne({
        ...req.params.postId,
        deleted: false,
        deletedAt: false,
      });

      if (!findId) {
        return res.json({
          msg: "User not found",
          success: false,
        });
      }

      await this.User.findByIdAndUpdate(findById, {
        $set: {
          deleted: true,
          deletedAt: true,
        },
      });

      return this.handleResponse(200, "user deleted  successfully", { user });
    } catch (e) {
      this.logger.error(e);
      return this.handleResponse(500, e);
    }
  }
}

export default new UserController();



