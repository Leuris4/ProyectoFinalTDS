const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BillSchema = new Schema({
    employee_id: {
        type: String,
      
    },
    date: {
        type: Date,
    },
    payroll_id: {
        type: String,
    },
    total_amount: {
        type: Number,
    }
   
});


const Bills = mongoose.model('bills',BillSchema);

module.exports = Bills;