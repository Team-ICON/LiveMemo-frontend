const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memoSchema = mongoose.Schema({
    _id: {
        type: String
    },
    body: {
        type: String
    }
}, { timestamps: true })


const Memo = mongoose.model('Memo', memoSchema);

module.exports = { Memo }