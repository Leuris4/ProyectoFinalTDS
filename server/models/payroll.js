const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PayrollSchema = new Schema({
    employee_id: {
        type: String,
      
    },
    salary_brut: {
        type: Number,
    },
    salary_net: {
        type: Number,
    },
    afp: {
        type: Number,
    },
    ars: {
        type: Number,
    },
    otrosIngresos: {
        type: Number,
        default: 0,
    },
    otrosDescuentos: {
        type: Number,
        default: 0,
    },
    status: {
        type: Number,
        default: 0,
    }
   
});


const Payroll = mongoose.model('payroll',PayrollSchema);

module.exports = Payroll;