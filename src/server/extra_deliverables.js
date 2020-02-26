module.exports.wonTossWonMatchPerTeam = (matches) => {
    return matches.filter(match => match.toss_winner == match.winner).reduce((acc, curr) => {
        if (acc[curr.winner] === undefined) {
            acc[curr.winner] = 1;
        }
        else {
            acc[curr.winner]++;
        }
        return acc;
    }, {});
}

module.exports.playerHighManoftheMatchPerSeason = (matches) => {
    let years = matches.map(match => match.season).filter((match, index, matches) => matches.indexOf(match) === index);
    let playersObj = {};
    for (let i = 0; i < years.length; i++) {
        let players = matches.filter(match => match.season === years[i]).map(match => match.player_of_match).reduce((acc, curr) => {
            if (acc[curr] === undefined) {
                acc[curr] = 1;
            }
            else {
                acc[curr]++;
            }
            return acc;
        }, {});
        let manoftheMatchCount = [];
        for (key in players) {
            manoftheMatchCount.push(players[key]);
        }
        let highestCount = Math.max(...manoftheMatchCount);
        let player = {};
        for (key in players) {
            if (players[key] == highestCount) {
                player[key] = highestCount;
            }
        }
        playersObj[years[i]] = player;
    }
    return playersObj;
}

module.exports.strikeRateViratPerseason = (matches, deliveries) => {
    let years = matches.map(match => match.season).filter((curr, index, arr) => arr.indexOf(curr) === index);
    let ViratKohliDeliveries = deliveries.filter(delivery => delivery.batsman == 'V Kohli');
    let resultobj = {};
    for (let i = 0; i < years.length; i++) {
        let matchesPlayedinThisYear = matches.filter(match => match.season == years[i]).reduce((acc, curr) => {
            if (acc[curr.id] == undefined) {
                acc[curr.id] = 1;
            }
            else {
                acc[curr.id]++;
            }
            return acc;
        }, {});
        let totalRuns = ViratKohliDeliveries.filter(delivery => matchesPlayedinThisYear[delivery.match_id] != undefined).reduce((acc, curr) => {
            return acc + (curr.batsman_runs);
        }, 0);
        let totalBallsPLayed = ViratKohliDeliveries.filter(elem => matchesPlayedinThisYear[elem.match_id] != undefined && elem.wide_runs == 0).length;
        let strikerate = ((totalRuns / totalBallsPLayed) * 100).toFixed(2);
        resultobj[years[i]] = Number(strikerate);
    }
    return resultobj;
}

module.exports.playerDissmisal = (deliveries) => {
    let obj = deliveries.filter(delivery => delivery.player_dismissed != '' && delivery.dismissal_kind != 'run out').map(delivery => [delivery.player_dismissed, delivery.bowler]).reduce((acc, curr) => {
        if (acc[[curr[0], curr[1]]] === undefined) {
            acc[[curr[0], curr[1]]] = 1;
        }
        else {
            acc[[curr[0], curr[1]]]++;
        }
        return acc;
    }, {});
    let dissmissalArray = [];
    for (key in obj) {
        dissmissalArray.push(obj[key]);
    }
    let maxCount = Math.max(...dissmissalArray);
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

module.exports.bowlerWithBestEconomyInSuperOvers = (deliveries) => {
    let superOverDeliveries = deliveries.filter(delivery => delivery.is_super_over != 0);
    let uniqueBowlersSuperOvers = superOverDeliveries.map(delivery => delivery.bowler).filter((elem, index, arr) => arr.indexOf(elem) == index);
    let superOverObj = {};
    for (let i = 0; i < uniqueBowlersSuperOvers.length; i++) {
        let totalDeliveries = superOverDeliveries.filter(elem => elem.bowler == uniqueBowlersSuperOvers[i]).filter(elem => elem.wide_runs == 0 && elem.noball_runs == 0).length;
        let totalOvers = (totalDeliveries / 6).toFixed(2);
        let totalRuns = superOverDeliveries.filter(elem => elem.bowler == uniqueBowlersSuperOvers[i]).map(elem => [elem.total_runs, elem.legbye_runs, elem.bye_runs]).reduce((acc, curr) => {
            if (curr[1] == 0 && curr[2] == 0) {
                acc += (curr[0]);
            }
            else if (curr[1] != 0) {
                acc += (curr[0]) - (curr[1]);
            }
            else if (curr[2] != 0) {
                acc += (curr[0]) - (curr[2]);
            }

            return acc;
        }, 0);
        let economy = (totalRuns / totalOvers).toFixed(2);
        superOverObj[uniqueBowlersSuperOvers[i]] = economy;
    }
    let countArr2 = [];
    for (key in superOverObj) {
        countArr2.push((superOverObj[key]));
    }
    let minEconomy = Math.min(...countArr2);
    for (let key in superOverObj) {
        if (superOverObj[key] == minEconomy) {
            return key + " is most economical bowlers in super overs";
        }
    }
}