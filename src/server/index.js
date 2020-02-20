
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
    console.log(ipl.matchesPerYear(matchResult));
    let winnerTeams = matchResult.map(elem => elem.winner).filter((elem, index, arr) => elem !== "" && arr.indexOf(elem) === index);
    // console.log(winnerTeams);
    let out = [];
    for (let i = 0; i < winnerTeams.length; i++) {
        let winnerobj = ipl.matchesPerTeamPerYear(matchResult, winnerTeams[i]);
        console.log(winnerobj);
    }

});
