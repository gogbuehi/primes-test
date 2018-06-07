const locreq          = require('locreq')(__dirname);
const PrimesGenerator = locreq('app/utils/primes-generator');
const MultiplicationTableGenerator = locreq('app/utils/multiplication-table-generator');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let message = '';
  let n = Math.abs(parseInt(req.query.n || 0));
  const startTime = new Date().getTime();
  const primes = PrimesGenerator.generateNPrimes(n);
  const endTime = new Date().getTime();

  console.log('Prime Generation Runtime: ', endTime-startTime);

  const table = MultiplicationTableGenerator.limitedMultiplicationTable(primes);

  res.render('index', {
    title: 'Primes Table',
    timeRunning: endTime-startTime,
    n,
    primes,
    table,
    message
  });
});

module.exports = router;
