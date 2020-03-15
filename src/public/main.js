document.addEventListener('DOMContentLoaded', () => {
    let pointtojson = window.location.pathname.split('/')[1];
    let xhr = new XMLHttpRequest();
    if (pointtojson === 'result1') {
        xhr.open('GET', 'http://localhost:5000/matches-per-year');
        xhr.send();
        xhr.onload = () => {
            if (xhr.status != 200) {
                alert(`Error ${xhr.status}: ${xhr.statusText}`);
            } else {
                document.getElementById('progressBar').style.display = "none";
                document.getElementById('container').style.display = "block";
                let obj = JSON.parse(xhr.responseText);
                let years = Object.keys(obj);
                let jsonArr = [];
                for (key in obj) {
                    jsonArr.push([Number(key), obj[key]]);
                }
                var options = {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Matches played per year'
                    },
                    xAxis: {
                        title: {
                            text: 'Years',
                            style: {
                                fontSize: '14px'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '14px'
                            }
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Matches played',
                            style: {
                                fontSize: '14px'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '14px'
                            }
                        },
                        tickInterval: 1
                    },
                    tooltip: {
                        pointFormat: 'Matches Played in {point.x}: <b>{point.y}</b>'
                    },
                    series: [{
                        showInLegend: false,
                        colorByPoint: true,
                        data: jsonArr,
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            align: 'right',
                            format: '{point.y}',
                            y: 30,
                            style: {
                                fontSize: '16px'
                            }
                        }
                    }]
                };
                Highcharts.chart('container', options);
            }
        };
    }
    else if (pointtojson === 'result2') {
        xhr.open('GET', 'http://localhost:5000/matches-per-team-per-year');
        xhr.send();
        xhr.onload = () => {
            if (xhr.status != 200) {
                alert(`Error ${xhr.status}: ${xhr.statusText}`);
            } else {
                var options = {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Matches Won per Team per Year',
                        style: {
                            fontSize: '20px'
                        }
                    },
                    xAxis: {
                        title: {
                            text: 'Years',
                            style: {
                                fontSize: '20px'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '14px'
                            }
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Matches Won',
                            style: {
                                fontSize: '20px'
                            }
                        }, labels: {
                            style: {
                                fontSize: '14px'
                            }
                        },
                        tickInterval: 1
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [{}]
                }
                let obj = JSON.parse(xhr.responseText);
                let years = [];
                let teams = [];
                let countArr = [];
                for (let elem of obj) {
                    years.push(Object.keys(elem)[0]);
                    teams.push(...Object.keys(Object.values(elem)[0]));
                    countArr.push(Object.values(elem)[0]);
                }
                teams = Array.from(new Set(teams));
                options.xAxis.categories = years;
                let series = [];
                for (let elem of teams) {
                    let dataObj = {};
                    let arr = [];
                    for (let wins of countArr) {
                        if (wins.hasOwnProperty(elem)) {
                            arr.push(wins[elem]);
                        }
                        else {
                            arr.push(0);
                        }
                    }
                    dataObj.name = elem;
                    dataObj.data = arr;
                    series.push(dataObj);
                }
                options.series = series;
                Highcharts.chart('container', options);
            }
        };
    }
    else if (pointtojson === 'result3') {
        xhr.open('GET', 'http://localhost:5000/won-toss-won-match-per-team');
        xhr.send();
        xhr.onload = () => {
            if (xhr.status != 200) {
                alert(`Error ${xhr.status}: ${xhr.statusText}`);
            } else {
                let obj = JSON.parse(xhr.responseText);
                let years = Object.keys(obj);
                let jsonArr = [];
                let teams = [];
                for (key in obj) {
                    jsonArr.push([key, obj[key]]);
                    teams.push(key);

                }
                Highcharts.chart('container', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Won Toss Won Match Per Team',
                        style: {
                            fontSize: '20px'
                        }
                    },

                    xAxis: {
                        title: {
                            text: 'Teams',
                            style: {
                                fontSize: '16px'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '16px'
                            }
                        },
                        categories: teams
                    },
                    yAxis: {
                        title: {
                            text: 'Won Toss Won Match Count',
                            style: {
                                fontSize: '16px'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '16px'
                            }
                        },
                        tickInterval: 5
                    },
                    tooltip: {
                        pointFormat: 'Won toss won match : <b>{point.y}</b>'
                    },
                    series: [{
                        showInLegend: false,
                        colorByPoint: true,
                        data: jsonArr,
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            align: 'right',
                            format: '{point.y}',
                            y: 30,
                            style: {
                                fontSize: '16px'
                            }
                        }
                    }]
                });
            }
        };
    }
    else if (pointtojson === 'result4') {
        xhr.open('GET', 'http://localhost:5000/player-highest-manofthematch-per-season');
        xhr.send();
        xhr.onload = () => {
            if (xhr.status != 200) {
                alert(`Error ${xhr.status}: ${xhr.statusText}`);
            } else {
                var options = {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Highest Man of the Match getting player per year',
                        style: {
                            fontSize: '20px'
                        }
                    },
                    xAxis: {
                        title: {
                            text: 'Years',
                            style: {
                                fontSize: '16px'
                            }
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Matches Played',
                            style: {
                                fontSize: '16px'
                            }
                        },
                        tickInterval: 1
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    }
                }
                let obj = JSON.parse(xhr.responseText);
                let years = [];
                let players = [];
                let countArr = [];
                for (let elem of obj) {
                    years.push(Object.keys(elem)[0]);
                    players.push(...Object.keys(Object.values(elem)[0]));
                    countArr.push(Object.values(elem)[0]);
                }
                console.log(years);
                players = Array.from(new Set(players));
                options.xAxis.categories = years;
                let series = [];
                for (let elem of players) {
                    let dataObj = {};
                    let arr = [];
                    for (let wins of countArr) {
                        if (wins.hasOwnProperty(elem)) {
                            arr.push(wins[elem]);
                        }
                        else {
                            arr.push(0);
                        }
                    }
                    dataObj.name = elem;
                    dataObj.data = arr;
                    series.push(dataObj);
                }
                options.series = series;
                Highcharts.chart('container', options);
            }
        };
    }
    else if (pointtojson === 'result5') {
        xhr.open('GET', 'http://localhost:5000/most-economical-bowlers-in-super-overs');
        xhr.send();
        xhr.onload = () => {
            if (xhr.status != 200) {
                alert(`Error ${xhr.status}: ${xhr.statusText}`);
            } else {
                let obj = (JSON.parse(xhr.responseText));
                let jsonArr = [];
                let teams = [];
                for (let elem of obj) {
                    jsonArr.push([Object.keys(elem)[0], Object.values(elem)[0]]);
                    teams.push(Object.keys(elem)[0]);
                }
                Highcharts.chart('container', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Economy of Bowlers in Super Overs',
                        style: {
                            fontSize: '20px'
                        }
                    },

                    xAxis: {
                        title: {
                            text: 'Bowlers',
                            style: {
                                fontSize: '16px'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '16px'
                            }
                        },
                        categories: teams
                    },
                    yAxis: {
                        title: {
                            text: 'Economy',
                            style: {
                                fontSize: '16px'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '16px'
                            }
                        },
                        tickInterval: 1
                    },
                    tooltip: {
                        pointFormat: 'Economy of <b>{point.name}</b> in super overs: <b>{point.y}</b>'
                    },
                    series: [{
                        showInLegend: false,
                        colorByPoint: true,
                        data: jsonArr,
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            align: 'right',
                            format: '{point.y}',
                            y: 30,
                            style: {
                                fontSize: '16px'
                            }
                        }
                    }]
                });
            }
        };
    }
    else if (pointtojson === 'result6') {
        xhr.open('GET', 'http://localhost:5000/strike-rate-virat-kohli-per-season');
        xhr.send();
        xhr.onload = () => {
            if (xhr.status != 200) {
                alert(`Error ${xhr.status}: ${xhr.statusText}`);
            } else {
                let obj = JSON.parse(xhr.responseText);
                let years = Object.keys(obj);
                let jsonArr = [];
                for (key in obj) {
                    jsonArr.push([Number(key), obj[key]]);
                }
                Highcharts.chart('container', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Strike Rate of Virat Kohli Per Season',
                        style: {
                            fontSize: '20px'
                        }
                    },

                    xAxis: {
                        title: {
                            text: 'Years',
                            style: {
                                fontSize: '16px'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '16px'
                            }
                        },
                        categories: years
                    },
                    yAxis: {
                        title: {
                            text: 'Strike Rate',
                            style: {
                                fontSize: '16px'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '16px'
                            }
                        },
                        tickInterval: 10
                    },
                    tooltip: {
                        pointFormat: 'Strike Rate in <b>{point.x}</b>: <b>{point.y}</b>'
                    },
                    series: [{
                        showInLegend: false,
                        colorByPoint: true,
                        data: jsonArr,
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            align: 'right',
                            format: '{point.y}',
                            y: 30,
                            style: {
                                fontSize: '16px'
                            }
                        }
                    }]
                });
            }
        };
    }
    else if (pointtojson === 'result7') {
        xhr.open('GET', 'http://localhost:5000/extra-runs-per-team');
        xhr.send();
        xhr.onload = () => {
            if (xhr.status != 200) {
                alert(`Error ${xhr.status}: ${xhr.statusText}`);
            } else {
                let obj = (JSON.parse(xhr.responseText));
                let jsonArr = [];
                let teams = [];
                for (let elem of obj) {
                    jsonArr.push([Object.keys(elem)[0], Object.values(elem)[0]]);
                    teams.push(Object.keys(elem)[0]);
                }
                Highcharts.chart('container', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Extra Runs Conceded Per Team in all the season',
                        style: {
                            fontSize: '20px'
                        }
                    },
                    xAxis: {
                        title: {
                            text: 'Teams',
                            style: {
                                fontSize: '16px'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '16px'
                            }
                        },
                        categories: teams
                    },
                    yAxis: {
                        title: {
                            text: 'Extra Runs',
                            style: {
                                fontSize: '16px'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '16px'
                            }
                        },
                        tickInterval: 5
                    },
                    tooltip: {
                        pointFormat: 'Extra Runs given :<b>{point.y}</b>'
                    },
                    series: [{
                        showInLegend: false,
                        colorByPoint: true,
                        data: jsonArr,
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            align: 'right',
                            format: '{point.y}',
                            y: 30,
                            style: {
                                fontSize: '16px'
                            }
                        }
                    }]
                });
            }
        };
    }
    else if (pointtojson === 'result8') {
        xhr.open('GET', 'http://localhost:5000/top-economical-bowlers');
        xhr.send();
        xhr.onload = () => {
            if (xhr.status != 200) {
                alert(`Error ${xhr.status}: ${xhr.statusText}`);
            } else {
                let obj = (JSON.parse(xhr.responseText));
                let jsonArr = [];
                let teams = [];
                for (let elem of obj) {
                    jsonArr.push([Object.keys(elem)[0], Object.values(elem)[0]]);
                    teams.push(Object.keys(elem)[0]);
                }
                Highcharts.chart('container', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Economy of Bowlers in all IPL Matches',
                        style: {
                            fontSize: '20px'
                        }
                    },
                    xAxis: {
                        title: {
                            text: 'Bowlers',
                            style: {
                                fontSize: '16px'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '16px'
                            }
                        },
                        categories: teams
                    },
                    yAxis: {
                        title: {
                            text: 'Economy',
                            style: {
                                fontSize: '16px'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '16px'
                            }
                        },
                        tickInterval: 1
                    },
                    tooltip: {
                        pointFormat: 'Economy : <b>{point.y}</b>'
                    },
                    series: [{
                        showInLegend: false,
                        colorByPoint: true,
                        data: jsonArr,
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            align: 'right',
                            format: '{point.y}',
                            y: 30,
                            style: {
                                fontSize: '16px'
                            }
                        }
                    }]
                });
            }
        };
    }
    else if (pointtojson === 'result9') {
        xhr.open('GET', 'http://localhost:5000/max-numberoftimes-dissmissal');
        xhr.send();
        xhr.onload = () => {
            if (xhr.status != 200) {
                alert(`Error ${xhr.status}: ${xhr.statusText}`);
            } else {
                let obj = (JSON.parse(xhr.responseText));
                let jsonArr = [];
                let teams = [];
                for (let elem of obj) {
                    jsonArr.push([Object.keys(elem)[0], Object.values(elem)[0]]);
                    teams.push(Object.keys(elem)[0]);
                }
                Highcharts.chart('container', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Highest Number of times a player is dissmissed by another player',
                        style: {
                            fontSize: '20px'
                        }
                    },
                    xAxis: {
                        title: {
                            text: 'Batsman by Bowler',
                            style: {
                                fontSize: '16px'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '16px'
                            }
                        },
                        categories: teams
                    },
                    yAxis: {
                        title: {
                            text: 'Number of times of dissmissal',
                            style: {
                                fontSize: '16px'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '16px'
                            }
                        },
                        tickInterval: 1
                    },
                    tooltip: {
                        pointFormat: '<b>{point.name}</b>: <b>{point.y}</b>'
                    },
                    series: [{
                        showInLegend: false,
                        colorByPoint: true,
                        data: jsonArr,
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            align: 'right',
                            format: '{point.y}',
                            y: 30,
                            style: {
                                fontSize: '16px'
                            }
                        }
                    }]
                });
            }
        };
    }
    xhr.onprogress = (event) => {
        document.getElementById('progressBar').style.display = "block";
        document.body.style.backgroundColor = "#eee";
    }
    xhr.onerror = () => {
        document.body.style.display = "none";
        alert("Request failed");
    };
    // For going back and forth
    document.getElementById('back').addEventListener('click', () => {
        window.history.back();
    });
    document.getElementById('next').addEventListener('click', () => {
        window.history.forward();
    });
    document.getElementById('home').addEventListener('click', () => {
        window.location.href = '/';
    });
});