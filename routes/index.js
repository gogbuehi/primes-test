const locreq          = require('locreq')(__dirname);
const fs = require('fs');
const MarkerAnalyser = locreq('app/utils/marker-analyser');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  let message = '';
  let n = Math.abs(parseInt(req.query.n || 0));


  let datafile;
  switch(n) {
    case 0:
      datafile = 'small';
      break;
    case 1:
      datafile = 'big';
      break;
    default:
      datafile = 'test';
  }

  fs.readFile('data/' + datafile+ '.txt', 'utf8', function(err, data) {
    if (err) throw err;
    const dataRows = data.split(/\n/).filter((row) => row !== '');

    const dataPoints = dataRows.map((row) => {
      const dataSegments = row.split(/\s/);
      return {
        "x": dataSegments[1],
        "y": dataSegments[2],
        "name": dataSegments[0]
      };
    });
    const startTime = new Date().getTime();
    const result = MarkerAnalyser.kdIsoTree(dataPoints);
    console.log("RESULT: ", result);
    const endTime = new Date().getTime();
    console.log('KD Search Runtime: ', endTime-startTime);
    res.render('index', {
      title: 'KD Tree',
      timeRunning: endTime-startTime,
      n,
      result,
      message
    });



  });
});


module.exports = router;
