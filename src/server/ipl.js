module.exports.matchesPerYear = function (matches) {
    return matches.reduce((acc, curr) => {
        if (acc[curr.season] == undefined) {
            acc[curr.season] = 1;
        }
        else {
            acc[curr.season]++;
        }
        return acc;
    }, {});
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

module.exports.extraRunsPerTeam = function (matches, deliveries, year) {
    let matchIdsPlayedIn2016 = matches.filter(elem => elem.season == year).map(elem => elem.id).reduce((acc, curr) => {
        if (acc[curr] == undefined) {
            acc[curr] = 1;
        }
        else {
            acc[curr]++;
        }
        return acc;
    }, {});
    let deliveriesin2016 = deliveries.filter(elem => matchIdsPlayedIn2016[elem.match_id] != undefined);
    let bowlingTeams = deliveriesin2016.map(elem => elem.bowling_team).filter((elem, index, arr) => arr.indexOf(elem) === index);
    let res = [];
    for (let i = 0; i < bowlingTeams.length; i++) {
        let extraCount = deliveriesin2016.filter(elem => elem.extra_runs !== '0' && elem.extra_runs !== '' && elem.bowling_team === bowlingTeams[i]).reduce((acc, curr) => acc + Number(curr.extra_runs), 0);
        let result = {};
        result[bowlingTeams[i]] = extraCount;
        res.push(result);
    }
    return res;

}

module.exports.topEconomicalBowlers = function (matches, deliveries, year) {
    let matchIdsPlayedIn2015 = matches.filter(elem => elem.season == year).map(elem => elem.id).reduce((acc, curr) => {
        let key = curr;
        if (acc[curr] == undefined) {
            acc[curr] = 1;
        }
        else {
            acc[curr]++;
        }
        return acc;
    }, {});
    deliveriesin2015 = deliveries.filter(elem => matchIdsPlayedIn2015[elem.match_id] != undefined);
    let uniqueBowlersin2015 = deliveriesin2015.map(elem => elem.bowler).filter((elem, index, arr) => arr.indexOf(elem) === index);
    let arr = [];
    for (let i = 0; i < uniqueBowlersin2015.length; i++) {
        let deliveriesMadebyBowler = deliveriesin2015.filter(elem => elem.bowler === uniqueBowlersin2015[i]).filter(elem => elem.wide_runs === '0' && elem.noball_runs === '0');
        let totalNumberOfovers = (deliveriesMadebyBowler.length / 6).toFixed(2);
        let totalRunsConceded = deliveriesin2015.filter(elem => elem.bowler === uniqueBowlersin2015[i]).map(elem => [elem.total_runs, elem.legbye_runs, elem.bye_runs]).reduce(function (acc, curr) {
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
        obj[arr[i][0]] = Number(arr[i][1]);
    }
    return obj;
}