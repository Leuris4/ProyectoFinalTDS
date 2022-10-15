const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const passTypeSchema = new Schema({
    type: {
        type: String,
    }
});


const passType = mongoose.model('pass_type',passTypeSchema);

module.exports = passType;