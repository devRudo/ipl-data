
const fs = require('fs');
const ipl = require('./ipl.js');
const extra = require('./extra_deliverables.js');

let pwd = process.env.PWD;

let matchResult = [];
fs.readFile(pwd + '/../data/matches.csv', 'utf8', function (err, data) {
    let rows = data.split(/\r?\n/).filter((elem) => elem !== "");
    let keys = rows[0].split(",");

    for (let i = 1; i < rows.length; i++) {
        let obj = {};
        let currentRow = rows[i].split(",");
        for (let j = 0; j < keys.length; j++) {
            obj[keys[j]] = currentRow[j];
        }
        matchResult.push(obj);
    }
    // console.log(matchResult);

    // console.log("********* Matches played per year ********");
    // console.log(ipl.matchesPerYear(matchResult));
    // console.log("********* Matches played per year ********");

    fs.writeFileSync(pwd + '/../output/matchesPerYear.json', JSON.stringify(ipl.matchesPerYear(matchResult)) + '\n', function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });

    let winnerTeams = matchResult.map(elem => elem.winner).filter((elem, index, arr) => elem !== "" && arr.indexOf(elem) === index);
    let out = {};
    // console.log("********* Matches played per team per year ********");
    for (let i = 0; i < winnerTeams.length; i++) {
        let winnerobj = ipl.matchesPerTeamPerYear(matchResult, winnerTeams[i]);
        index = i + 1;
        out['Team ' + index] = winnerobj;
    }
    fs.writeFileSync(pwd + '/../output/matchesPerTeamPerYear.json', JSON.stringify(out) + ',' + '\n', function (err) {
        if (err) throw err;
        console.log('File is modified successfully.');
    });

    // console.log("********* Matches played per team per year ********" + "\n");
    // console.log(extra.wonTossWonMatchPerTeam(matchResult));
    fs.writeFileSync(pwd + '/../output/wonTossWonMatchPerTeam.json', JSON.stringify(extra.wonTossWonMatchPerTeam(matchResult)) + '\n', function (err) {
        if (err) throw err;
        console.log('File is modified successfully.');
    });
    // console.log(extra.playerHighManoftheMatchPerSeason(matchResult));
    fs.writeFileSync(pwd + '/../output/playerHighManoftheMatchPerSeason.json', JSON.stringify(extra.playerHighManoftheMatchPerSeason(matchResult)) + '\n', function (err) {
        if (err) throw err;
        console.log('File is modified successfully.');
    });

});

let deliveryResult = [];
fs.readFile(pwd + '/../data/deliveries.csv', 'utf8', function (err, data) {
    let rows = data.split(/\r?\n/).filter((elem) => elem !== "");
    let keys = rows[0].split(",");

    for (let i = 1; i < rows.length; i++) {
        let obj = {};
        let currentRow = rows[i].split(",");
        for (let j = 0; j < keys.length; j++) {
            obj[keys[j]] = currentRow[j];
        }
        deliveryResult.push(obj);
    }
    let matchIdsPlayedIn2016 = matchResult.filter(elem => elem.season === '2016').map(elem => elem.id);
    let uniqueTeamsin2016 = deliveryResult.filter(elem => matchIdsPlayedIn2016.includes(elem.match_id)).map(elem => elem.bowling_team).filter((elem, index, arr) => arr.indexOf(elem) === index);
    // console.log(uniqueTeamsin2016);
    let year = '2016';
    // let team = 'Pune Warriors';
    // console.log("********* Extra Runs Conceded Per team ********" + "\n");
    let out = [];
    for (let i = 0; i < uniqueTeamsin2016.length; i++) {
        // console.log(ipl.extraRunsPerTeam(matchResult, deliveryResult, year, uniqueTeamsin2016[i]));
        out.push(ipl.extraRunsPerTeam(matchResult, deliveryResult, year, uniqueTeamsin2016[i]));
    }
    // console.log(out);
    fs.writeFileSync(pwd + '/../output/extraRunsPerTeam.json', JSON.stringify(out) + ',' + '\n', function (err) {
        if (err) throw err;
        console.log('File is modified successfully.');
    });
    // console.log("********* Extra Runs Conceded Per team ********" + "\n");

    let matchIdsPlayedIn2015 = matchResult.filter(elem => elem.season === '2015').map(elem => elem.id);
    // console.log(matchIdsPlayedIn2015);
    let uniqueBowlersin2015 = deliveryResult.filter(elem => matchIdsPlayedIn2015.includes(elem.match_id)).map(elem => elem.bowler).filter((elem, index, arr) => arr.indexOf(elem) === index);
    let arr = [];
    // console.log(uniqueBowlersin2015);
    // let bowler = 'Yuvraj Singh';
    // console.log(ipl.topEconomicalBowlers(matchIdsPlayedIn2015, deliveryResult, bowler));
    for (let i = 0; i < uniqueBowlersin2015.length; i++) {
        let bowlersEconomy = ipl.topEconomicalBowlers(matchIdsPlayedIn2015, deliveryResult, uniqueBowlersin2015[i]);
        for (let key in bowlersEconomy) {
            arr.push([key, bowlersEconomy[key]]);
        }
    }
    arr.sort(function (a, b) {
        return a[1] - b[1];
    }); arr.sort(function (a, b) {
        return a[1] - b[1];
    });
    // // console.log(arr);
    // // console.log("********* Top 10 Economical Bowlers in 2015 ********");
    let obj = {};
    for (let i = 0; i < 10; i++) {
        obj[arr[i][0]] = arr[i][1];
    }
    // console.log(obj);
    fs.writeFileSync(pwd + '/../output/topEconomicalBowlers.json', JSON.stringify(obj) + '\n', function (err) {
        if (err) throw err;
        console.log('File is modified successfully.');
    });
    // console.log("********* Top 10 Economical Bowlers in 2015 ********");

    // console.log(extra.strikeRateViratPerseason(matchResult, deliveryResult));
    fs.writeFileSync(pwd + '/../output/strikeRateViratPerseason.json', JSON.stringify(extra.strikeRateViratPerseason(matchResult, deliveryResult)) + '\n', function (err) {
        if (err) throw err;
        console.log('File is modified successfully.');
    });
    // console.log(extra.playerDissmisal(deliveryResult));
    let content = extra.playerDissmisal(deliveryResult);
    // console.log(extra.playerDissmisal(deliveryResult));
    let result = [];
    for (key in content) {
        // console.log(key);
        let batsman = key.split(",")[0];
        let bowler = key.split(",")[1];
        result.push(batsman + " Dismissed by " + bowler + " " + content[key] + " times");

    }
    fs.writeFileSync(pwd + '/../output/maxNumberofTimesofDissmissal.json', JSON.stringify(result) + '\n', function (err) {
        if (err) throw err;
        console.log('File is modified successfully.');
    });
});
