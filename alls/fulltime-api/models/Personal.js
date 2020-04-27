const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);


const PersonalSchema = new Schema({
    personalName: {
        type: String
    },
    personalTitle: {
        type: String
    },
    personalAge: {
        type: Date
    },
    personalAddress: {
        type: String
    },
    personalPhone: {
        type: String
    },
    personalEmail: {
        type: String
    },
    personalClass: {
        type: Object
    },
    personalSalary: {
        type: String
    },
    personalCreatedDate: {
        type: Date,
        default: Date.now
    },
    personalStartDate: {
        type: Date
    },
    status: {
        type: Boolean
    }

});

PersonalSchema.plugin(AutoIncrement, {inc_field: 'personal_id'});

module.exports = mongoose.model('personal', PersonalSchema);
