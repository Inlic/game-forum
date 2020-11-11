import { AuthController } from "./Controllers/AuthController.js";
import CommentsController from "./Controllers/CommentsController.js";
import PostsController from "./Controllers/PostsController.js";

class App {
  authController = new AuthController();
  postsController = new PostsController();
  commentsController = new CommentsController();
}

window["app"] = new App();
