
/* GET home page. */
exports.index = function(req, res, next) {
  res.render('layout');
};

exports.partials = function(req, res) {
  var name = req.params.name;
  res.render('../public/partials/' + name);
};

//module.exports = router;
