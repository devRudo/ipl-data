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

module.exports.matchesPerTeamPerYear = function (obj, tm) {
    let obj1 = obj.reduce((acc, curr) => {
        if (curr.winner === tm) {
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
    team[tm] = obj1;
    return team;
}

module.exports.extraRunsPerTeam = function (matchObj, deliveryObj, yr, tm) {
    let matchIdsPlayedIn2016 = matchObj.filter(elem => elem.season === '2016').map(elem => elem.id);
    let extraCount = deliveryObj.filter(elem => matchIdsPlayedIn2016.includes(elem.match_id) && elem.extra_runs !== '0' && elem.extra_runs !== '' && elem.bowling_team === tm).reduce((acc, curr) => acc + Number(curr.extra_runs), 0);
    let result = {};
    result[tm] = extraCount;
    return result;
}

module.exports.topEconomicalBowlers = function (matches, deliveries, bowler) {
    let deliveriesMadebyBowler = deliveries.filter(elem => elem.bowler === bowler && matches.includes(elem.match_id)).filter(elem => elem.wide_runs === '0' && elem.noball_runs === '0');
    let totalNumberOfovers = (deliveriesMadebyBowler.length / 6).toFixed(2);
    let totalRunsConceded = deliveries.filter(elem => matches.includes(elem.match_id) && elem.bowler === bowler).map(elem => [elem.total_runs, elem.legbye_runs, elem.bye_runs]).reduce(function (acc, curr) {
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
    bowlerObj[bowler] = economyOfBowler;
    return bowlerObj;
}