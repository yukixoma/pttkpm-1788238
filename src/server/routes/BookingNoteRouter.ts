import express from "express";
import { BookingNoteType } from "datatypes";
import { GetDiffDays as GetStayDays } from "../../library/GetDiffDays";
import { Get, UpdateMany, InsertToTable } from "../database/Database";
const bookingNoteRouter = express.Router();
const defautlTable = "booking_note";

bookingNoteRouter.post("/getInfo", async (req, res, next) => {
  try {
    const data: BookingNoteType[] = await Get(
      defautlTable,
      Object.keys(req.body),
      Object.values(req.body)
    );
    res.status(200).send(data[0]);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

bookingNoteRouter.post("/checkin", async (req, res, next) => {
  const bookingNote: BookingNoteType = req.body;
  bookingNote.id = new Date().getTime().toString();
  try {
    await InsertToTable(
      Object.keys(bookingNote),
      defautlTable,
      Object.values(bookingNote)
    );
    res.status(201).send("Check-in completed!");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

bookingNoteRouter.post("/checkout", async (req, res, next) => {
  const bookingNote: BookingNoteType = req.body;

  const now = new Date();
  const startDate = new Date(bookingNote.start_date);

  if (now < startDate) {
    res.status(409).send("Can not check out! Start date must be before today!");
  } else {
    try {
      const total_price = GetStayDays(startDate, now) * bookingNote.price;
      await UpdateMany(
        defautlTable,
        ["end_date", "total_price", "check_out"],
        [now.toDateString(), total_price.toString(), "1"],
        Object.keys(bookingNote),
        Object.values(bookingNote)
      );
      res.status(201).send("Check-out completed");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
});

export default bookingNoteRouter;
