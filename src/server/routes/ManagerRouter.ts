import express from "express";
import { BookingNoteType, YearRevenueType } from "datatypes";
import { GetAll } from "../database/Database";
const managerRouter = express.Router();

managerRouter.post("/yearRevenue", async (req, res, next) => {
  const { year } = req.body;
  try {
    const bookingNote: BookingNoteType[] = await GetAll("booking_note");
    const bookingNoteByYear = bookingNote.filter(
      b => new Date(b.start_date).getFullYear() == year
    );
    const yearRevenue = {} as YearRevenueType;

    if (bookingNoteByYear.length == 0) {
      res.send("");
    } else {
      yearRevenue.year = year;
      yearRevenue.month = [];

      for (let i = 0; i < 12; i++) {
        const bookingNoteByMonth = bookingNoteByYear.filter(
          b => new Date(b.start_date).getMonth() == i
        );
        let monthRevenue = 0;
        bookingNoteByMonth.forEach(b => (monthRevenue += b.total_price));
        yearRevenue.month.push(monthRevenue);
      }
      yearRevenue.total = yearRevenue.month.reduce((a, b) => a + b);
      res.status(200).send(yearRevenue);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default managerRouter;
