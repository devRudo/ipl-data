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

