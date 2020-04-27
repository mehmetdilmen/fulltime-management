const express = require('express');
const router = express.Router();

// Models
const Student = require('../models/Students');

router.get('/', (req, res) => {
    const promise = Student.find({});
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});




router.put('/installmentPay/:student_id', (req, res, next) => {
    const promise = Student.findByIdAndUpdate(
        req.params.student_id,
        req.body,
        {
            new: true
        }
    );

    promise.then((expenses) => {
        if (!expenses)
            next({message: 'Bulunamadı.', code: 99});

        res.json(expenses);
    }).catch((err) => {
        res.json(err);
    });
});




router.get('/:student_id', (req, res) => {
    //Çoklu sorgu
    const {student_id} = req.params;
    const promise = Student.find(
        {
            student_id: {"$in": student_id}
        }
    );
    //console.log(promise)
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});


router.post('/', (req, res, next) => {

    const studentProfile = new Student(req.body);

    const promise = studentProfile.save();

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});


router.delete('/:id', (req, res, next) => {
    const promise = Student.findByIdAndRemove(req.params.id);

    promise.then((expenses) => {
        if (!expenses)
            next({message: 'Bulunamadı.', code: 99});

        res.json(expenses);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;
