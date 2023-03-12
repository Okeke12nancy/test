import User from "../models/user.models.js";

class UserService {
  async create(newUser) {
    const newUserData = await User.create(newUser);

    return newUserData;
  }

  async findOne(filter, select = "") {
    let user;
    if (select.length > 0) {
      user = await User.findOne(filter).select(select);
    } else {
      user = await User.findOne(filter);
    }

    return user;
  }

  async findById(id) {
    const user = await User.findById(id);

    return user;
  }

  async findAll(filter = {}) {
    const users = await User.find(filter);

    return users;
  }

  async update(id, updateData = {}) {
    const user = await User.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
      runValidators: true,
    });

    return user;
  }

  async delete(id) {
    const user = await User.findByIdAndRemove(id);
    return user;
  }
}

export default new UserService();
