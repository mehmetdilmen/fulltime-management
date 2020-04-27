var express = require('express');
var router = express.Router();

const Users = require('../models/User');


/* GET users listing. */
router.get('/:user_type', (req, res) => {
  const  { user_type } = req.params;
  const promise = Users.find(
      {
        user_type: { "$in": user_type  }
      }
  );
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

router.get('/user/:user_id', (req, res) => {
  const  { user_id } = req.params;
  const promise = Users.find(
      {
        user_id: { "$in": user_id  }
      }
  );
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});


router.put('/edit/user/:id', (req, res, next) => {
  const promise = Users.findByIdAndUpdate(
      req.params.id,
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



router.delete('/user/:id', (req, res, next) => {
  const promise = Users.findByIdAndRemove(req.params.id);

  promise.then((expenses) => {
    if (!expenses)
      next({message: 'Bulunamadı.', code: 99});

    res.json(expenses);
  }).catch((err) => {
    res.json(err);
  });
});



module.exports = router;
