const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var favoritesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dish'
        }
    ]
}, {
    timestamps: true
});

var favorites = mongoose.model('favourite', favoritesSchema);

module.exports = favorites;