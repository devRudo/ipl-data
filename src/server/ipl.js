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
    let matchIdsPlayedIn2015 = matches.filter(elem => elem.season === '2015').map(elem => elem.id);
    let deliveriesMadebyBowler = deliveries.filter(elem => elem.bowler === bowler && matchIdsPlayedIn2015.includes(elem.match_id));
    let totalNumberOfovers = deliveriesMadebyBowler.map(elem => elem.over).filter((elem, index, arr) => arr.indexOf(elem) === index).length;
    let totalRunsConceded = deliveriesMadebyBowler.map(elem => elem.total_runs).reduce((acc, curr) => acc + Number(curr), 0);
    let economyOfBowler = totalRunsConceded / totalNumberOfovers;
    let bowlerObj = {};
    bowlerObj[bowler] = economyOfBowler.toFixed(2);
    return bowlerObj;
}