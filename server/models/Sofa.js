const mongoose = require('mongoose');

const sofaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This fild is required.'
    },
    description: {
        type: String,
        required: 'This fild is required.'
    },
    cor: {
        type: String,
        required: 'This fild is required.'
    },
    ingredients: {
        type: Array,
        required: 'This fild is required.'
    },
    category: {
        type: String,
       // enum: ['Sofa-Cama', 'Sofa-De-Couro', 'Reclinavel', 'Pilow-Pop', 'Poltrona'],
        required: 'This fild is required.'
    },
    image: {
        type: String,
        required: 'This fild is required.'
    },
}); 

// WildCard Indexing
//sofaSchema.index({ "$**" : 'text' });
sofaSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Sofa', sofaSchema);