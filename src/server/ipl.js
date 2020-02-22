module.exports.matchesPerYear = function (obj) {
    let obj1 = obj.reduce((acc, curr) => {
        if (acc[curr.season] === undefined) {
            acc[curr.season] = 1;
        }
        else {
            acc[curr.season]++;
        }
        return acc;
    }, {});
    return obj1;
}

module.exports.matchesPerTeamPerYear = function (matches) {
    let winnerTeams = matches.map(elem => elem.winner).filter((elem, index, arr) => elem !== "" && arr.indexOf(elem) === index);
    let out = {};
    for (let i = 0; i < winnerTeams.length; i++) {
        let obj1 = matches.reduce((acc, curr) => {
            if (curr.winner === winnerTeams[i]) {
                if (acc[curr.season] === undefined) {
                    acc[curr.season] = 1;
                }
                else {
                    acc[curr.season]++;
                }
            }
            return acc;
        }, {});
        let team = {};
        team[winnerTeams[i]] = obj1;
        let winnerobj = team;
        index = i + 1;
        out['Team ' + index] = winnerobj;
    }
    return out;
}

module.exports.extraRunsPerTeam = function (matchObj, deliveryObj, yr) {
    let matchIdsPlayedIn2016 = matchObj.filter(elem => elem.season == yr).map(elem => elem.id);
    let startId = matchIdsPlayedIn2016[0];
    let hash = matchIdsPlayedIn2016.reduce((acc, curr) => {
        let key = curr - startId;
        if (acc[key] == undefined) {
            acc[key] = 1;
        }
        else {
            acc[key]++;
        }
        return acc;
    }, {});
    let bowlingTeams = deliveryObj.filter(elem => hash[elem.match_id - startId] != undefined).map(elem => elem.bowling_team).filter((elem, index, arr) => arr.indexOf(elem) === index);
    let res = [];
    for (let i = 0; i < bowlingTeams.length; i++) {
        let extraCount = deliveryObj.filter(elem => hash[elem.match_id - startId] != undefined && elem.extra_runs !== '0' && elem.extra_runs !== '' && elem.bowling_team === bowlingTeams[i]).reduce((acc, curr) => acc + Number(curr.extra_runs), 0);
        let result = {};
        result[bowlingTeams[i]] = extraCount;
        res.push(result);
    }
    return res;

}

module.exports.topEconomicalBowlers = function (matches, deliveries, year) {
    let matchIdsPlayedIn2015 = matches.filter(elem => elem.season == year).map(elem => elem.id);
    let startId = matchIdsPlayedIn2015[0];
    let hash = matchIdsPlayedIn2015.reduce((acc, curr) => {
        let key = curr - startId;
        if (acc[key] == undefined) {
            acc[key] = 1;
        }
        else {
            acc[key]++;
        }
        return acc;
    }, {});
    let uniqueBowlersin2015 = deliveries.filter(elem => hash[elem.match_id - startId] != undefined).map(elem => elem.bowler).filter((elem, index, arr) => arr.indexOf(elem) === index);
    let arr = [];
    for (let i = 0; i < uniqueBowlersin2015.length; i++) {
        let deliveriesMadebyBowler = deliveries.filter(elem => elem.bowler === uniqueBowlersin2015[i] && hash[elem.match_id - startId] != undefined).filter(elem => elem.wide_runs === '0' && elem.noball_runs === '0');
        let totalNumberOfovers = (deliveriesMadebyBowler.length / 6).toFixed(2);
        let totalRunsConceded = deliveries.filter(elem => hash[elem.match_id - startId] != undefined && elem.bowler === uniqueBowlersin2015[i]).map(elem => [elem.total_runs, elem.legbye_runs, elem.bye_runs]).reduce(function (acc, curr) {
            if (curr[1] == 0 && curr[2] == 0) {
                acc += Number(curr[0]);
            }
            else if (curr[1] != 0) {
                acc += Number(curr[0]) - Number(curr[1]);
            }
            else if (curr[2] != 0) {
                acc += Number(curr[0]) - Number(curr[2]);
            }

            return acc;
        }, 0);
        let economyOfBowler = (totalRunsConceded / totalNumberOfovers).toFixed(2);
        let bowlerObj = {};
        bowlerObj[uniqueBowlersin2015[i]] = economyOfBowler;
        // return bowlerObj;

        for (let key in bowlerObj) {
            arr.push([key, bowlerObj[key]]);
        }
    }
    arr.sort(function (a, b) {
        return a[1] - b[1];
    }); arr.sort(function (a, b) {
        return a[1] - b[1];
    });
    let obj = {};
    for (let i = 0; i < 10; i++) {
        obj[arr[i][0]] = arr[i][1];
    }
    return obj;
}