import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://FoodDeliveryApp:Food013019@cluster0.p3r48.mongodb.net/food_delivery_app').then(() => console.log("Database Connected"));
}
