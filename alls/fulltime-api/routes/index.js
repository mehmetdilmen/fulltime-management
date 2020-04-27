const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Models
const User = require('../models/User');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'FitnessWow'});
});


router.post('/register', function (req, res, next) {
    const {password, email, user_type, avatar, address, user_id, phone, name} = req.body;
    User.findOne({email}, (err, mail) => {
        if (err)
            throw err;
        if (mail) {
            res.json({
                status: false,
                message: 'E-Posta kullanılmakta. Lütfen şifrenizi sıfırlayın.'
            });
        } else {
            bcrypt.hash(password, 10, function (err, hash) {
                const user = new User({
                    email,
                    password: hash,
                    avatar,
                    user_type,
                    address,
                    user_id,
                    name,
                    phone
                });
                const promise = user.save();
                promise.then((data) => {
                    res.json(data)
                }).catch((err) => {
                    res.json(err);
                })
            });

        }
    })


});


router.post('/authenticate', (req, res) => {
    const {password, email} = req.body;
    User.findOne({
        email
    }, (err, user) => {
        if (err)
            throw err;

        if (!user) {
            res.json({
                status: false,
                message: 'Kullanıcı bulunamadı. Lütfen tekrar deneyiniz.'
            });
        } else {
            bcrypt.compare(password, user.password).then((result) => {
                if (!result) {
                    res.json({
                        status: false,
                        message: 'Şifrenizi hatalı girdiniz. Lütfen tekrar deneyiniz.'
                    });
                } else {
                    const payload = {
                        email: user.email,
                        user_type: user.user_type,
                        avatar: user.avatar,
                        address: user.address,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        phone: user.phone,
                        user_id: user.user_id,
                        name: user.name,
                        message_id: user.message_id,
                        _id: user._id
                    };
                    const token = jwt.sign(
                        payload, req.app.get('api_secret_key'), {
                            expiresIn: 72000 // 12 saat
                        });

                    res.json({
                        status: true,
                        token
                    })
                }
            });
        }
    });

});


module.exports = router;
