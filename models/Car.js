const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    model: { type: mongoose.Schema.Types.String, required: true },
    vnum : { type:mongoose.Schema.Types.String, required:true},
    seats : {type:Number , required:true},
    price: { type: Number, required: true },
    year: { type: Number, required: true },
    isRendet: {type: Boolean, required: true, default: false},
    creationDate: {type: Number, required:true}    
},{
    usePushEach: true
  })

const Car = mongoose.model('Car', carSchema);

module.exports = Car;