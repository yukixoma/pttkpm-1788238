import express from "express";
import path from "path";
const app = express();

import bodyParser from "body-parser";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Config public path
app.use(express.static(path.join(__dirname, "public")));

// Serve favicon
const favicon = require("express-favicon");
app.use(favicon(__dirname + "/public/image/favicon.png"));

// Config to let react-router navigate all get request
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Define routes
// Section route
import sectionRouter from "./routes/SectionRouter";
app.use("/api/section", sectionRouter);

//Floor route
import floorRouter from "./routes/FloorRouter";
app.use("/api/floor", floorRouter);

// Room route
import roomRouter from "./routes/RoomRouter";
app.use("/api/room", roomRouter);

// Room Type route
import roomTypeRouter from "./routes/RoomTypeRouter";
app.use("/api/room-type", roomTypeRouter);

// Booking Note route
import bookingNoteRouter from "./routes/BookingNoteRouter";
app.use("/api/booking-note", bookingNoteRouter);

// Manager route
import managerRouter from "./routes/ManagerRouter";
app.use("/api/manager", managerRouter);

// Authorize route
import authorizeRouter from "./routes/AuthorizeRouter";
app.use("/api/authorize", authorizeRouter);

app.listen(3000, () => console.log("Server is listening on port 3000!"));
