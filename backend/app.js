const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//import routes here
const categoryRouter = require("./routes/categoryRoutes");
const productRouter = require("./routes/productRoutes");
const transactionRouter = require("./routes/transactionRoutes");
const userRouter = require("./routes/userRoutes");
const authJwt = require("./helper/jwt");
const errorHandler = require("./helper/error-handler");

const app = express();
const api = process.env.API_URL;

//middle ware
app.use(express.json());
app.use(cors());

app.use(authJwt());
app.use(errorHandler);

// Register routes
app.use(`${api}/category`, categoryRouter);
app.use(`${api}/product`, productRouter);
app.use(`${api}/transaction`, transactionRouter);
app.use(`${api}/user`, userRouter);

/*MongoDB connection for ATLAS */
const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((error) => console.log(error));

/* Starting the server on port 4001 */
const port = 4001;
app.listen(port, () => {
  console.log(`App running on port ${port} ..`);
});
