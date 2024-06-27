const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
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
        default : "expense"
    },
    description : {
        type : String
    }
    
},
{
    timestamps: true
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;