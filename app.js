import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import employeeRouter from "./Routes/employeeRouter.js";
import attendanceRouter from "./Routes/attendanceRouter.js";
import payrollRouter from "./Routes/payrollRouter.js";
import UserRouter from "./Routes/UserRouter.js";

const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/employees", employeeRouter);
app.use("/attendance", attendanceRouter);
app.use("/payroll", payrollRouter);
app.use("/api", UserRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});