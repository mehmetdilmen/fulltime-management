const express = require('express');
const router = express.Router();

// Models
const Classes = require('../models/Classes');

router.get('/', (req, res) => {
    const promise = Classes.find({});
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});


router.get('/:class_id', (req, res) => {
    //Çoklu sorgu
    const {class_id} = req.params;
    const promise = Classes.find(
        {
            class_id: {"$in": class_id}
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

    const classesProfile = new Classes(req.body);
    console.log(req.body)
    const promise = classesProfile.save();
    console.log(promise)
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});


router.put('/:class_id', (req, res, next) => {
    const promise = Classes.findByIdAndUpdate(
        req.params.class_id,
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


module.exports = router;
