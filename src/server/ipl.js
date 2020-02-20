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
    let matchIds = matchObj.filter(elem => elem.team1 === tm || elem.team2 === tm && elem.season === yr).map(elem => elem.id);
    // return matchIds.length;
    let extraCount = deliveryObj.filter(elem => matchIds.includes(elem.match_id) && elem.extra_runs !== '0' && elem.extra_runs !== '' && elem.bowling_team === tm).reduce((acc, curr) => acc + Number(curr.extra_runs), 0);

    let result = {};
    result[tm] = extraCount;
    return result;
}