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

module.exports.strikeRateViratPerseason = function (matchObj, deliveryObj) {
    let years = matchObj.map(elem => elem.season).filter((curr, index, arr) => arr.indexOf(curr) === index);
    let resultobj = {};
    for (let i = 0; i < years.length; i++) {
        matchesPlayedinThisYear = matchObj.filter(elem => elem.season == years[i]).map(elem => elem.id);
        let totalRuns = deliveryObj.filter(elem => elem.batsman === 'V Kohli' && matchesPlayedinThisYear.includes(elem.match_id)).reduce((acc, curr) => {
            return acc + Number(curr.batsman_runs);
        }, 0);
        let totalBallsPLayed = deliveryObj.filter(elem => elem.batsman === 'V Kohli' && matchesPlayedinThisYear.includes(elem.match_id) && elem.wide_runs == 0).length;
        let strikerate = ((totalRuns / totalBallsPLayed).toFixed(2) * 100).toFixed(2);
        resultobj[years[i]] = strikerate;
    }
    return resultobj;
}

module.exports.playerDissmisal = function (deliveries) {
    let obj = deliveries.filter(elem => elem.player_dismissed != '').map(elem => [elem.player_dismissed, elem.bowler]).reduce((acc, curr) => {
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
    // return countArr1.filter(elem => elem > 3);
    let maxCount = Math.max(...countArr1);
    // return maxCount;
    let result = {};
    for (key in obj) {
        if (obj[key] == maxCount) {
            result[key] = maxCount;
        }
    }
    return result;

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
    // let superOverDeliveries = deliveries.filter(elem => elem.is_super_over != 0).map(elem => [elem.is_super_over, elem.bowler]);
}