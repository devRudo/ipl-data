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

}

module.exports.highestNumberofTimesonePlayerHasbeenDismissedByAnother = function (matches, deliveries, bowler) {

}

module.exports.bowlerWithBestEconomyInSuperOvers = function (matches, deliveries, bowler) {

}