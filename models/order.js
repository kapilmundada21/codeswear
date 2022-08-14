const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    products: { type: Object },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    pincode: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'Initiated' },
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("Order", OrderSchema);