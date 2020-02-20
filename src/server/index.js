
const fs = require('fs');
const ipl = require('./ipl.js');

return fs.readFile('./../data/matches.csv', 'utf8', function (err, data) {
    let matchResult = [];
    let rows = data.split(/\r?\n/).filter((elem) => elem !== "");
    // console.log(rows);
    let keys = rows[0].split(",");

    // console.log(keys);
    for (let i = 1; i < rows.length; i++) {
        let obj = {};
        let currentRow = rows[i].split(",");
        for (let j = 0; j < keys.length; j++) {
            obj[keys[j]] = currentRow[j];
        }
        matchResult.push(obj);
    }
    // console.log(matchResult);
    console.log("Matches Playes per Year are as follows :" + JSON.stringify(ipl.matchesPerYear(matchResult)));

});
