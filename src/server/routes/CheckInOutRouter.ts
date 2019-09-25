import express from "express";
import { CheckInOutType } from "datatypes";
import { GetDiffDays as GetStayDays } from "../../library/GetDiffDays";
import { GetOne, UpdateMany, InsertToTable } from "../database/Database";
const checkInOutRouter = express.Router();
const defautlTable = "check_in";

checkInOutRouter.post("/getInfo", async (req, res, next) => {
  try {
    const data: CheckInOutType = await GetOne(
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

checkInOutRouter.post("/checkin", async (req, res, next) => {
  const checkInOut: CheckInOutType = req.body;
  checkInOut.id = new Date().getTime().toString();
  try {
    await InsertToTable(
      Object.keys(checkInOut),
      defautlTable,
      Object.values(checkInOut)
    );
    res.status(201).send("Check-in completed!");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

checkInOutRouter.post("/checkout", async (req, res, next) => {
  const checkInOut: CheckInOutType = req.body;

  const now = new Date();
  const startDate = new Date(checkInOut.start_date);

  if (now < startDate) {
    res.status(409).send("Can not check out! Start date must be before today!");
  } else {
    try {
      const total_price = GetStayDays(startDate, now) * checkInOut.price;
      await UpdateMany(
        defautlTable,
        ["end_date", "total_price", "is_check_out"],
        [now.toDateString(), total_price.toString(), "1"],
        Object.keys(checkInOut),
        Object.values(checkInOut)
      );
      res.status(201).send("Check-out completed");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
});

export default checkInOutRouter;
