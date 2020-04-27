const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);


const StudentSchema = new Schema({
    studentName: {
        type: String,
    },
    studentAge: {
        type: Date,
    },
    studentAddress: {
        type: String,
    },
    studentPhone: {
        type: String,
    },
    studentEmail: {
        type: String,
    },
    parentName: {
        type: String,
    },
    parentPhone: {
        type: String,
    },
    parentEmail: {
        type: String,
    },
    class: {
        type: Object,
    },
    all_periods: {
        type: Object,
    },
    studentCreatedDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean
    }

});

StudentSchema.plugin(AutoIncrement, {inc_field: 'student_id'});

module.exports = mongoose.model('student', StudentSchema);
