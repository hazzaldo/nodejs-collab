const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    storage: { type: String, required: true },
    monthlyPremium: { type: Number, required: true },
    yearlyPremium: { type: Number, required: true },
    excess: { 
        type: Number, 
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }, 
        required: true 
    }
});

const Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;