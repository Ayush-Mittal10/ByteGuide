import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

async function order (req, res){
    const options = req.body;
    console.log(options);
    try{
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch {
        res.status(500).send("Failed to create order");
    }
}

export default order;