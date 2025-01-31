import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

//Placing orders using COD Method
const placeOrder = async (req,res) => {

    try {
        
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Paystack",
            payment:true,
            date: Date.now()

        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true, message:"Order Placed"})
    } catch ( error ) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//All Orders data for Admin Panel
const allOrders = async (req,res) => {
    try {
        
        const orders = await orderModel.find({})
        res.json({success:true, orders})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//User Order Data for Frontend
const userOrders = async (req,res) => {
    try {
        
        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({success: true, orders})


    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const processPaystackPayment = async (req, res) => {
    try {
        const { userId, items, amount, address, paymentReference } = req.body;

        // Verify payment with Paystack
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${paymentReference}`, {
            headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
        });

        const paymentData = response.data.data;

        if (paymentData.status !== "success") {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }

        // Create order if payment is successful
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentMethod: "Paystack",
            payment: true,
            paymentReference,
            date: Date.now(),
            status: "Processing",
        });

        await newOrder.save();

        // Clear user's cart after placing order
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order placed successfully!", order: newOrder });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


//Update Order status from admin panel
const updateStatus = async (req,res) => {
    try {
        
        const {orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success:true,message:'Status Updated'})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export { placeOrder, allOrders, userOrders, processPaystackPayment , updateStatus}