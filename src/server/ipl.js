/* Returning the number of matches played per year matchesPerYear.json file
 Example Output:
     {
        "year": number of matches played,
        "2009": 57,
        "2010": 60,
        "2011": 73
      }
 */
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

/* Returning the number of matches won per team per year matchesPerTeamPerYear.json file
 Example Output:
[
    {
        "2008": {
            "Kolkata Knight Riders": 6,
            "Chennai Super Kings": 9,
            "Delhi Daredevils": 7,
            "Royal Challengers Bangalore": 4
        }
    },
    {
        "2009": {
            "Mumbai Indians": 5,
            "Royal Challengers Bangalore": 9,
            "Delhi Daredevils": 10
        }
    }
]

 */
module.exports.matchesPerTeamPerYear = (matches) => {
    let years = Array.from(new Set(matches.map(match => match.season).filter((year) => year !== ""))).sort();
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

/* Returning extra run conceded per team in the given year, extraRunsPerTeam.json file
Example Output:
    [
    {
        "Team name": extra runs conceded
    },
    {
        "Mumbai Indians": 102
    },
    {
        "Kolkata Knight Riders": 122
    }
]
*/
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
/* Returning top economical bowlers in the given year, topEconomicalBowlers.json file
Example Output:
[
    {
        "Bowler name": economy,
        "RN ten Doeschate": 4,
        "J Yadav": 4.14,
        "V Kohli": 5.46
    }
]
*/

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