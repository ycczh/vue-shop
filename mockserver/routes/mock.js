var express = require('express');
var router = express.Router();
var goods=require('../../api/goods.json');

/* GET home page. */
router.get('/goods', function(req, res, next) {
  res.json(goods);
});

module.exports = router;