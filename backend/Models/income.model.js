const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    category : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    type : {
        type : String,
        default : "income"
    },
    description : {
        type : String
    }
},
{
    timestamps: true
});

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;