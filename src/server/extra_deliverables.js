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

}

module.exports.strikeRateViratPerseason = function (matchObj, deliveryObj) {

}

module.exports.highestNumberofTimesonePlayerHasbeenDismissedByAnother = function (matches, deliveries, bowler) {

}

module.exports.bowlerWithBestEconomyInSuperOvers = function (matches, deliveries, bowler) {

}