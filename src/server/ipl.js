module.exports.matchesPerYear = (matches) => {
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

module.exports.matchesPerTeamPerYear = (matches) => {
    let winnerTeams = Array.from(new Set(matches.map(match => match.winner).filter((match, index, matches) => match !== "")));
    let finalObj = {};
    for (let i = 0; i < winnerTeams.length; i++) {
        let currentTeamObj = matches.reduce((acc, curr) => {
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
        team[winnerTeams[i]] = currentTeamObj;
        let winnerobj = team;
        index = i + 1;
        finalObj['Team ' + index] = winnerobj;
    }
    return finalObj;
}

module.exports.extraRunsPerTeam = (matches, deliveries, year) => {
    let matchIdsPlayedIn2016 = matches.filter(match => match.season == year).map(match => match.id).reduce((acc, curr) => {
        if (acc[curr] == undefined) {
            acc[curr] = 1;
        }
        else {
            acc[curr]++;
        }
        return acc;
    }, {});
    let deliveriesin2016 = deliveries.filter(delivery => matchIdsPlayedIn2016[delivery.match_id] != undefined);
    let bowlingTeams = deliveriesin2016.map(delivery => delivery.bowling_team).filter((delivery, index, deliveries) => deliveries.indexOf(delivery) === index);
    let teams = [];
    for (let i = 0; i < bowlingTeams.length; i++) {
        let extraCount = deliveriesin2016.filter(delivery => delivery.extra_runs !== '0' && delivery.extra_runs !== '' && delivery.bowling_team === bowlingTeams[i]).reduce((acc, curr) => acc + Number(curr.extra_runs), 0);
        let team = {};
        team[bowlingTeams[i]] = extraCount;
        teams.push(team);
    }
    return teams;

}

module.exports.topEconomicalBowlers = (matches, deliveries, year) => {
    let matchIdsPlayedIn2015 = matches.filter(match => match.season == year).map(match => match.id).reduce((acc, curr) => {
        if (acc[curr] == undefined) {
            acc[curr] = 1;
        }
        else {
            acc[curr]++;
        }
        return acc;
    }, {});
    deliveriesin2015 = deliveries.filter(delivery => matchIdsPlayedIn2015[delivery.match_id] != undefined);
    let uniqueBowlersin2015 = Array.from(new Set(deliveriesin2015.map(delivery => delivery.bowler)));
    let bowlerswithEconomy = [];
    for (let i = 0; i < uniqueBowlersin2015.length; i++) {
        let deliveriesMadebyBowler = deliveriesin2015.filter(delivery => delivery.bowler === uniqueBowlersin2015[i]).filter(delivery => delivery.wide_runs === '0' && delivery.noball_runs === '0');
        let totalNumberOfovers = (deliveriesMadebyBowler.length / 6).toFixed(2);
        let totalRunsConceded = deliveriesin2015.filter(delivery => delivery.bowler === uniqueBowlersin2015[i]).map(delivery => [delivery.total_runs, delivery.legbye_runs, delivery.bye_runs]).reduce(function (acc, curr) {
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

        for (let key in bowlerObj) {
            bowlerswithEconomy.push([key, bowlerObj[key]]);
        }
    }
    bowlerswithEconomy.sort(function (a, b) {
        return a[1] - b[1];
    });
    let sortedEconomy = {};
    for (let i = 0; i < 10; i++) {
        sortedEconomy[bowlerswithEconomy[i][0]] = Number(bowlerswithEconomy[i][1]);
    }
    return sortedEconomy;
}