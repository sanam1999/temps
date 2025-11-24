const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Image Subdocument Schema
const ImageSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
}, { _id: true });

// Main Post Schema
const PostSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    caption: {
        type: String,
    },
    images: {
        type: [ImageSchema],   // Array of image objects
        required: true,
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
