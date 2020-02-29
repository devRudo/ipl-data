const http = require('http');
const path = require('path');
const port = 5000;
const fs = require('fs');
const cwd = process.cwd();

const outputpath = path.join(cwd + '/src/output/');

// Creating server to serve the JSON
const server = http.createServer((request, response) => {
    const route = request.url;
    switch (route) {
        case '/matches-per-year':
            fs.readFile(outputpath + 'matchesPerYear.json', 'utf8', (err, data) => {
                if (err) {
                    response.writeHead(404);
                    response.end("No data found !");
                }
                else {
                    response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/matches-per-team-per-year':
            fs.readFile(outputpath + 'matchesPerTeamPerYear.json', 'utf8', (err, data) => {
                if (err) {
                    response.writeHead(404);
                    response.end("no data found!");
                }
                else {
                    response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/won-toss-won-match-per-team':
            fs.readFile(outputpath + 'wonTossWonMatchPerTeam.json', 'utf8', (err, data) => {
                if (err) {
                    response.writeHead(404);
                    response.end("no data found");
                }
                else {
                    response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/player-highest-manofthematch-per-season':
            fs.readFile(outputpath + 'playerHighManoftheMatchPerSeason.json', 'utf8', (err, data) => {
                if (err) {
                    response.writeHead(404);
                    response.end("no data found");
                }
                else {
                    response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/most-economical-bowlers-in-super-overs':
            fs.readFile(outputpath + 'mostEconomicalBowlerSuperOver.json', 'utf8', (err, data) => {
                if (err) {
                    response.writeHead(404);
                    response.end("No data found !");
                }
                else {
                    response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/strike-rate-virat-kohli-per-season':
            fs.readFile(outputpath + 'strikeRateViratPerseason.json', 'utf8', (err, data) => {
                if (err) {
                    response.writeHead(404);
                    response.end("No data found!");
                }
                else {
                    response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/extra-runs-per-team':
            fs.readFile(outputpath + 'extraRunsPerTeam.json', 'utf8', (err, data) => {
                if (err) {
                    response.writeHead(404);
                    response.end("No data found!");
                }
                else {
                    response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/top-economical-bowlers':
            fs.readFile(outputpath + 'topEconomicalBowlers.json', 'utf8', (err, data) => {
                if (err) {
                    response.writeHead(404);
                    response.end("No data found!");
                }
                else {
                    response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/max-numberoftimes-dissmissal':
            fs.readFile(outputpath + 'maxNumberofTimesofDissmissal.json', 'utf8', (err, data) => {
                if (err) {
                    response.writeHead(404);
                    response.end("No data found!");
                }
                else {
                    response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/':
        case '/api.html':
        case '/api':
            fs.readFile(cwd + '/src/public/api.html', 'utf8', (err, data) => {
                if (err) {
                    response.writeHead(404);
                    response.end("File Not Found !");
                }
                else {
                    response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/html' });
                    response.write(data);
                    response.end();
                }
            });
            break;
        default:
            response.writeHead(404, "Page not found", { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/plain' });
            response.write(response.statusMessage);
            response.end();
    }

});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});