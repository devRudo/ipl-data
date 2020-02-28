document.addEventListener('DOMContentLoaded', () => {
    let pointtojson = window.location.pathname.split('/')[1];
    if (pointtojson === 'result1') {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/matches-per-year');
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
                        text: 'Matches played per year'
                    },
                    xAxis: {
                        title: {
                            text: 'Years'
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Matches played'
                        },
                        tickInterval: 1
                    },
                    series: [{ showInLegend: false, data: jsonArr }]
                });
            }
        };
        xhr.onerror = () => {
            alert("Request failed");
        };
    }
    else if (pointtojson === 'result2') {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/matches-per-team-per-year');
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
                        text: 'Matches Played per Team per Year'
                    },
                    xAxis: {
                        title: {
                            text: 'Years'
                        },
                    },
                    yAxis: {
                        title: {
                            text: 'Matches Played'
                        },
                        tickInterval: 1
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
        xhr.onerror = () => {
            alert("Request failed");
        };
    }
    else if (pointtojson === 'result3') {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/won-toss-won-match-per-team');
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
                        text: 'Won Toss Won Match Per Team'
                    },

                    xAxis: {
                        title: {
                            text: 'Teams'
                        },
                        categories: teams
                    },
                    yAxis: {
                        title: {
                            text: 'Won Toss Won Match Count'
                        },
                        tickInterval: 5
                    },
                    series: [{ showInLegend: false, data: jsonArr }]
                });
            }
        };
        xhr.onerror = () => {
            alert("Request failed");
        };
    }
    else if (pointtojson === 'result4') {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/player-highest-manofthematch-per-season');
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
                        text: 'Matches Played per Team per Year'
                    },
                    xAxis: {
                        title: 'Years'
                    },
                    yAxis: {
                        title: {
                            text: 'Matches Played'
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
        xhr.onerror = () => {
            alert("Request failed");
        };
    }
    else if (pointtojson === 'result5') {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/most-economical-bowlers-in-super-overs');
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
                        text: 'Economy of Bowlers in Super Overs'
                    },

                    xAxis: {
                        title: {
                            text: 'Bowlers'
                        },
                        categories: teams
                    },
                    yAxis: {
                        title: {
                            text: 'Economy'
                        },
                        tickInterval: 1
                    },
                    series: [{ showInLegend: false, data: jsonArr }]
                });
            }
        };
        xhr.onerror = () => {
            alert("Request failed");
        };
    }
    else if (pointtojson === 'result6') {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/strike-rate-virat-kohli-per-season');
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
                // console.log(jsonArr);
                Highcharts.chart('container', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Strike Rate of Virat Kohli Per Season'
                    },

                    xAxis: {
                        categories: years
                    },
                    yAxis: {
                        title: {
                            text: 'Strike Rate'
                        },
                        tickInterval: 10
                    },
                    series: [{ showInLegend: false, data: jsonArr }]
                });
            }
        };
        xhr.onerror = () => {
            alert("Request failed");
        };
    }
    else if (pointtojson === 'result7') {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/extra-runs-per-team');
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
                        text: 'Extra Runs Conceded Per Team'
                    },

                    xAxis: {
                        categories: teams
                    },
                    yAxis: {
                        title: {
                            text: 'Extra Runs'
                        },
                        tickInterval: 5
                    },
                    series: [{ showInLegend: false, data: jsonArr }]
                });
            }
        };
        xhr.onerror = () => {
            alert("Request failed");
        };
    }
    else if (pointtojson === 'result8') {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/top-economical-bowlers');
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
                        text: 'Economy of Bowlers in all IPL Matches'
                    },

                    xAxis: {
                        title: {
                            text: 'Bowlers'
                        },
                        categories: teams
                    },
                    yAxis: {
                        title: {
                            text: 'Economy'
                        },
                        tickInterval: 1
                    },
                    series: [{ showInLegend: false, data: jsonArr }]
                });
            }
        };
        xhr.onerror = () => {
            alert("Request failed");
        };
    }
    else if (pointtojson === 'result9') {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/max-numberoftimes-dissmissal');
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
                        text: 'Economy of Bowlers in all IPL Matches'
                    },

                    xAxis: {
                        title: {
                            text: 'Bowlers'
                        },
                        categories: teams
                    },
                    yAxis: {
                        title: {
                            text: 'Economy'
                        },
                        tickInterval: 1
                    },
                    series: [{ showInLegend: false, data: jsonArr }]
                });
            }
        };
        xhr.onerror = () => {
            alert("Request failed");
        };
    }

});