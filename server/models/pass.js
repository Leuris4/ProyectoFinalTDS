const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PassSchema = new Schema({
    employee_id: {
        type: String,
    },
    request_date: {
        type: Date,
    },
    start_date: {
        type: Date,
    },
    end_date: {
        type: Date,
    },
    approval: {
        type: Boolean,
    },
    approval_date: {
        type: Date,
    },
    pass_type_id: {
        type: String,
    }
   
});


const Pass = mongoose.model('pass',PassSchema);

module.exports = Pass;