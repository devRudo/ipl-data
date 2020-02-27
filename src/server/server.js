const http = require('http');
const path = require('path');
const localhost = '127.0.0.1';
const port = 3000;
const fs = require('fs');
const cwd = process.cwd();

const outputpath = path.join(cwd + '/src/output/');
const server = http.createServer((request, response) => {
    response.statusCode = 200;
    const route = request.url;
    switch (route) {
        case '/matches-per-year':
            response.setHeader('Content-Type', 'application/json');
            fs.readFile(outputpath + 'matchesPerYear.json', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found !");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/matches-per-team-per-year':
            response.setHeader('Content-Type', 'application/json');
            fs.readFile(outputpath + 'matchesPerTeamPerYear.json', 'utf8', (err, data) => {
                if (err) {
                    response.end("no data found!");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/won-toss-won-match-per-team':
            response.setHeader('Content-Type', 'application/json');
            fs.readFile(outputpath + 'wonTossWonMatchPerTeam.json', 'utf8', (err, data) => {
                if (err) {
                    response.end("no data found");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/player-highest-manofthematch-per-season':
            response.setHeader('Content-Type', 'application/json');
            fs.readFile(outputpath + 'playerHighManoftheMatchPerSeason.json', 'utf8', (err, data) => {
                if (err) {
                    response.end("no data found");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/most-economical-bowlers-in-super-overs':
            response.setHeader('Content-Type', 'application/json');
            fs.readFile(outputpath + 'mostEconomicalBowlerSuperOver.json', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found !");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/strike-rate-virat-kohli-per-season':
            response.setHeader('Content-Type', 'application/json');
            fs.readFile(outputpath + 'strikeRateViratPerseason.json', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found!");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/extra-runs-per-team':
            response.setHeader('Content-Type', 'application/json');
            fs.readFile(outputpath + 'extraRunsPerTeam.json', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found!");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/top-economical-bowlers':
            response.setHeader('Content-Type', 'application/json');
            fs.readFile(outputpath + 'topEconomicalBowlers.json', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found!");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/max-numberoftimes-dissmissal':
            response.setHeader('Content-Type', 'application/json');
            fs.readFile(outputpath + 'maxNumberofTimesofDissmissal.json', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found!");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        default:
            response.setHeader('Content-Type', 'text/html');
            fs.readFile(cwd + '/src/server/public/index.html', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found!");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
    }

});

server.listen(port, localhost, () => {
    console.log(`Server is running on at http://${localhost}:${port}/`);
});