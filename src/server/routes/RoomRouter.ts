import express from "express";
import { RoomType } from "datatypes";
import {
  InsertManyToTable,
  GetMany,
  GetOne,
  UpdateOne
} from "../database/Database";
const roomRouter = express.Router();
const defautlTable = "room";

roomRouter.post("/new", async (req, res, next) => {
  const rooms: RoomType[] = req.body;
  try {
    await InsertManyToTable(Object.keys(rooms[0]), defautlTable, rooms);
    res.status(201).send("All rooms is created");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

roomRouter.post("/getInfo", async (req, res, next) => {
  try {
    const data: RoomType[] = await GetMany(
      "room",
      Object.keys(req.body),
      Object.values(req.body)
    );
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

roomRouter.post("/checkin", async (req, res, next) => {
  const room = req.body;
  const { section_id, floor_id, id } = room;
  try {
    const roomInfo: RoomType = await GetOne(
      defautlTable,
      Object.keys(room),
      Object.values(room)
    );

    if (roomInfo.availability == 1) {
      await UpdateOne("room", "availability", "0", Object.keys(room), [
        section_id,
        floor_id.toString(),
        id.toString()
      ]);
      res.status(201).send("Room reserved!");
    } else {
      res.status(409).send("Room is booked!");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

roomRouter.post("/checkout", async (req, res, next) => {
  try {
    await UpdateOne(
      defautlTable,
      "availability",
      "1",
      Object.keys(req.body),
      Object.values(req.body)
    );
    res.status(201).send("Room released!");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default roomRouter;
