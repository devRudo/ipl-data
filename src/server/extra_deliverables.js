// /* Writing the number of times each team won the toss and won the match too, wonTossWonMatchPerTeam.json file

// Example Output:
//     {
//         "Team Name": numbersofWintosswinmatch
//     "Rising Pune Supergiant": 5,
//     "Kolkata Knight Riders": 44,
//     "Kings XI Punjab": 28,
//     "Royal Challengers Bangalore": 35
// }

// */

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
/* Returning the player per season who has won the highest number of player of the match in that season, playerHighManoftheMatchPerSeason.json file

 Example Output:
     {
     "year": {
         "player name": number of player of the match won
     },
     "2009": {
         "YK Pathan": 3
     },
     "2010": {
         "SR Tendulkar": 4
     }
 }
*/
module.exports.playerHighManoftheMatchPerSeason = (matches) => {
    let years = matches.map(match => match.season).filter((match, index, matches) => matches.indexOf(match) === index);
    let playersArr = [];
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
            let obj = {};
            if (players[key] == highestCount) {
                obj[key] = highestCount;
                player[years[i]] = obj;
            }
        }
        playersArr.push(player);
    }

    return playersArr.sort((a, b) => Object.keys(a)[0] - Object.keys(b)[0]);
}
/* Writing strike rate of virat kohli per season, strikeRateViratPerseason.json file
    Example Output:
    {
        "Year": strikerate,
        "2008": 105.1,
        "2009": 112.33,
        "2010": 144.81
    }
*/
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
/* Writing the highest number of times a player is dismissed by another player in all season, maxNumberofTimesofDissmissal.json file

                   Example Output:
                       [Batsman name dismissed by bowler name n times]
                       ["MS Dhoni Dismissed by Z Khan 7 times"]
                   */

module.exports.playerDissmisal = (deliveries) => {
    let obj = deliveries.filter(delivery => delivery.player_dismissed != null && delivery.dismissal_kind != 'run out').map(delivery => [delivery.player_dismissed, delivery.bowler]).reduce((acc, curr) => {
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
        let dismissalObj = {};
        dismissalObj[key] = obj[key];
        dissmissalArray.push(dismissalObj);
    }
    return dissmissalArray.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]).slice(0, 10);
}


/* Returning the bowlers economies in super overs, mostEconomicalBowlerSuperOver.json file

    Example Output:
    [
        {
            Bowlername: economy
        },
        {
            "JP Faulkner": 11.48
        },
        {
            "JJ Bumrah": 4
        },
    ]
*/
module.exports.bowlerWithBestEconomyInSuperOvers = (deliveries) => {
    let superOverDeliveries = deliveries.filter(delivery => delivery.is_super_over != 0);
    let uniqueBowlersSuperOvers = Array.from(new Set(superOverDeliveries.map(delivery => delivery.bowler)));
    let outputArr = [];
    for (let i = 0; i < uniqueBowlersSuperOvers.length; i++) {
        let superOverObj = {};
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
        superOverObj[uniqueBowlersSuperOvers[i]] = Number(economy);
        outputArr.push(superOverObj);
    }

    return outputArr;
}