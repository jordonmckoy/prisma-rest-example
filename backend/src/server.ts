import express from 'express';
import helmet from "helmet";
import bodyParser from "body-parser"
import cors from "cors";

import employeeRoutes from "./routes/employee";
import loginRoutes from "./routes/login";
import reviewRoutes from "./routes/review";

const app = express();
const port = 8000;

app.use(helmet());
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(employeeRoutes);
app.use(loginRoutes);
app.use(reviewRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})