'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeaSchema = new Schema({
    name: {
        type:String,
        trim: true
    },
    price: {
        type: Number
    },
    caffeineLevel: {
        type: Number,
        default: 1
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    teaType: {
        type: String
    }
});

mongoose.model('Tea', TeaSchema);