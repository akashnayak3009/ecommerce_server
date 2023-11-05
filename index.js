import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./config/dbConnect.js";
import authRouter from "./routes/authRoute.js";
import { handleError, notFound } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
app.use(express.json());

//cors
app.use(cors);

//database connection
connectDb();


//bodyParser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//cookieparser
app.use(cookieParser);

//Router 
app.use("/api/user",authRouter)
app.use(notFound)
app.use(handleError)


//Connection To server
const port = process.env.PORT || 6000; //Alternate port
app.listen(port, () => {
  console.log(
    `Server is connected and  mode at http://localhost:${port}`.yellow.bold
  );
});
