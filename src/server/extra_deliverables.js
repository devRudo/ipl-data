module.exports.wonTossWonMatchPerTeam = function (obj) {
    return obj.filter(elem => elem.toss_winner == elem.winner).reduce(function (acc, curr) {
        if (acc[curr.winner] === undefined) {
            acc[curr.winner] = 1;
        }
        else {
            acc[curr.winner]++;
        }
        return acc;
    }, {});
}

module.exports.playerHighManoftheMatchPerSeason = function (obj) {
    let years = obj.map(elem => elem.season).filter((curr, index, arr) => arr.indexOf(curr) === index);
    let resultobj = {};
    for (let i = 0; i < years.length; i++) {
        // console.log(years[i]);
        let players = obj.filter(elem => elem.season === years[i]).map(elem => elem.player_of_match).reduce((acc, curr) => {
            if (acc[curr] === undefined) {
                acc[curr] = 1;
            }
            else {
                acc[curr]++;
            }
            return acc;
        }, {});
        let countArr = [];
        for (key in players) {
            countArr.push(players[key]);
        }
        let highestCount = Math.max(...countArr);
        // let result = [];
        let player = {};
        for (key in players) {
            if (players[key] == highestCount) {
                player[key] = highestCount;
            }
        }
        resultobj[years[i]] = player;
    }
    return resultobj;
}

module.exports.strikeRateViratPerseason = function (matches, deliveries) {
    let years = matches.map(elem => elem.season).filter((curr, index, arr) => arr.indexOf(curr) === index);
    let ViratKohliDeliveries = deliveries.filter(elem => elem.batsman == 'V Kohli');
    let resultobj = {};
    for (let i = 0; i < years.length; i++) {
        let matchesPlayedinThisYear = matches.filter(elem => elem.season == years[i]).reduce((acc, curr) => {
            if (acc[curr.id] == undefined) {
                acc[curr.id] = 1;
            }
            else {
                acc[curr.id]++;
            }
            return acc;
        }, {});
        let totalRuns = ViratKohliDeliveries.filter(elem => matchesPlayedinThisYear[elem.match_id] != undefined).reduce((acc, curr) => {
            return acc + Number(curr.batsman_runs);
        }, 0);
        let totalBallsPLayed = ViratKohliDeliveries.filter(elem => matchesPlayedinThisYear[elem.match_id] != undefined && elem.wide_runs == 0).length;
        let strikerate = ((totalRuns / totalBallsPLayed) * 100).toFixed(2);
        resultobj[years[i]] = Number(strikerate);
    }
    return resultobj;
}

module.exports.playerDissmisal = function (deliveries) {
    let obj = deliveries.filter(elem => elem.player_dismissed != '' && elem.dismissal_kind != 'run out').map(elem => [elem.player_dismissed, elem.bowler]).reduce((acc, curr) => {
        if (acc[[curr[0], curr[1]]] === undefined) {
            acc[[curr[0], curr[1]]] = 1;
        }
        else {
            acc[[curr[0], curr[1]]]++;
        }
        return acc;
    }, {});
    let countArr1 = [];
    for (key in obj) {
        countArr1.push(obj[key]);
    }
    let maxCount = Math.max(...countArr1);
    let result = {};
    for (key in obj) {
        if (obj[key] == maxCount) {
            result[key] = maxCount;
        }
    }
    let res = [];
    for (key in result) {
        let batsman = key.split(",")[0];
        let bowler = key.split(",")[1];
        res.push(batsman + " Dismissed by " + bowler + " " + result[key] + " times");

    }
    return res;

}

module.exports.bowlerWithBestEconomyInSuperOvers = function (deliveries) {
    let superOverDeliveries = deliveries.filter(elem => elem.is_super_over != 0);
    let uniqueBowlersSuperOvers = superOverDeliveries.map(elem => elem.bowler).filter((elem, index, arr) => arr.indexOf(elem) == index);
    let superOverObj = {};
    for (let i = 0; i < uniqueBowlersSuperOvers.length; i++) {
        let totalDeliveries = superOverDeliveries.filter(elem => elem.bowler == uniqueBowlersSuperOvers[i]).filter(elem => elem.wide_runs === '0' && elem.noball_runs === '0').length;
        let totalOvers = (totalDeliveries / 6).toFixed(2);
        // return totalOvers;
        let totalRuns = superOverDeliveries.filter(elem => elem.bowler == uniqueBowlersSuperOvers[i]).map(elem => [elem.total_runs, elem.legbye_runs, elem.bye_runs]).reduce(function (acc, curr) {
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
        let economy = (totalRuns / totalOvers).toFixed(2);
        superOverObj[uniqueBowlersSuperOvers[i]] = economy;
    }
    let countArr2 = [];
    for (key in superOverObj) {
        countArr2.push(Number(superOverObj[key]));
    }
    let minEconomy = Math.min(...countArr2);
    for (let key in superOverObj) {
        if (superOverObj[key] == minEconomy) {
            return key + " is most economical bowlers in super overs";
        }
    }
}