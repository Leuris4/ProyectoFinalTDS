const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const IngresoSchema = new Schema({
    tipoIngreso: {
        type: String,
      
    },
    monto: {
        type: Number,
    },
    empleado_id: {
        type: String,
    },
    fecha: {
        type: Date,
        default: new Date()
    },
    status: {
        type: Number,
        default: 0
    },
   
});


const Ingresos = mongoose.model('ingresos',IngresoSchema);

module.exports = Ingresos;