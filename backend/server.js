import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js"
import mongoose from "mongoose";

import cors from "cors";


//configure env
dotenv.config();

//database configuration

try {
  const conn = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  });
  // console.log(`connected to Mongodb Database ${conn.connection.host}`);
} catch (error) {
  console.log(`Error in Mongodb ${error}`);
}


const app = express();


const corsOptions = {
  origin: '*',
  method: "GET,POST,PUT,DELETE",
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,

}

//middlewares
app.use(cors(corsOptions));
app.use(express.json()); //earlier we uses body parser

//routes
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.json("hello");
})


//port number
const PORT = process.env.PORT || 8080;
//listen
app.listen(PORT, async () => {
  try {
    // await connectDB();
  } catch (error) {
    // console.log(`Error in Mongodb ${error}`.bgRed.white);
  }
  console.log(`server started on PORT ${PORT}`);
});
