import express from "express";
import { GetAll } from "../database/Database";
const roomTypeRouter = express.Router();
const defautlTable = "room_type";

roomTypeRouter.post("/getInfo", async (req, res, next) => {
  try {
    const data = await GetAll(defautlTable);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default roomTypeRouter;
