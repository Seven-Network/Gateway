import { Router } from "express";

const requestRouter = Router();

const requestMap = {
  create_account: "/user/create",
};

requestRouter.post("/", (req, res, next) => {
  if (req.query.request) {
    const route = requestMap[req.query.request as string];
    if (route) {
      res.redirect(307, route);
    } else {
      res.status(404);
      res.json({
        success: false,
        message: "This feature is not available at Seven Network yet.",
      });
    }
  } else {
    next();
  }
});

export default requestRouter;
