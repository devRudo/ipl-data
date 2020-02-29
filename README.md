# IPL Data Project

To run this project you need to have node js installed in your system so install it :

## After installing node js in your system just clone this project into your system and then run the project by running following command in your cloned directory
To install all the required packeges:

> $ npm install\

To generate the output in the output folder

> $ npm start\

## Then go to the folder Output inside src to view the outputs

In the output folder you will get the following outputs:

1. Number of matches played per year for all the years in IPL.
2. Number of matches won of per team per year in IPL.
3. Extra runs conceded per team in 2016.
4. Top 10 economical bowlers in 2015.

Extra Deliverables:

1. Number of times each team won the toss and also won the match.
2. Player per season who has won the highest number of Player of the Match awards.
3. Strike rate of the batsman Virat Kohli for each season.
4. Highest number of times one player has been dismissed by another player.
5. Bowler with the best economy in super overs.

After that json files and the respective charts can be viewed on browsers by running following command:

> $ npm run api-serve\
> $ npm run web-serve\
> Server is running at http://localhost:5000/  (API Server)
> Server is running at http://localhost:3000/  (Web Server)
Go to the link http://localhost:5000/ to acceess the json ouputs and charts in your browser

Outputs are provided as different route points as follows:
1. http://localhost:5000/matches-per-year
2. http://localhost:5000/matches-per-team-per-year
3. http://localhost:5000/won-toss-won-match-per-team
4. http://localhost:5000/player-highest-manofthematch-per-season
5. http://localhost:5000/most-economical-bowlers-in-super-overs
6. http://localhost:5000/strike-rate-virat-kohli-per-season
7. http://localhost:5000/extra-runs-per-team
8. http://localhost:5000/top-economical-bowlers
9. http://localhost:5000/max-numberoftimes-dissmissal

Charts are also provided at different routes as follows:
1. http://localhost:3000/
2. http://localhost:3000/result1
3. http://localhost:3000/result2
4. http://localhost:3000/result3
5. http://localhost:3000/result4
6. http://localhost:3000/result5
7. http://localhost:3000/result6
8. http://localhost:3000/result7
9. http://localhost:3000/result8
10.http://localhost:3000/result9
