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
    let years = Array.from(new Set(matches.map(match => match.season).filter((year, index, years) => year !== ""))).sort();
    let seasonArr = [];
    for (let i = 0; i < years.length; i++) {
        let currentSeasonObj = matches.reduce((acc, curr) => {
            if (curr.season === years[i]) {
                if (curr.winner !== '') {
                    if (acc[curr.winner] === undefined) {
                        acc[curr.winner] = 1;
                    }
                    else {
                        acc[curr.winner]++;
                    }
                }
            }
            return acc;
        }, {});
        let team = {};
        team[years[i]] = currentSeasonObj;
        let winnerobj = team;
        seasonArr.push(winnerobj);
    }
    return seasonArr;
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
        let extraCount = deliveriesin2016.filter(delivery => delivery.extra_runs !== '0' && delivery.extra_runs !== '' && delivery.bowling_team === bowlingTeams[i]).reduce((acc, curr) => acc + (curr.extra_runs), 0);
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
        let deliveriesMadebyBowler = deliveriesin2015.filter(delivery => delivery.bowler === uniqueBowlersin2015[i]).filter(delivery => delivery.wide_runs == 0 && delivery.noball_runs == 0);
        let totalNumberOfovers = (deliveriesMadebyBowler.length / 6).toFixed(2);
        let totalRunsConceded = deliveriesin2015.filter(delivery => delivery.bowler === uniqueBowlersin2015[i]).map(delivery => [delivery.total_runs, delivery.legbye_runs, delivery.bye_runs]).reduce((acc, curr) => {
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
        let economyOfBowler = (totalRunsConceded / totalNumberOfovers).toFixed(2);
        let bowlerObj = {};
        bowlerObj[uniqueBowlersin2015[i]] = Number(economyOfBowler);
        bowlerswithEconomy.push(bowlerObj);
    }
    return bowlerswithEconomy.sort((a, b) => Object.values(a)[0] - Object.values(b)[0]).slice(0, 10);
}