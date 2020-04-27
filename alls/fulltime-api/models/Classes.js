const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);


const ClassesSchema = new Schema({
    className: {
        type: String
    },
    classDate: {
        type: String
    },
    classMembers: {
        type: Array
    },
    classTeacher: {
      type: Object
    },
    classLessonPlaning: {
        type: Array
    },
    classCreatedDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean
    }

});

ClassesSchema.plugin(AutoIncrement, {inc_field: 'class_id'});

module.exports = mongoose.model('classes', ClassesSchema);
