const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commenSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}
);

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    comments: [commenSchema]
}, {
    timestamps: true
});

var dishModel = mongoose.model('Dish', dishSchema);

module.exports = dishModel;