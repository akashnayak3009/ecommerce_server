import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./config/dbConnect.js";

dotenv.config();

const app = express();

app.use(express.json());

//database connection
connectDb();

//cors
app.use(cors);

//bodyParser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//cookieparser
app.use(cookieParser);

//Connection To server
const port = process.env.PORT || 6000; //Alternate port
app.listen(port, () => {
  console.log(
    `Server is connected and  mode at http://localhost:${port}`.yellow.bold
  );
});
