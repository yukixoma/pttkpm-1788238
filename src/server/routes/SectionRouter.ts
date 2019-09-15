import express from "express";
import { SectionType } from "datatypes";
import { GetAll, InsertToTable } from "../database/Database";
const sectionRouter = express.Router();
const defaultTable = "section";

sectionRouter.post("/getAll", async (req, res, next) => {
  try {
    const data = (await GetAll(defaultTable)) as SectionType[];
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

sectionRouter.post("/new", async (req, res, next) => {
  const section = req.body as SectionType;
  try {
    await InsertToTable(["id", "floor_quantity"], defaultTable, [
      section.id,
      section.floor_quantity.toString()
    ]);
    console.log(`New section ${section.id} created`);
    res.status(201).send("New section created");
  } catch (error) {
    next(error);
  }
});

export default sectionRouter;
