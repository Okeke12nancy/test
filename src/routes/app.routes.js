import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import commentRouter from "./comment.routes.js";
import postRouter from "./post.routes.js";

const basePath = "/api/v1";

export default (app) => {
  app.use(`${basePath}/auth`, authRouter);
  app.use(`${basePath}/users`, userRouter);
  app.use(`${basePath}/posts`, postRouter);
  app.use(`${basePath}/comments`, commentRouter);
};
