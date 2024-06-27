const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        maxLength : 20
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true,
    },
    incomes : [{ type : mongoose.Schema.Types.ObjectId,
                 ref : 'Income'}],
    expenses : [{ type : mongoose.Schema.Types.ObjectId,
                ref : 'Expense'}]
},{
    timeStamps : true
})

const User = mongoose.model('User', UserSchema);

module.exports = User;