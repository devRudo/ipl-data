
const fs = require('fs');
const ipl = require('./ipl.js');

let matchResult = [];
fs.readFile('./../data/matches.csv', 'utf8', function (err, data) {
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
    // console.log(ipl.matchesPerYear(matchResult));
    let winnerTeams = matchResult.map(elem => elem.winner).filter((elem, index, arr) => elem !== "" && arr.indexOf(elem) === index);
    // console.log(winnerTeams);
    let out = [];
    for (let i = 0; i < winnerTeams.length; i++) {
        let winnerobj = ipl.matchesPerTeamPerYear(matchResult, winnerTeams[i]);
        // console.log(winnerobj);
    }

    // console.log(matchResult);

});

let deliveryResult = [];
fs.readFile('./../data/deliveries.csv', 'utf8', function (err, data) {
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
        deliveryResult.push(obj);
    }
    // console.log(deliveryResult);
    let uniqueTeams = matchResult.map(elem => elem.team1 || elem.team2).filter((elem, index, arr) => arr.indexOf(elem) === index);
    // console.log(uniqueTeams.length);
    let year = '2016';
    let team = 'Pune Warriors';

    for (let i = 0; i < uniqueTeams.length; i++) {
        console.log(ipl.extraRunsPerTeam(matchResult, deliveryResult, year, uniqueTeams[i]));
    }

});
