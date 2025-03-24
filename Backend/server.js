import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"



// app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//DB Connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})


// mongodb+srv://FoodDeliveryApp:<db_password>@cluster0.p3r48.mongodb.net/?

//Find the PID (netstat -ano | findstr :4000)

//Kill the process (taskkill /PID <PID> /F)

//Restart the server (node server.js) or (npm run server)
