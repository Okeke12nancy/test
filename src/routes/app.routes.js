const userRouter = require("../routes/user.route");
const commentRouter = require("../routes/user.route");
const postRouter = require("../routes/user.route");
const basePath = "/api/v1";

module.exports = (app) => {
  app.use(`${basePath}/users`, userRouter);
  app.use(`${basePath}/posts`, commentRouter);
  app.use(`${basePath}/comments`, postRouter);
};
