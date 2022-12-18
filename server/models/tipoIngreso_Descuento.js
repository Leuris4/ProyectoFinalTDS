const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TipoIngreso_DescuentoSchema = new Schema({
    tipoIngreso_Descuento: {
        type: Number,
      
    },
    descripcion: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },
   
});


const TipoIngreso_Descuentos = mongoose.model('tipoIngreso_Descuentos',TipoIngreso_DescuentoSchema);

module.exports = TipoIngreso_Descuentos;