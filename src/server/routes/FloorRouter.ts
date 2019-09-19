import express from "express";
import { FloorType } from "datatypes";
import { InsertManyToTable, GetMany } from "../database/Database";
const floorRouter = express.Router();
const defautlTable = "floor";

floorRouter.post("/getInfo", async (req, res, next) => {
  try {
    const data: FloorType[] = await GetMany(
      defautlTable,
      Object.keys(req.body),
      Object.values(req.body)
    );
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

floorRouter.post("/new", async (req, res, next) => {
  const floors = req.body;
  try {
    await InsertManyToTable(
      ["section_id", "id", "room_quantity"],
      defautlTable,
      floors
    );
    console.log("All floors is created");
    res.status(201).send("All floors is created");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default floorRouter;
