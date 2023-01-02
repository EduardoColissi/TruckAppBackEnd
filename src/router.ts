import { Router } from "express";
import { userFormValidator } from "./middlewares/validator";
import { AuthMiddlewares } from "./middlewares/auth";
import { UserController } from "./controllers/UserController";
import { FreightsController } from "./controllers/FreightsController";

const user = new UserController();
const freights = new FreightsController();

const routes = Router();

routes.post("/users/signup", userFormValidator, user.create);
routes.post("/users/login", user.login);
routes.get("/users/all", user.getAllUsers);
routes.get("/users/all/user/:id", user.getUserById);
routes.put("/users/update/:id", user.update);
routes.delete("/users/delete/:id", user.delete);
routes.get("/users/search", user.search);

routes.get("/freights/all/", freights.getAllFreights);
routes.post("/freights/create/", freights.create);
routes.get("/freights/all/freight/:id", freights.getFreightsById);
routes.put("/freights/update/:id", freights.updateFreight);
routes.delete("/freights/delete/:id", freights.delete);
routes.get("/freights/search", freights.search);

export default routes;
