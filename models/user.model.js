const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,   
        required: true,
        trim: true,
        unique: true,
        minlenghth: [3, 'Username must be at least 3 characters long']
       
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,  
        minlenghth: [10, 'Email must be at least 10 characters long']
    },
    password: {
        type: String,
        required: true,
        minlenghth: [6, 'Password must be at least 6 characters long']
    }
});



const user = mongoose.model('user', userSchema);

module.exports = user;
