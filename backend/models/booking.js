const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    checkin: {
        type: Date,
        required: true
    },
    checkout: {
        type: Date,
        required: true
    },
    numberOfGuests: {
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    phone:{
        type:Number,
        required: true,
    }
});

const Booking = mongoose.model('Booking',bookingSchema);
module.exports = Booking;