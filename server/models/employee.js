const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EmployeeSchema = new Schema({
    cedula: {
        type: String,
        required: [true, 'name field is required'],
        unique: [true, 'Ya existe un empleado con esta cédula']
    },
    name: {
        type: String,
        required: [true, 'name field is required']
    },
    lastname: {
        type: String,
    },
    department: {
        type: String,
    },
    position: {
        type: String,
    },
    hired_date: {
        type: Date,
    },
    vacation: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    },
   
});


const Employee = mongoose.model('employees',EmployeeSchema);

module.exports = Employee;