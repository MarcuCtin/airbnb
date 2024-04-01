const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    title:String,
    price:Number,
    address:String,
    addedPhotos:[String],
    description:String,
    perks:[String],
    extra:String,
    checkin:Number,
    checkout:Number,
    maxguests:Number,
})

const PlaceModel = mongoose.model('Place',PlaceSchema)

module.exports = PlaceModel;
