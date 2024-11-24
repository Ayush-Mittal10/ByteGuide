import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    features: {
        type: [String],
        required: true
    },
    color: {
        type: String,
        required: true
    },
    popular: {
        type: Boolean,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
});

const Plan = mongoose.model('Plan', planSchema);
export default Plan;