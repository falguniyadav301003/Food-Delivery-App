import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import ordersRouter from "./routes/orderRoute.js"; 
import 'dotenv/config';

// App Config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", ordersRouter); 

// Root Route
app.get("/", (req, res) => {
    res.send("API Working");
});

// Start Server
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`); 
});


// mongodb+srv://FoodDeliveryApp:<db_password>@cluster0.p3r48.mongodb.net/?

//Find the PID (netstat -ano | findstr :4000)

//Kill the process (taskkill /PID <PID> /F)

//Restart the server (node server.js) or (npm run server)
