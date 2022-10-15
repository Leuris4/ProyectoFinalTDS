const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    employee_id: {
        type: String,
    },
    user: {
        type: String,
    },
    password: {
        type: String,
    },
    rol: {
        type: String,
    },
    last_seen: {
        type: Date,
    },
});


const User = mongoose.model('users',userSchema);

module.exports = User;