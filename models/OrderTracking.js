import mongoose from 'mongoose';

const orderTrackingSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    status: [{
        state: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        description: String,
        location: String
    }]
}, {
    timestamps: true
});

const OrderTracking = mongoose.model('OrderTracking', orderTrackingSchema);
export default OrderTracking;