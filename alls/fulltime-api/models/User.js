const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);


const UserSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        minlength: 5
    },
    avatar: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    user_type: {
        type: Number
    },
    name: {
        type: String
    },
    membershipDate: {
        type: String
    }
});

UserSchema.plugin(AutoIncrement, {inc_field: 'user_id'});


module.exports = mongoose.model('user', UserSchema);
