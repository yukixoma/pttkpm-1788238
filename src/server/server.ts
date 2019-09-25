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
import { ApiPath } from "../global/ApiPath";
// Section route
import sectionRouter from "./routes/SectionRouter";
app.use(ApiPath.section, sectionRouter);

//Floor route
import floorRouter from "./routes/FloorRouter";
app.use(ApiPath.floor, floorRouter);

// Room route
import roomRouter from "./routes/RoomRouter";
app.use(ApiPath.room, roomRouter);

// Room Type route
import roomTypeRouter from "./routes/RoomTypeRouter";
app.use(ApiPath.roomType, roomTypeRouter);

// Check In/Out route
import checkInOutRouter from "./routes/CheckInOutRouter";
app.use(ApiPath.checkInOut, checkInOutRouter);

// Manager route
import managerRouter from "./routes/ManagerRouter";
app.use(ApiPath.manager, managerRouter);

// Authorize route
import authorizeRouter from "./routes/AuthorizeRouter";
app.use(ApiPath.authorize, authorizeRouter);

app.listen(3000, () => console.log("Server is listening on port 3000!"));
