import express from "express";
import { AuthorizeInfoType } from "datatypes";
import { Get } from "../database/Database";
const authorizeRouter = express.Router();
const defautlTable = "authorize";

authorizeRouter.post("/login", async (req, res, next) => {
  try {
    const data: AuthorizeInfoType[] = await Get(
      defautlTable,
      Object.keys(req.body),
      Object.values(req.body)
    );
    if (data.length == 1) {
      res.status(200).send(data[0]);
    } else {
      res.status(401).send("Login info invalid!");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default authorizeRouter;
