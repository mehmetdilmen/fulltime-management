const express = require('express');
const router = express.Router();

// Models
const Personal = require('../models/Personal');

router.get('/', (req, res) => {
    const promise = Personal.find({});
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});




router.put('/:personal_id', (req, res, next) => {
    const promise = Personal.findByIdAndUpdate(
        req.params.personal_id,
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




router.get('/:personal_id', (req, res) => {
    //Çoklu sorgu
    const {personal_id} = req.params;
    const promise = Personal.find(
        {
            personal_id: {"$in": personal_id}
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

    const personalProfile = new Personal(req.body);

    const promise = personalProfile.save();

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});


router.delete('/:id', (req, res, next) => {
    const promise = Personal.findByIdAndRemove(req.params.id);

    promise.then((expenses) => {
        if (!expenses)
            next({message: 'Bulunamadı.', code: 99});

        res.json(expenses);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;
