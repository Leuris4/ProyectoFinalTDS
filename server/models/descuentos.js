const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DescuentoSchema = new Schema({
    tipoDescuento: {
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


const Descuentos = mongoose.model('descuentos',DescuentoSchema);

module.exports = Descuentos;