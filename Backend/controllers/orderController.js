import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing user order
const placeOrder = async (req, res) => {
    try {
        // Save order in DB
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: false // Default payment status
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        res.json({ success: true, message: "Order placed successfully", orderId: newOrder._id });

    } catch (error) {
        console.error("Order Placement Error:", error);
        res.json({ success: false, message: "Error placing order" });
    }
};

// Verify order payment
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            return res.json({ success: true, message: "Payment Successful" });
        } else {
            return res.json({ success: false, message: "Payment Failed" });
        }
    } catch (error) {
        console.error("Order Verification Error:", error);
        res.json({ success: false, message: "Error verifying payment" });
    }
};

// Fetch user orders
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Fetching Orders Error:", error);
        res.json({ success: false, message: "Error fetching orders" });
    }
};

// Update order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.error("Order Status Update Error:", error);
        res.json({ success: false, message: "Error updating status" });
    }
};

export { placeOrder, verifyOrder, userOrders, updateStatus };
