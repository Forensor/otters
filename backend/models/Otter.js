const { Schema, model } = require('mongoose');

const OtterSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    imagePath: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = model('Otter', OtterSchema);